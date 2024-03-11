'use strict';

{{ $searchDataFile := printf "%s.search-data.json" .Language.Lang }}
{{ $searchData := resources.Get "search-data.json" | resources.ExecuteAsTemplate $searchDataFile . | resources.Minify | resources.Fingerprint }}
{{ $searchConfig := i18n "bookSearchConfig" | default "{}" }}

(function () {
  const searchDataURL = '{{ $searchData.RelPermalink }}';
  const indexConfig = Object.assign({{ $searchConfig }}, {
    doc: {
      id: 'id',
      field: ['title', 'content'],
      store: ['title', 'href', 'section']
    }
  });

  const input = document.querySelector('#book-search-input');
  const results = document.querySelector('#book-search-results');

  if (!input) {
    return
  }

  input.addEventListener('focus', init);
  input.addEventListener('keyup', search);

  document.addEventListener('keypress', focusSearchFieldOnKeyPress);

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
        window.bookSearchIndex = FlexSearch.create('balance', indexConfig);
        window.bookSearchIndex.add(pages);
      })
      .then(() => input.required = false)
      .then(search);
  }

  function search() {
    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }

    if (!input.value) {
      return;
    }

    const searchHits = window.bookSearchIndex.search(input.value, 10);
    searchHits.forEach(function (page) {
      const li = element('<li><a href></a><small contenteditable="false" ></small></li>');
      const a = li.querySelector('a'), small = li.querySelector('small');

      a.href = page.href;
      a.textContent = page.title;

      fetch(page.href)
        .then((response) => response.text())
        .then((content) => {
          // Initialize the DOM parser
          var parser = new DOMParser();
          // Parse the text
          var doc = parser.parseFromString(content, "text/html");
          // You can now even select part of that html as you would in the regular DOM
          // Example:
          // var docArticle = doc.querySelector('article').innerHTML;
          content = doc.querySelector('#content').querySelector('article').textContent
          let contentArray = lengthSplit(content, 20);
          contentArray.forEach(line => {
            if (line.match(/^\s+$/) || line.match(/^[ ]+$/) || line.match(/^[ ]*$/) || line.match(/^\s*$/)) {
              return;
            }
            if (line.search(input.value) != -1 && small.innerHTML == '') {
              small.innerHTML = line.replaceAll(input.value, String.raw`<strong style="color:red" >${input.value}</strong>`);
              return;
            }
          })
          if (small.innerHTML == '') {
            contentArray.forEach(line => {
              if (line.match(/^\s+$/) || line.match(/^[ ]+$/) || line.match(/^[ ]*$/) || line.match(/^\s*$/)) {
                return;
              }
              input.value.split('').forEach(s => {
                if (line.search(s) != -1 && small.innerHTML == '') {
                  small.innerHTML = line.replaceAll(s, String.raw`<strong style="color:red" >${s}</strong>`);
                  return;
                }
              })
            })
          }
        });
      
      results.appendChild(li);
    });
  }

function lengthSplit(str, num) {
  let strArr = [];
  for (let i = 0; i < str.length; i += num) strArr.push(str.slice(i, i + num));
  return strArr;
}

  /**
   * @param {String} content
   * @returns {Node}
   */
  function element(content) {
    const div = document.createElement('div');
    div.innerHTML = content;
    return div.firstChild;
  }
})();
