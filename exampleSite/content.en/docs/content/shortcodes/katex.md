---
title: KaTeX
---

# KaTeX

Render math typesetting with [KaTeX](https://katex.org/).

## Activation

KaTeX styles are included on the page by the first use of the shortcode or a `katex` code block. In order to use delimiters [passthrough](#passthrough) needs to be configured.

## Block Rendering

Three equivalent ways to render display math:

{{% columns %}}

- #### Shortcode
  ```tpl
  {{</* katex displayMode=true >}}
  f(x) = \int_{-\infty}^\infty
  \hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
  {{< /katex */>}}
  ```

- #### Code block
  ````tpl
  ```katex
  f(x) = \int_{-\infty}^\infty
  \hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
  ```
  ````

- #### Dollar delimiters
  ```tpl
  $$
  f(x) = \int_{-\infty}^\infty
  \hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
  $$
  ```

{{% /columns %}}

Result:
```katex
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
```


## Inline Rendering

| Syntax | Output |
| -- | -- |
| `{{</* katex >}}\pi(x){{< /katex */>}}` | {{< katex >}}\pi(x){{< /katex >}} |
| `\\( \pi(x) \\)` | {{< katex >}}\pi(x){{< /katex >}} |

## Parameters

Shortcode and block parameters are the same as original from `transform.ToMath`. See Hugo [documentation](https://gohugo.io/functions/transform/tomath/#options)

## Passthrough 

Hugo offers a hook to render math as passthrough, without codeblocks or shortcodes. See [configuration](https://gohugo.io/functions/transform/tomath/#example) in Hugo documentation.

```yaml {filename=hugo.yaml}
markup:
  goldmark:
    extensions:
      passthrough:
        enable: true
        delimiters:
          block:
          - ['\[', '\]']
          - ['$$', '$$']
          inline:
          - ['\(', '\)']
```

```go {filename="layouts/_markup/render-passthrough.html"}
{{/*- $opts := dict "displayMode" (eq .Type "block") -*/}}
{{/*- (transform.ToMath .Inner $opts) -*/}}
```
