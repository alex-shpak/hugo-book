# Images

Enhanced image display with click-to-expand behavior.

## Syntax

```tpl
{{</* image src="photo.jpg" alt="Description" title="Caption" loading="lazy" */>}}
```

## Example

{{< image src="placeholder.svg" alt="Placeholder image" title="Click to expand" loading="lazy" >}}

## Parameters

`src`
: Path to the image. Supports page resources, site resources, and URLs.

`alt`
: Alternate text for accessibility.

`title`
: Caption displayed below the image.

`loading`
: Loading strategy: `lazy`, `eager`, or `auto`.

`class`
: Additional CSS classes on the `<img>` element.
