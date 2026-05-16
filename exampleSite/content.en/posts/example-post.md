---
title: "Example Blog Post"
date: 2025-01-15
tags: ["hugo", "theme"]
categories: ["Example"]
---

This is an example blog post demonstrating the Hugo Book blog layout.

## What This Demonstrates

Blog posts in Hugo Book support standard Hugo content features:

- **Date display**: configured via `BookDateFormat`
- **Tags and categories**: displayed as metadata
- **Pagination**: automatic when multiple posts exist
- **Prev/next navigation**: links between posts in the section

## Adding Your Own Posts

Create markdown files under `content/posts/`:

```
content/
└── posts/
    ├── _index.md
    ├── first-post.md
    └── second-post.md
```

Each post needs at minimum a `title` and `date` in frontmatter. See [Blog](/docs/content/blog/) for full documentation.
