'use strict';

{{ $searchDataFile := printf "%s.search-data.json" .Language.Lang }}
{{ $searchData := resources.Get "search-data.json" | resources.ExecuteAsTemplate $searchDataFile . | resources.Minify | resources.Fingerprint }}

(function () {
  const searchDataURL = '{{ $searchData.RelPermalink }}';
  const input = document.querySelector('#book-search-input input');
  const searchOverlay = document.querySelector('#search-overlay')
  const resultsContainer = document.querySelector('#book-search-hits');
  const results = document.querySelector('#book-search-results ul');
  const LIMIT_RESULTS = Infinity
  const MIN_INPUT_SIZE = 2 // SDK ✅
  const documents = new Map()

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
        window.lunrIdx = lunr(function() {
          this.ref('id')
          this.field('id')
          this.field('content')
          this.field('href')
          this.metadataWhitelist = ['position']
          for (const page of pages) {
            documents.set(page.id, page)
            this.add(page);
          }
        })
      })
      .then(() => input.required = false)
      .then(search);
  }

  function search() {
    const value = input.value?.trim()
    if (input.required) {
      return
    }

    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }

    if (!value || value.length <= MIN_INPUT_SIZE) {
      hideSearchBox()
      return;
    }

    function searchValue(fuzzy) {
      // Operators:
      // +: means AND. i.e +sdk +metaverse will found words that contains sdk & metaverse
      // ~n: looks for N fuzzy words. i.e. metaverse~1 => metavese ✅
      return value.split(' ').map(val => {
        // Avoid blankspaces
        if (!val) return
        // if its a short word or fuzzy option is turned off, then return only the value with the +operator
        if (val.length <= 4 || !fuzzy) return `+${val}`

        return `+${val}~1`
      }).filter(a => !!a).join(' ')
    }

    function getSearchHits() {
      // First search for the words without fuzzy, so we can have a more accurate result.
      const hits = window.lunrIdx.search(searchValue()).slice(0, LIMIT_RESULTS);
      if (hits.length) return hits
      return window.lunrIdx.search(searchValue(true)).slice(0, LIMIT_RESULTS);
    }
    const searchHits = getSearchHits()
    showSearchBox()
    if (!searchHits.length) {
      resultCard(`Not Found`, `Sorry, we couldn't find any matches. Try searching for a different keyword`)
      return
    }
    searchHits.forEach((hit) => {
      const document = documents.get(Number(hit.ref))
      if (!document) return
      const highlightedContent = highlightContent(document.content, hit)
      resultCard(document.title, highlightedContent, document.href)
    });
  }

  function resultCard(title, content, href) {
    const li = element('<li><a href><h4></h4><span></span></a></li>');
    if (href) li.querySelector('a').href = href;
    li.querySelector('h4').textContent = title;
    li.querySelector('span').innerHTML = content
    results.appendChild(li);
  }

  function highlightContent(content, hit) {
    const amountLetters = 60
    const { metadata } = hit.matchData
    let from = 0
    let to = 100
    const keys = Object.keys(metadata).sort()
    for (const key of keys) {
      const positions = metadata[key]?.content?.position
      if (!positions) {
        continue
      }
      for (const position of positions) {
        const positionStart = position[0]
        from = Math.max(0, content.length - positionStart <= amountLetters
          ? positionStart - amountLetters * 2
          : positionStart - amountLetters)
        to = positionStart + position[1] + amountLetters
      }
      break
    }
    let value = content.slice(from, to)
    if (from !== 0) {
      value = `...${value}`
    }
    for (const key of keys) {
      value = value.replace(new RegExp(key, 'gi'), '<strong>$&</strong>')
    }

    return value + '...'
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
    if (!resultsContainer.classList.contains('hidden')) {
      return
    }
    resultsContainer.scrollTop = 0
    show(searchOverlay)
    show(resultsContainer)
  }

  function hideSearchBox() {
    hide(searchOverlay)
    hide(resultsContainer)
  }
})();
