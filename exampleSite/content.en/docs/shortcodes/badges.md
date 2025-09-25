# Badges

> [!WARNING]
> Experimental, could change in the future or be removed

Badges can be used to annotate your pages with additional information or mark specific places in markdown content.

{{< badge title="Title" value="Value" >}}
{{< badge style="info" title="Hugo" value="0.147.6" >}}
{{< badge style="success" title="Build" value="Passing" >}}
{{< badge style="warning" title="Coverage" value="25%" >}}
{{< badge style="danger" title="Issues" value="120" >}}

## Examples

| Shortcode | Output |
| --        | --     |
| `{{</* badge style="info" title="hugo" value="0.147.6" */>}}`     | {{< badge style="info" title="Hugo" value="0.147.6" >}}     |
| `{{</* badge style="success" title="Build" value="Passing" */>}}` | {{< badge style="success" title="Build" value="Passing" >}} |
| `{{</* badge style="warning" title="Coverage" value="25%" */>}}`  | {{< badge style="warning" title="Coverage" value="25%" >}}  |
| `{{</* badge style="danger" title="Issues" value="120" */>}}`     | {{< badge style="danger" title="Issues" value="120" >}}     |
| | |
| `{{</* badge style="info" title="Title" */>}}`                    | {{< badge style="info" title="Title" >}}                    |
| `{{</* badge style="info" value="Value" */>}}`                    | {{< badge style="info" value="Value" >}}                    |
| `{{</* badge title="Default" */>}}`                               | {{< badge value="Default" >}}                               |

## Use in links 

A badge can be wrapped in markdown link producing following result: [{{< badge title="Hugo" value="0.147.6" >}}](https://github.com/gohugoio/hugo/releases/tag/v0.147.6)
```tpl
[{{</* badge title="Hugo" value="0.147.6" */>}}](https://github.com/gohugoio/hugo/releases/tag/v0.147.6)
```
