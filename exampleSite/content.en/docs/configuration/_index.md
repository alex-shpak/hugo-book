---
weight: 30
---

# Configuration

All theme parameters are set under `[params]` in your site config. Every parameter is optional.

## Theme Parameters

```toml {filename=hugo.toml}
[params]
  # Color theme: 'light', 'dark' or 'auto'
  # Auto switches based on OS/browser preference
  BookTheme = 'light'

  # Show table of contents on right side of pages
  # Can also be set per-page via frontmatter
  BookToC = true

  # Path to favicon file relative to 'static' directory
  BookFavicon = 'favicon.png'

  # Path to logo image file relative to 'static' directory
  BookLogo = 'logo.png'

  # Root section to render as sidebar menu
  # Default: 'docs'
  BookSection = 'docs'

  # Repository URL, used for edit and commit links
  BookRepo = 'https://github.com/user/repo'

  # Template for "Last Modified" commit link in page footer
  # Requires enableGitInfo = true in site config
  # Available context: .Site, .Page, .GitInfo
  BookLastChangeLink = '{{ .Site.Params.BookRepo }}/commit/{{ .GitInfo.Hash }}'

  # Template for "Edit this page" link in page footer
  # Available context: .Site, .Page, .Path
  BookEditLink = '{{ .Site.Params.BookRepo }}/edit/main/{{ .Path }}'

  # Date format used in git info and blog posts
  BookDateFormat = 'January 2, 2006'

  # Enable full-text search with fuse.js
  BookSearch = true

  # Enable comments template on pages
  # By default uses Disqus; override partials/docs/comments.html for others
  BookComments = true

  # Enable portable markdown links (resolve relative .md links)
  # Values: false, 'warning', 'error'
  BookPortableLinks = false

  # Enable service worker for offline caching
  # Values: false, true, 'precache'
  BookServiceWorker = false

  # Only show languages that have translations for current page
  BookTranslatedOnly = false
```

## Search

Full-text search is enabled by default using [Fuse.js](https://www.fusejs.io/). The search index is built at page load from a generated JSON file.

```toml {filename=hugo.toml}
[params]
  BookSearch = true
```

To exclude a page from the search index, set `bookSearchExclude: true` in its frontmatter.

If search is not working, verify that `baseURL` in your config matches the URL where the site is hosted. A mismatch prevents the search index from loading.

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
  endLevel = 4
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

## Portable Links

> [!WARNING]
> Experimental feature. May change or be removed.

Portable links resolve relative markdown links (`[text](./other-page.md)` or `[text](/docs/other-page.md)`) to the correct Hugo URLs. This lets you write standard markdown that works in both text editors and the rendered site.

```toml {filename=hugo.toml}
[params]
  BookPortableLinks = 'warning'
```

`false`
: Disabled. Relative `.md` links are not resolved.

`'warning'`
: Enabled. Hugo prints a warning during build if a linked page doesn't exist.

`'error'`
: Enabled. Hugo fails the build if a linked page doesn't exist.

With portable links enabled, you can write

```markdown
See [Configuration](./configuration.md) for details.
```

Instead of Hugo's `relref` shortcode. Both image links and page links are resolved.

## Service Worker

> [!WARNING]
> Experimental feature. May change or be removed.

Hugo Book can register a service worker for offline access to visited pages.

```toml {filename=hugo.toml}
[params]
  BookServiceWorker = 'precache'
```

`false`
: Disabled (default).

`true`
: Enables a service worker that caches pages as you visit them for offline reading.

`'precache'`
: Enables a service worker that pre-populates the cache with all site pages on first load. Visited resources are also cached.
