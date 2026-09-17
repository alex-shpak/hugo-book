---
title: Configuration
weight: 30
---

# Configuration

All theme parameters are set under `[params]` in your site config. Every parameter is optional.

## Theme Parameters

```toml {filename=hugo.toml}
[params]
# (Optional, default light) Sets color theme: light, dark or auto.
# Theme 'auto' switches between dark and light modes based on browser/os preferences
BookTheme = 'light'

# (Optional, default true) Controls table of contents visibility on right side of pages.
# Start and end levels can be controlled globally with markup.tableOfContents setting.
# You can also specify this parameter per page in front matter.
BookToC = true

# (Optional, default false) Controlls breadcurms, if true breadcrumbs are displayed at the beginning of the document.
# You can also specify this parameter per page in front matter.
BookBreadcrumbs = true

# (Optional, default false) Enableds incoming and outgoing links display next to table of contents on a page
# You can also specify this parameter per page in front matter.
BookPageLinks = true

# (Optional, default none) Set the path to a logo for the book.
# If the logo is /static/logo.png then the path would be logo.png
# BookLogo = 'favicon.svg'

# (Optional, default docs) Specify root page to render child pages as menu.
# Page is resoled by .GetPage function: https://gohugo.io/functions/getpage/
# For backward compatibility you can set '*' to render all sections to menu. Acts same as '/'
BookSection = 'docs'

# Here for backward compatibility, not required.
# It's here as an example how to use it with BookLastChangeLink or BookEditLink
BookRepo = 'https://github.com/alex-shpak/hugo-book/'

# (Optional, default none) Set template for commit link for the page. Requires enableGitInfo.
# When set enabled 'Last Modified' and a link to the commit in the footer of the page.
# Param is executed as template using .Site, .Page and .GitInfo as context.
BookLastChangeLink = '{{ .Site.Params.BookRepo }}/commit/{{ .GitInfo.Hash }}'

# (Optional, default none) Set template for edit page link.
# When set enabled 'Edit this page' link in the footer of the page.
# Param is executed as template using .Site, .Page and .Path as context.
BookEditLink = '{{ .Site.Params.BookRepo }}/edit/main/exampleSite/{{ .Path }}'

# (Optional, default 'January 2, 2006') Configure the date format used on the pages
# - In git information
# - In blog posts
# https://gohugo.io/functions/time/format/
BookDateFormat = 'January 2, 2006'

# (Optional, default true) Enables search function with MiniSearch.
# Index is built on fly, therefore it might slowdown your website.
# Configuration for indexing can be adjusted in i18n folder per language.
BookSearch = true

# (Optional, default false) Enables comments template on pages
# By default partials/docs/comments.html includes Disqus template
# See https://gohugo.io/content-management/comments/#configure-disqus
# Can be overwritten by same param in page frontmatter
BookComments = false

# /!\ This is an experimental feature, might be removed or changed at any time
# (Optional, experimental, default false) Enables portable links and link checks in markdown pages.
# Portable links meant to work with text editors and let you write markdown without {{< relref >}} shortcode
# Hugo Book will print warning or error if page referenced in markdown does not exists.
# Possible values are false | 'warning' | 'error'
BookPortableLinks = 'warning'

# /!\ This is an experimental feature, might be removed or changed at any time
# (Optional, experimental, default false)
# When set to 'preache' it enables a service worker that caches visited pages and resources for offline use.
# Possible values are false | true | 'precache'
BookServiceWorker = 'precache'

# /!\ This is an experimental feature, might be removed or changed at any time
# (Optional, experimental, default false) Enables a drop-down menu for translations only if a translation is present.
BookTranslatedOnly = false
```

## Search

Full-text search is enabled by default using [MiniSearch](https://lucaong.github.io/minisearch/). The search index is built at page load from a generated JSON file.

```toml {filename=hugo.toml}
[params]
  BookSearch = true
```

To exclude a page from the search index, set `bookSearchExclude: true` in its frontmatter.

If search is not working, verify that `baseURL` in your config matches the URL where the site is hosted. A mismatch prevents the search index from loading.

## Favicon

The theme links these files from the `static` directory:

- `favicon.svg`: modern browsers
- `favicon.png`: fallback for browsers without SVG favicon support
- `apple-touch-icon.png`: iOS home screen icon

To use your own favicon, place files with the same names in your project's `static` directory. They take precedence over the theme's files.

To use different file names or formats, override `layouts/_partials/docs/html-head-favicon.html` in your project.

## Hugo Site Configuration

These Hugo settings are relevant for the theme

```toml {filename=hugo.toml}
# Preserve URL casing (recommended)
disablePathToLower = true

# Enable git metadata for "Last Modified" footer
enableGitInfo = true
```

## Markup

### Goldmark Renderer

The `unsafe` option is **required** for Mermaid and KaTeX shortcodes to render correctly

```toml {filename=hugo.toml}
[markup.goldmark.renderer]
  unsafe = true
```

### Table of Contents

Control the heading levels included in the table of contents

```toml {filename=hugo.toml}
[markup.tableOfContents]
  startLevel = 1
  endLevel = 6
```

The `startLevel` and `endLevel` values apply globally. Individual pages can toggle the ToC on or off with the `bookToC` frontmatter parameter.

## Output Formats

The theme supports plain text output alongside HTML, useful for accessibility and LLMs

```toml {filename=hugo.toml}
[outputFormats.txt]
  mediaType = 'text/plain'
  baseName = 'source'
  isPlainText = true

[outputs]
  home = ['html', 'txt', 'rss']
  page = ['html', 'txt']
  section = ['html', 'txt']
```
