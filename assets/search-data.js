'use strict';

(function() {
  const indexCfg = {{ with .Site.Params.BookSearchConfig }}
    {{ . }}
  {{ end }};

  indexCfg.doc = {
    id: 'id',
    field: ['title', 'content'],
    store: ['title', 'href'],
  };

  const index = FlexSearch.create('balance', indexCfg);
  window.bookSearchIndex = index;

  {{ range $index, $page := .Site.Pages }}
  index.add({
    'id': {{ $index }},
    'href': '{{ $page.RelPermalink }}',
    'title': {{ (partial "docs/title" $page) | jsonify }},
    'content': {{ $page.Plain | jsonify }}
  });
  {{- end -}}
})();
