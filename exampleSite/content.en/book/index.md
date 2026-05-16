---
title: Single Page
layout: book
menu:
  after:
    weight: 7
---

# Single Page Layout

This page uses `layout: book`, which renders all content on a single page without sidebar navigation.

Use this layout for standalone pages that don't belong in the documentation hierarchy, such as:

- Changelog or release notes
- A comprehensive reference that should be scrollable as one document
- Print-friendly pages

## Configuration

Set in frontmatter:

```yaml
---
layout: book
---
```

The page can still appear in menus via the `menu` frontmatter parameter:

```yaml
---
layout: book
menu:
  after:
    weight: 7
---
```
