---
title: Styles
weight: 20
---

# Styles

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

## Override Priority

Hugo's [lookup order](https://gohugo.io/templates/lookup-order/) lets you override any theme file by creating the same file in your project:

- `layouts/`: Override templates and partials
- `assets/`: Override SCSS and JavaScript
- `static/`: Override static files (favicon, images)
- `i18n/`: Override or add translations
