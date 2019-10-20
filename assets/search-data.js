(function() {
  const pages = [
    {{ range $index, $page := .Site.Pages }}
      {{- if $index -}},{{- end }}
      {
        'idx': {{ $index }},
        'href': '{{ $page.RelPermalink }}',
        'title': {{ (partial "docs/title" $page) | jsonify }},
        'content': {{ $page.Plain | jsonify }}
      }
    {{- end -}}
  ];

  var index = new FlexSearch({
    cache: true,
    encode: 'balance',
    /* tokenize: function(str) {
      return str.replace(/[\x00-\x7F]/g, ' ').split('');
    } */
  });

  pages.forEach(function(page, x) {
    index.add(x, pages[x].content);
  })

  window.bookSearch = {
    pages: pages,
    index: index,
  }
})();
