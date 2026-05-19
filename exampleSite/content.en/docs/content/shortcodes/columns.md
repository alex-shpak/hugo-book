# Columns

Organize content horizontally. Renders a markdown list as up to 3 side-by-side columns.

## Syntax

```tpl
{{%/* columns [ratio="1:1"] [class="..."] */%}}
- ### Left
  Content...

- ### Right
  Content...
{{%/* /columns */%}}
```

## Example

{{% columns %}}
- ### File-Tree Menu
  The sidebar menu is automatically generated from your content directory structure. Pages are ordered by `weight` frontmatter.

- ### Hugo Menus
  Additional menu entries can be added above or below the file-tree using Hugo's standard menu system in your site config.

- ### Landing Menu
  Pages with `layout: landing` use a separate menu defined under `menu.home` for header navigation.
{{% /columns %}}

## Custom Ratio

Set relative column widths with the `ratio` parameter

```tpl
{{%/* columns ratio="1:2" */%}}
- ### Sidebar
- ### Content Area
{{%/* /columns */%}}
```

{{% columns ratio="1:2" %}}
- ### File-Tree Menu
  The sidebar menu is automatically generated from your content directory structure. Pages are ordered by `weight` frontmatter.

- ### Hugo Menus
  Additional menu entries can be added above or below the file-tree using Hugo's standard menu system in your site config.
{{% /columns %}}
