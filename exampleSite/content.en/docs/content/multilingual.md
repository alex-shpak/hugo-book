---
title: Multi-Language
weight: 50
---

# Multi-Language Support

Hugo Book supports Hugo's [multilingual mode](https://gohugo.io/content-management/multilingual/) with content translation by directory.

## Configuration

Define languages in your site config

```toml {filename=hugo.toml}
[languages]
[languages.en]
  label = 'English'
  contentDir = 'content.en'
  weight = 1

[languages.zh]
  label = 'Chinese'
  contentDir = 'content.zh'
  weight = 2

[languages.he]
  label = 'Hebrew'
  contentDir = 'content.he'
  direction = 'rtl'
  weight = 3
```

A language selector dropdown appears automatically when multiple languages are configured.

## RTL Support

Set `direction = 'rtl'` on a language to enable right-to-left layout. The entire page layout, including the sidebar menu, mirrors automatically.

## Translation Dropdown

By default, all configured languages appear in the selector. To only show languages that have a translation for the current page

```toml {filename=hugo.toml}
[params]
  BookTranslatedOnly = true
```
