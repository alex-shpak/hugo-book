# Cards

## Example

{{% columns %}}
- {{< card image="placeholder.svg" >}}
  ### Line 1
  Line 2
  {{< /card >}}

- {{< card image="placeholder.svg" >}}
  This is tab MacOS content.
  {{< /card >}}
{{% /columns %}}

{{% columns %}}
- {{< card href="/docs/shortcodes/cards" >}}
  **Markdown**  
  Suspendisse sed congue orci, eu congue metus. Nullam feugiat urna massa.
  {{< /card >}}

- {{< card >}}
  Suspendisse sed congue orci, eu congue metus. Nullam feugiat urna massa, et fringilla metus consectetur molestie.
  {{< /card >}}

- {{< card title="Card" >}}
  ### Heading
  This is tab MacOS content.
  {{< /card >}}
{{% /columns %}}

## Build-in figure shortcode
Hugo's built-in figure shortcode is also styled as a card

{{% columns %}}
- ```go-html-template
  {{</* figure
    src="placeholder.svg"
    alt="A placeholder image"
    link="#"
    caption="A placeholder image caption"
    loading="lazy"
    target="_blank"
    title="Figure Title"
    caption="A caption for the figure"
    attr="An attribution"
    attrlink="#"
  */>}}
  ```

- {{< figure
    src="placeholder.svg"
    alt="A placeholder image"
    link="#"
    caption="A placeholder image caption"
    loading="lazy"
    target="_blank"
    title="Figure Title"
    caption="A caption for the figure"
    attr="An attribution"
    attrlink="#"
  >}}
{{% /columns %}}
