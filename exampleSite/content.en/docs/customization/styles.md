---
title: Styles
weight: 20
---

# Styles

## Built-in Themes

Theme comes with a set of predefined color schemes, Use `BookTheme` parameter in your site config:

```toml {filename=hugo.toml}
[params]
  BookTheme = 'light'  # or 'dark', 'auto'
```

| Theme               | Description |
| ---                 | --- |
| `light`             | Default. Light background with dark text |
| `dark`              | Dark background (Nord palette) with light text |
| `auto`              | Switches between light and dark based on OS |
| `contrast-light`    | High contrast light variant |
| `contrast-dark`     | High contrast dark variant |
| `contrast-auto`     | High contrast, auto-switching |
| `catppuccin-light`  | [Catppuccin](https://catppuccin.com/) Latte palette |
| `catppuccin-dark`   | Catppuccin Frappe palette |
| `catppuccin-auto`   | Catppuccin, auto-switching |
| `ayu-light`         | [Ayu](https://github.com/ayu-theme) light palette |
| `ayu-dark`          | Ayu mirage dark palette |
| `ayu-auto`          | Ayu, auto-switching |

The list of themes, except `light`, `dark`, and `auto` is not written in stone and potentially would change in the future.

## Custom Theme

A theme is just a block of CSS variables selected by `data-theme`. You can define your own in `assets/styles/custom.css`:

```css {filename="assets/styles/custom.css"}
:root[data-theme="mytheme"] {
  --body-background: #fafafa;
  --body-font-color: #333;
  ...
}
```

Then set `BookTheme = 'mytheme'`.

## Custom Styles

The file `assets/styles/custom.css` is loaded last, so it overrides every theme style, in this way you can customize styles without editing Hugo theme sources.

```css {filename="assets/styles/custom.css"}
.book-page {
  max-width: 60rem;
}

.book-menu nav {
  font-size: 0.9rem;
}
```

## CSS Variables

The theme is driven by CSS variables:

- Per-theme colors — [`assets/styles/themes.css`](https://github.com/alex-shpak/hugo-book/blob/main/assets/styles/themes.css)
- Base tokens (font sizes, spacing, etc) — [`assets/styles/variables.css`](https://github.com/alex-shpak/hugo-book/blob/main/assets/styles/variables.css)

Override any of them in `assets/styles/custom.css`. To adjust the current theme regardless of which one is active, target `:root`:

```css {filename="assets/styles/custom.css"}
:root {
  --menu-width: 18rem;
}
```

## File overrides

Hugo's [lookup order](https://gohugo.io/templates/lookup-order/) lets you override any theme file by creating the same file in your project:

- `layouts/`: Override templates and partials
- `assets/`: Override CSS and JavaScript
- `static/`: Override static files (favicon, images)
- `i18n/`: Override or add translations
