---
weight: 20
---

# Page Frontmatter

Every page can use these [frontmatter](https://gohugo.io/content-management/front-matter/) parameters to control its behavior in the theme.

{{< tabs >}}
{{% tab "YAML" %}}
```yaml {filename=_index.md}
---
title: My Page
weight: 10
params:
  bookToC: true
  bookCollapseSection: true
---
```
{{% /tab %}}

{{% tab "TOML" %}}
```toml {filename=_index.md}
+++
title = 'My Page'
weight = 10
bookToC = true
bookCollapseSection = true
+++
```
{{% /tab %}}

{{% tab "JSON" %}}
```json {filename=_index.md}
{
  "title": "My Page",
  "weight": 10,
  "bookToC": true,
  "bookCollapseSection": true
}
```
{{% /tab %}}
{{< /tabs >}}

## Navigation

These parameters control how the page appears in the sidebar menu. Set in page frontmatter.

| Parameter | Default | Description |
| --- | --- | --- |
| `weight`              | | Menu ordering. Lower values appear first. Without weight, pages are sorted alphabetically. |
| `bookHidden`          | `false` | Hide the page from the sidebar menu. The page is still accessible by URL. |
| `bookCollapseSection` | `false` | Make a section collapsible in the sidebar. Subsections are hidden until clicked. |
| `bookFlatSection`     | `false` | Display subsection pages at the same level instead of nesting them. |
| `bookHref`            | | Override the menu link with an external URL. |
| `bookIcon`            | | Display an icon next to the menu entry. |

## Content Display

These parameters control page content rendering. Set in page frontmatter.

| Parameter | Default | Description |
| --- | --- | --- |
| `bookToC`           | | Show or hide the table of contents. Overrides the site-level `BookToC` setting. |
| `bookBreadcrumbs`   | | Show or hide breadcrumbs. Overrides the site-level `BookBreadcrumbs` setting. |
| `bookPageLinks`     | | Show or hide linked pages under the table of contents. Overrides the site-level `BookPageLinks` setting. |
| `bookComments`      | | Show or hide comments. Overrides the site-level `BookComments` setting. |
| `bookSearchExclude` | `false` | Exclude this page from the search index. |

See [Blog](/docs/content/blog/) for post-specific frontmatter.
