# Badges

Inline labels for annotating content with status, versions, or metadata.

## Syntax

```tpl
{{</* badge style="info" title="Hugo" value="0.158" */>}}
```

## Styles

| Shortcode | Output |
| -- | -- |
| `{{</* badge style="info" title="Hugo" value="0.158" */>}}` | {{< badge style="info" title="Hugo" value="0.158" >}} |
| `{{</* badge style="success" title="Build" value="Passing" */>}}` | {{< badge style="success" title="Build" value="Passing" >}} |
| `{{</* badge style="warning" title="Coverage" value="25%" */>}}` | {{< badge style="warning" title="Coverage" value="25%" >}} |
| `{{</* badge style="danger" title="Issues" value="120" */>}}` | {{< badge style="danger" title="Issues" value="120" >}} |
| | |
| `{{</* badge style="info" title="Title" */>}}` | {{< badge style="info" title="Title" >}} |
| `{{</* badge style="info" value="Value" */>}}` | {{< badge style="info" value="Value" >}} |
| `{{</* badge value="Default" */>}}` | {{< badge value="Default" >}} |

## Use in Links

Wrap a badge in a markdown link

```tpl
[{{</* badge title="Hugo" value="0.158" */>}}](https://github.com/gohugoio/hugo/releases/tag/v0.158.0)
```

[{{< badge title="Hugo" value="0.158" >}}](https://github.com/gohugoio/hugo/releases/tag/v0.158.0)

## Parameters

`style`
: Visual style. One of: `default`, `info`, `success`, `warning`, `danger`, `note`, `tip`, `important`, `caution`.

`title`
: Label text (left side).

`value`
: Value text (right side).
