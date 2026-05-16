# Buttons

Styled links that can point to local pages or external URLs. External links automatically open in a new tab.

## Syntax

```tpl
{{</* button relref="/" [class="..."] */>}}Get Home{{</* /button */>}}
{{</* button href="https://github.com/alex-shpak/hugo-book" */>}}Github{{</* /button */>}}
```

## Example

{{<button href="/">}}Home{{</button>}}
{{<button href="https://github.com/alex-shpak/hugo-book">}}Github{{</button>}}

## Parameters

`href`
: URL for external links.

`relref`
: Hugo page reference for internal links.

`class`
: Additional CSS classes.
