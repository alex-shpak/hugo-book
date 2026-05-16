---
weight: 3
---

# Blog

Hugo Book includes templates for blog-style posts with dates, tags, and pagination. Blog functionality is very basic.

## Setup

Create a `posts/` section in your content directory

```
content/
└── posts/
    ├── _index.md
    └── my-first-post.md
```

Add the blog section to a menu so readers can find it

```yaml
---
title: Blog
menu:
  after:
    weight: 5
---
```

## Post Frontmatter

```yaml
---
title: "My First Post"
date: 2025-01-15
tags: ["hugo", "documentation"]
categories: ["Guides"]
---
```

## Thumbnails

Posts can display a thumbnail image. By default the theme looks for a file matching `thumbnail.*` in the post's page bundle. Override the pattern per-post

```yaml
---
bookPostThumbnail: "cover.*"
---
```

## Date Format

The date display format is configured site-wide via `BookDateFormat`. See [Configuration](/docs/configuration/) for details.
