(function() {
  const pages = [
    {{ range $index, $page := .Site.Pages }}
      {{- if and $index (gt $index 0) -}},{{- end }}
      {
        "idx": {{ $index }},
        "href": "{{ $page.RelPermalink }}",
        "title": "{{ partial "docs/title" $page }}",
        "content": {{ $page.Plain | jsonify }}
      }
    {{- end -}}
  ];

  window.bookSearch = {
    pages: pages,
    idx: lunr(function() { 
      this.ref("idx");
      this.field("title", { boost: 10000 });
      this.field("content");

      pages.forEach(this.add, this);
    }),
  }
})();
