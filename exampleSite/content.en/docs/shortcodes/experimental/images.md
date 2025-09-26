# Images

> [!WARNING]
> Experimental, could change in the future or be removed

Image shortcode produces an image that can be clicked to expand.

## Example

```go-html-template
{{</* image src="placeholder.svg" alt="A placeholder" title="A placeholder" loading="lazy" */>}}
```
{{< image src="placeholder.svg" alt="A placeholder" title="A placeholder" loading="lazy" >}}

## Parameters

`src` {{< badge style="warning" title="Required" >}}
: The link to the image

`class` {{< badge style="info" title="Optional" >}}  
: An optional CSS class name that will be applied to the `img` element

`alt` {{< badge style="info" title="Optional" >}}  
: An optional alternate text for the image

`title` {{< badge style="info" title="Optional" >}}  
: An optional title for the image

`loading` {{< badge style="info" title="Optional" >}}  
: Sets `loading` control for the image: `lazy`, `eager` or `auto`



