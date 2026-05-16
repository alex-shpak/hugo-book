# Cards

Content blocks with optional images and links. Often used with [Columns](/docs/shortcodes/columns) for grid layouts.

## Syntax

```tpl
{{</* card [href="..."] [image="..."] [title="..."] */>}}
Markdown content
{{</* /card */>}}
```

## Example

{{% columns %}}
- {{< card image="placeholder.svg" >}}
  ### With Image
  Cards can display an image above the content.
  {{< /card >}}

- {{< card href="/docs/shortcodes/experimental/cards" >}}
  ### With Link {anchor=false}
  When `href` is set, the entire card becomes clickable.
  {{< /card >}}

- {{< card title="Card" >}}
  ### Plain Card
  A basic card with no image or link, used for grouping related content.
  {{< /card >}}
{{% /columns %}}

## Parameters

`href`
: Makes the card a link. The entire card area becomes clickable.

`image`
: Path to an image displayed above the card content. Supports page resources and URLs.

`title`
: Accessible title for the card.

`alt`
: Alt text for the card image.

`class`
: Additional CSS classes.
