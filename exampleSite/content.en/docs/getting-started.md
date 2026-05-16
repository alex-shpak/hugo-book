---
weight: 20
---

# Getting Started

## Prerequisites

- [Hugo](https://gohugo.io/installation/) **extended** edition (required for SCSS processing)
- [Git](https://git-scm.com/downloads) (for theme installation using git submodules)
- [Go](https://go.dev/dl/) (for theme installation using Hugo Modules)

## Quick Start

Use the [starter repository](https://github.com/alex-shpak/hugo-book-starter) to get a working site in seconds. It can also be used as a [GitHub template](https://github.com/alex-shpak/hugo-book-starter/generate) to create a new repository.

```shell
git clone https://github.com/alex-shpak/hugo-book-starter documentation
cd documentation
git submodule update --init --remote
hugo server --minify
```

By default, the theme renders pages under `docs/` section as the sidebar menu. See [Content Organization](/docs/content/) for details.

## Installation Methods

{{< tabs >}}

{{% tab "Git Submodule" %}}
The simplest approach. The theme is vendored directly into your repository.

```shell
git init
git submodule add https://github.com/alex-shpak/hugo-book themes/hugo-book
```

Set the theme in your config

```toml {filename=hugo.toml}
theme = 'hugo-book'
```

To update the theme later

```shell
git submodule update --remote --merge
```
{{% /tab %}}

{{% tab "Hugo Module" %}}
Uses [Hugo Modules](https://gohugo.io/hugo-modules/) (requires [Go](https://go.dev/dl/)).

Initialize your site as a module

```shell
hugo mod init github.com/user/my-docs
```

Add the theme import to your config

```toml {filename=hugo.toml}
[module]
[[module.imports]]
  path = 'github.com/alex-shpak/hugo-book'
```

To update the theme later

```shell
hugo mod get -u
```
{{% /tab %}}

{{% tab "Manual Download" %}}
Download the theme from [GitHub releases](https://github.com/alex-shpak/hugo-book/releases) and extract it to `themes/hugo-book`.

Set the theme in your config

```toml {filename=hugo.toml}
theme = 'hugo-book'
```

To update, download and extract the new release again.
{{% /tab %}}

{{< /tabs >}}

## Minimal Configuration

```toml {filename=hugo.toml}
baseURL = 'https://example.com/'
title = 'My Documentation'
theme = 'hugo-book'

# Required for mermaid and katex shortcodes
[markup.goldmark.renderer]
  unsafe = true
```

See [Configuration](/docs/configuration/) for the full list of parameters.
