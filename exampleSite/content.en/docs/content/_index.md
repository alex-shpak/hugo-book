---
weight: 40
title: Content & Structure
bookCollapseSection: true
---

# Content Organization

Hugo Book renders pages from a section as a sidebar menu. By default this is the `docs/` directory.

## Example Directory Structure

```
content/
├── docs/
│   ├── _index.md
│   ├── getting-started.md
│   ├── guide/
│   │   ├── _index.md
│   │   ├── install.md
│   │   └── configure.md
│   └── reference/
│       └── _index.md
├── posts/
│   ├── _index.md
│   └── my-post.md
└── _index.md
```

Pages are ordered by `weight` frontmatter, then alphabetically. Section `_index.md` files define the section entry in the menu.

## Changing the Menu Section

By default, pages under `docs/` are rendered as the sidebar menu. Change this with the `BookSection` parameter in [Configuration](/docs/configuration/). Set to `'/'` to render all top-level sections.

## Page Layouts

The theme provides several layouts:

| Layout    | Usage                | Description |
| --- | --- | --- |
| (default) | Documentation pages  | Sidebar menu + content + optional ToC |
| `landing` | `layout: landing`    | Full-width, no sidebar. Used for homepages. |
| `book`    | `layout: book`       | Single-page view with all subsections listed |
| `posts`   | Pages under `posts/` | Blog-style with date, tags, pagination |

Set the layout in frontmatter

```yaml {filename=_index.md}
---
layout: landing
---
```

See [Pages](/docs/content/pages/) for frontmatter reference and [Menus](/docs/content/menus/) for navigation controls.
