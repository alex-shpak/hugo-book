---
title: KaTeX
---

# KaTeX

Render math typesetting with [KaTeX](https://katex.org/). The library is loaded automatically on first use.

{{< katex />}}

## Activation

KaTeX is activated on the page by the first use of the shortcode or a `katex` code block. You can force activation with `{{</* katex /*/>}}`, then use delimiters anywhere on the page.

## Block Rendering

Three equivalent ways to render display math:

{{% columns %}}

- **Shortcode**
  ```tpl
  {{</* katex display=true >}}
  f(x) = \int_{-\infty}^\infty
  \hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
  {{< /katex */>}}
  ```

- **Code block**
  ````
  ```katex
  f(x) = \int_{-\infty}^\infty
  \hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
  ```
  ````

- **Dollar delimiters**
  ```
  $$
  f(x) = \int_{-\infty}^\infty
  \hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
  $$
  ```

{{% /columns %}}

Result:

$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$

## Inline Rendering

| Syntax | Output |
| -- | -- |
| `{{</* katex >}}\pi(x){{< /katex */>}}` | {{< katex >}}\pi(x){{< /katex >}} |
| `\\( \pi(x) \\)` | \\( \pi(x) \\) |

## Configuration

Override KaTeX options by creating `assets/katex.json`. For example, to enable `$...$` inline delimiters

```json
{
  "delimiters": [
    {"left": "$$", "right": "$$", "display": true},
    {"left": "$", "right": "$", "display": false},
    {"left": "\\(", "right": "\\)", "display": false},
    {"left": "\\[", "right": "\\]", "display": true}
  ]
}
```

See [KaTeX options](https://katex.org/docs/options.html) for all available settings.
