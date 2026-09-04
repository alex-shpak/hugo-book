{{ $searchDataFile := printf "%s.search-data.json" .Language.Name }}
{{ $searchData := resources.Get "search-data.json" | resources.ExecuteAsTemplate $searchDataFile . | resources.Minify | resources.Fingerprint }}
{{ $searchConfig := i18n "bookSearchConfig" | default "{}" }}

(function () {
  const searchDataURL = '{{ partial "docs/links/resource-precache" $searchData }}';
  const searchEngineURL = '{{ "minisearch.min.js" | relURL }}';

  const indexConfig = Object.assign({
    fields: ['title', 'content'],
    storeFields: ['title', 'content', 'href'],
    searchOptions: {
      boost: { title: 2 },
      prefix: true,
      fuzzy: 0.2,
      combineWith: 'AND'
    }
  }, {{ $searchConfig }});

  const input = document.querySelector('#book-search-input');
  const results = document.querySelector('#book-search-results');

  if (!input) {
    return
  }

  let debounce;

  input.addEventListener('focus', init, { once: true });
  input.addEventListener('input', function () {
    clearTimeout(debounce);
    debounce = setTimeout(search, 250);
  });

  document.addEventListener('keydown', focusOnKeyDown);

  /**
   * @param {KeyboardEvent} event
   */
  function focusOnKeyDown(event) {
    if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      input.focus();
      return;
    }

    if (input === document.activeElement) {
      return;
    }

    if (event.target.value !== undefined) {
      return;
    }

    if (event.key === '/') {
      event.preventDefault();
      input.focus();
    }
  }

  function init() {
    input.required = true;

    Promise.all([
      import(searchEngineURL),
      fetch(searchDataURL).then(pages => pages.json())
    ]).then(([, pages]) => {
      window.bookSearchIndex = new MiniSearch(indexConfig);
      return window.bookSearchIndex.addAllAsync(pages);
    }).then(() => input.required = false)
      .then(search);
  }

  function search() {
    results.replaceChildren();

    if (!input.value) {
      return;
    }

    const searchHits = window.bookSearchIndex.search(input.value).slice(0, 5);
    searchHits.forEach(function (page) {
      const li = element('<li><a href><span></span></a><small></small></li>');

      const anchor = li.querySelector('a'),
        title = li.querySelector('a > span'),
        content = li.querySelector('small');

      anchor.href = `${page.href}#:~:text=${page.terms[0]}`;
      title.append(...highlight(page.title, match(page, 'title')));
      content.append(...highlight(page.content, match(page, 'content'), 16, 32));

      results.appendChild(li);
    });
  }

  /**
   * @param {SearchResult} hit
   * @param {String} field
   * @returns {String|undefined} the search term that matched in the given field
   */
  function match(hit, field) {
    return hit.terms.find(term => hit.match[term].includes(field));
  }

  /**
   * @param {String} text
   * @param {String|undefined} match term to wrap in <mark>, with `before`/`after` characters of context around it
   * @param {Number} before
   * @param {Number} after
   * @returns {Array<Node|String>}
   */
  function highlight(text, match, before = 0, after = text.length) {
    const start = match ? text.toLowerCase().indexOf(match) : -1;
    if (start < 0) {
      return [text.slice(0, after)];
    }

    const end = start + match.length;
    const mark = element('<mark></mark>');
    mark.textContent = text.slice(start, end);

    return [
      text.slice(Math.max(0, start - before), start),
      mark,
      text.slice(end, end + after)
    ];
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
