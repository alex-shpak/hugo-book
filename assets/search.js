'use strict';

{{ $searchDataFile := printf "%s.search-data.json" .Language.Lang }}
{{ $searchData := resources.Get "search-data.json" | resources.ExecuteAsTemplate $searchDataFile . | resources.Minify | resources.Fingerprint }}

(function () {
  const searchDataURL = '{{ $searchData.RelPermalink }}';
  const input = document.querySelector('#book-search-input');
  const searchOverlay = document.querySelector('#search-overlay')
  const resultsContainer = document.querySelector('#book-search-hits');
  const results = document.querySelector('#book-search-results ul');
  const LIMIT_RESULTS = 5

  if (!input) {
    return
  }

  // Listeners
  input.addEventListener('focus', init);
  input.addEventListener('keyup', search);
  document.addEventListener('keypress', focusSearchFieldOnKeyPress);
  searchOverlay.addEventListener('click', () => {
    hideSearchBox()
  })


  /**
   * @param {Event} event
   */
  function focusSearchFieldOnKeyPress(event) {
    if (event.target.value !== undefined) {
      return;
    }

    if (input === document.activeElement) {
      return;
    }

    const characterPressed = String.fromCharCode(event.charCode);
    if (!isHotkey(characterPressed)) {
      return;
    }

    input.focus();
    event.preventDefault();
  }

  /**
   * @param {String} character
   * @returns {Boolean}
   */
  function isHotkey(character) {
    const dataHotkeys = input.getAttribute('data-hotkeys') || '';
    return dataHotkeys.indexOf(character) >= 0;
  }

  function init() {
    input.removeEventListener('focus', init); // init once
    input.required = true;
    fetch(searchDataURL)
      .then(pages => pages.json())
      .then(pages => {
        window.bookSearchIndex = new FlexSearch.Document({
          tokenize: 'forward',
          optimize: true,
          resolution: 9,
          document: {
            id: 'id',
            index: [{
              field: 'title',
              tokenize: "forward",
              optimize: true,
              resolution: 9
            }, {
              field: 'content',
              tokenize: "forward",
              optimize: true,
              resolution: 2
            }, {
              field: 'href',
              optimize: true,
              resolution: 5
            }],
            store: true,
          }
        });
        for (const page of pages) {
          window.bookSearchIndex.add(page);
        }
      })
      .then(() => input.required = false)
      .then(search);
  }

  function search() {
    if (input.required) {
      return
    }

    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }

    if (!input.value) {
      hideSearchBox()
      return;
    }

    const searchHits = window.bookSearchIndex.search(input.value, { enrich: true, limit: LIMIT_RESULTS });
    const searchHitsParsed = []
    const ids = new Set()

    for (const hit of searchHits) {
      for (const result of hit.result) {
        if (searchHitsParsed.length >= LIMIT_RESULTS) {
          break
        }
        if (ids.has(result.id)) {
          continue
        }
        ids.add(result.id)
        searchHitsParsed.push(result.doc)
      }
    }

    if (!searchHitsParsed.length) {
      hideSearchBox()
      // TODO: show not found
      return
    }
    showSearchBox()
    searchHitsParsed.forEach(function (page) {
      const li = element('<li><a href><h4></h4><span></span></a></li>');
      const a = li.querySelector('a');
      const title = li.querySelector('h4');
      const content = li.querySelector('span');

      a.href = page.href;
      title.textContent = page.title;
      content.innerHTML = highlightContent(page.content, input.value)
      results.appendChild(li);
    });
  }

  function highlightContent(content, searchKeyword) {
    const amountLetters = 100
    const regex = new RegExp(searchKeyword.split(' ')[0], 'gi')
    const searchIndex = content.search(regex)

    if (searchIndex === -1) {
      return content.slice(0, amountLetters)
    }

    const from = Math.max(0, searchIndex - 40)

    return content.slice(from, from ? searchIndex + amountLetters : amountLetters).replace(regex, '<strong>$&</strong>')
  }

  // HELPERS
  /**
   * @param {String} content
   * @returns {Node}
   */
  function element(content) {
    const div = document.createElement('div');
    div.innerHTML = content;
    return div.firstChild;
  }

    function hide(element) {
    element.classList.add('hidden')
  }

  function show(element) {
    element.classList.remove('hidden')
  }

  function showSearchBox() {
    show(searchOverlay)
    show(resultsContainer)
  }

  function hideSearchBox() {
    hide(searchOverlay)
    hide(resultsContainer)
  }
})();
