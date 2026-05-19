---
weight: 30
---

# Menu System

Hugo Book supports two types of menus: an automatic file-tree menu built from your content structure, and Hugo's standard menu system for additional navigation.

## File-Tree Menu

The sidebar menu is automatically generated from pages in the `BookSection` directory (default: `docs/`). The hierarchy mirrors your directory structure.

Control how sections appear with [page frontmatter](/docs/content/pages/).

## Hugo Menus

The theme renders three Hugo menu locations:

| Menu | Location 
| --   | -- 
| `menu.before` | Rendered **above** the file-tree menu.
| `menu.after`  | Rendered **below** the file-tree menu.
| `menu.home`   | Rendered on the landing page header (only on pages with `layout: landing`).

### Configuration

Define menus in your site config

```toml {filename=hugo.toml}
[[menu.before]]
  name = 'Overview'
  url = '/overview/'
  weight = 1

[[menu.after]]
  name = 'Github'
  url = 'https://github.com/user/repo'
  weight = 10

[[menu.after]]
  name = 'Hugo Themes'
  url = 'https://themes.gohugo.io/themes/hugo-book/'
  weight = 20
```

Or add pages to menus via frontmatter

```yaml
---
title: Blog
menu:
  after:
    weight: 5
---
```

### Menu Item Parameters

Menu items support these params under `[params]`:

```toml {filename=hugo.toml}
[[menu.after]]
  name = 'Example'
  url = '/example/'
  weight = 10
  [menu.after.params]
    bookIcon = 'star'       # Icon name to display next to the item
    bookNewTab = true        # Open the link in a new tab
    class = 'custom-class'   # CSS class to add to the menu item
```
