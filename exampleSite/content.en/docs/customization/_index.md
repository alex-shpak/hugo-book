---
weight: 50
---

# Customization

Hugo Book can be customized through theming, custom SCSS, 'inject' partials, and file overrides.

## Built-in Themes

Set `BookTheme` in your site config

```toml {filename=hugo.toml}
[params]
  BookTheme = 'light'  # or 'dark', 'auto'
```

| Theme   | Description |
| --- | --- |
| `light` | Default. Light background with dark text. |
| `dark`  | Dark background (Nord palette) with light text. |
| `auto`  | Switches between light and dark based on OS/browser preference (`prefers-color-scheme`). |

## Plugin Themes

Additional themes are available as SCSS plugins. Import in your `assets/_custom.scss`

```scss
@import "plugins/themes";
```

Then set `BookTheme` to one of:

| Theme | Description |
| --- | --- |
| `contrast-light`    | High contrast light variant |
| `contrast-dark`     | High contrast dark variant |
| `contrast-auto`     | High contrast, auto-switching |
| `catppuccin-light`  | [Catppuccin](https://catppuccin.com/) Latte palette |
| `catppuccin-dark`   | Catppuccin Frappe palette |
| `catppuccin-auto`   | Catppuccin, auto-switching |
| `ayu-light`         | [Ayu](https://github.com/ayu-theme) light palette |
| `ayu-dark`          | Ayu mirage dark palette |
| `ayu-auto`          | Ayu, auto-switching |

## Custom Theme

Define a theme mixin in `assets/_custom.scss`

```scss
@mixin theme-mytheme {
  --body-background: #fafafa;
  --body-font-color: #333;
  --color-link: #0066cc;
  --color-visited-link: #6633cc;
}
```

Then set `BookTheme = 'mytheme'`. The theme uses `@include theme-{{ .Site.Params.BookTheme }}` to select the mixin at build time.

For auto-switching themes (light/dark based on OS preference), see the `theme-auto` mixin in `assets/_defaults.scss` as a reference.

## CSS Custom Properties

Override CSS custom properties in `_custom.scss` to adjust the current theme. The full set of properties is defined in [`assets/_defaults.scss`](https://github.com/alex-shpak/hugo-book/blob/main/assets/_defaults.scss).

## Custom Styles

The theme includes an empty `assets/_custom.scss` file that is loaded after all theme styles. Create this file in your project's `assets/` directory to add custom CSS without overriding the entire stylesheet.

```scss
// assets/_custom.scss

.book-page {
  max-width: 60rem;
}

.book-menu nav {
  font-size: 0.9rem;
}
```

## SCSS Plugins

The theme ships with optional SCSS plugins. Import them in your `_custom.scss`:

```scss
@import "plugins/numbered"; /* Automatically number headings in the content area */
@import "plugins/scrollbars"; /* Style scrollbars in the sidebar and content area */
```

## SCSS Variables

Layout variables like sidebar width, breakpoints, and padding are defined in [`assets/_defaults.scss`](https://github.com/alex-shpak/hugo-book/blob/main/assets/_defaults.scss). Override them in your `_custom.scss`.

## 'Inject' Partials

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

### Example

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

## Override Priority

Hugo's [lookup order](https://gohugo.io/templates/lookup-order/) lets you override any theme file by creating the same file in your project:

- `layouts/`: Override templates and partials
- `assets/`: Override SCSS and JavaScript
- `static/`: Override static files (favicon, images)
- `i18n/`: Override or add translations
