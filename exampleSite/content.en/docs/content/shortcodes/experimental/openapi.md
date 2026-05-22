---
title: OpenAPI
---

# OpenAPI

Renders an OpenAPI 3.x specification as a documentation page. Operations are grouped by their first tag.

## Syntax

```tpl
{{%/* openapi src="spec.json" */%}}
```

The spec file is loaded via `resources.Get`, so the path is relative to the site's `assets/` directory. JSON and YAML are both supported.

## Example

{{% openapi src="tictactoe.json" %}}
