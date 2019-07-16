{{- $searchData := resources.Get "search-data.js" | resources.ExecuteAsTemplate "search-data.js" . | resources.Minify | resources.Fingerprint }}

(function() {
  const input = document.querySelector("#book-search-input");
  const results = document.querySelector("#book-search-results");
  const dummy = document.querySelector("#book-search-dummy");

  input.addEventListener("focus", init);

  function init() {
    loadScript("{{ "lunr.min.js" | relURL }}")
    loadScript("{{ $searchData.RelPermalink }}", function() {
      input.disabled = false;
      input.addEventListener("keyup", search);
      search();
    });
    input.removeEventListener("focus", init);
  }

  function search() {
    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }

    if (input.value) {
      const hits = window.bookSearch.idx.search(`${input.value}*`);
      hits.slice(0, 10).forEach(function(hit) {
        const page = window.bookSearch.pages[hit.ref];
        const li = dummy.querySelector("li").cloneNode(true),
              a = li.querySelector("a");

        a.href = page.href;
        a.textContent = page.title;

        results.appendChild(li);
      });
    }
  }

  function loadScript(src, callback) {
    const script = document.createElement("script");
    script.defer = true;
    script.src = src;
    script.onload = callback;

    document.head.append(script);
  }
})();
