# Image

`image` shortcode adds `<img>` tag on the page. If you need to add a caption, see [`figure` shortcode](../figure).

## Props

- `src`: required.
- `alt`: optional.
- `position`: optional. Value must be one of `left`, `center`, `right`. Default is `left`.
- `style`: optional.

```tpl
{{</* image
src="../hugo-logo-wide.svg"
alt="hugo logo"
position="right"
style="width: 50%;"*/>}}
```

## Example

{{< image
src="../hugo-logo-wide.svg"
alt="hugo logo"
position="right"
style="width: 50%;">}}
