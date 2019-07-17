{{- $searchData := resources.Get "search-data.js" | resources.ExecuteAsTemplate "search-data.js" . | resources.Minify | resources.Fingerprint }}

(function() {
  const input = document.querySelector("#book-search-input");
  const results = document.querySelector("#book-search-results");
  const dummy = document.querySelector("#book-search-dummy");

  input.addEventListener("focus", init);
  input.addEventListener("keyup", search);

  function init() {
    loadScript("{{ "lunr.min.js" | relURL }}")
    loadScript("{{ $searchData.RelPermalink }}", function() {
      input.readOnly = false;
      search();
    });

    input.removeEventListener("focus", init);
  }

  function search() {
    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }

    if (!input.value || !window.bookSearch) {
      return
    }

    const terms = lunr.tokenizer(input.value);
    const searchHits = window.bookSearch.idx.query(function(query) {
      query.term(terms, {
        boost: 100,
      });
      query.term(terms, {
        boost: 10,
        wildcard: lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING,
      });
      query.term(terms, {
        editDistance: 2
      });
    });

    searchHits.slice(0, 10).forEach(function(hit) {
      const page = window.bookSearch.pages[hit.ref];
      const li = dummy.querySelector("li").cloneNode(true),
            a = li.querySelector("a");

      a.href = page.href;
      a.textContent = page.title;

      results.appendChild(li);
    });
  }

  function loadScript(src, callback) {
    const script = document.createElement("script");
    script.defer = true;
    script.src = src;
    script.onload = callback;

    document.head.append(script);
  }
})();
