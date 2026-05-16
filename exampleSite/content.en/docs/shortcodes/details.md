# Details

Collapsible content using the HTML5 `<details>` element.

## Syntax

Positional arguments:
```tpl
{{%/* details "Title" [open] */%}}
Markdown content
{{%/* /details */%}}
```

Named parameters:
```tpl
{{%/* details title="Title" open=true */%}}
Markdown content
{{%/* /details */%}}
```

## Example

{{% details "What Hugo version is required?" %}}
Hugo Book requires Hugo {x} or later, extended edition. The extended edition is needed for SCSS processing.
{{% /details %}}

{{% details "How do I override the theme?" open %}}
Create matching files in your project's `layouts/` or `assets/` directory. Hugo's lookup order will use your files over the theme's.
{{% /details %}}

## Parameters

`title` (or first positional argument)
: The summary text shown when collapsed.

`open` (or second positional argument)
: Start expanded. Default: collapsed.
