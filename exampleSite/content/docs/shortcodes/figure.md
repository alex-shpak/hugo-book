# Figure

`figure` shortcode adds `<figure>` tag (an `<img>` and a `<caption>`) on the page. If you don't need a caption, see [`image` shortcode](../image).

## Props

- `src`: required.
- `alt`: optional.
- `position`: optional. Value must be one of `left`, `center`, `right`. Default is `left`.
- `style`: optional.
- `caption`: optional.
- `captionPosition`: Value must be one of `left`, `center`, `right`. Default is `center`.
- `captionStyle`: optional.

```tpl
{{</* figure
src="../hugo-logo-wide.svg"
alt="hugo logo"
position="right"
style="width: 500px;"
caption="hugo logo"
captionPosition="left"
captionStyle="color: red;" */>}}
```

## Example

{{< figure
src="../hugo-logo-wide.svg"
alt="hugo logo"
position="right"
style="width: 500px;"
caption="hugo logo"
captionPosition="left"
captionStyle="color: red;" >}}
