{{- $searchData := resources.Get "search-data.js" | resources.ExecuteAsTemplate "search-data.js" . | resources.Minify | resources.Fingerprint }}

(function() {
  const input = document.querySelector("#book-search-input");
  const results = document.querySelector("#book-search-results");

  input.addEventListener("focus", init);
  input.addEventListener("keyup", search);

  function init() {
    input.removeEventListener("focus", init); //init once
    input.required = true;

    loadScript("{{ "lunr.min.js" | relURL }}");
    loadScript("{{ $searchData.RelPermalink }}", function() {
      input.readOnly = false;
      input.required = false;
      search();
    });
  }

  function search() {
    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }

    if (!input.value) {
      return;
    }

    const terms = lunr.tokenizer(input.value);
    const searchHits = window.bookSearch.idx.query(function(query) {
      query.term(terms, {
        boost: 100
      });
      query.term(terms, {
        boost: 10,
        wildcard: lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING
      });
      query.term(terms, {
        editDistance: 2
      });
    });

    searchHits.slice(0, 10).forEach(function(hit) {
      const page = window.bookSearch.pages[hit.ref];
      const li = document.createElement("li"),
            a = li.appendChild(document.createElement("a"));

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
