---
title: Inject Partials
weight: 30
---

# Inject Partials

The theme provides empty partial templates at key points in the page layout. Override these to inject custom HTML without modifying the base templates.

Create matching files in your project's `layouts/_partials/docs/inject/` directory.

| Partial | Location |
| --- | --- |
| `inject/head.html` | Inside `<head>`, e.g. meta tags, stylesheets, scripts |
| `inject/body.html` | Before `</body>`, e.g. analytics, chat widgets, scripts |
| `inject/menu-before.html` | Before the sidebar menu |
| `inject/menu-after.html` | After the sidebar menu |
| `inject/content-before.html` | Before the page content |
| `inject/content-after.html` | After the page content |
| `inject/toc-before.html` | Before the table of contents |
| `inject/toc-after.html` | After the table of contents |
| `inject/footer.html` | Inside the page footer |

## Example

To add a Google Analytics script, create `layouts/_partials/docs/inject/head.html`

```html
{{ with .Site.Params.googleAnalytics }}
<script async src="https://www.googletagmanager.com/gtag/js?id={{ . }}"></script>
{{ end }}
```

To add a custom banner above every page, create `layouts/_partials/docs/inject/content-before.html`

```html
<div class="my-banner">
  This documentation is for version 2.0. See <a href="/v1/">version 1.0 docs</a>.
</div>
```
