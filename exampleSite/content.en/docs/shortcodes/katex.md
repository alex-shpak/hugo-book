---
title: KaTeX
---

# KaTeX

KaTeX shortcode let you render math typesetting in markdown document. See [KaTeX](https://katex.org/)

{{% hint info %}}
**Override KaTeX initialization config**  
To override the [initialization config](https://katex.org/docs/options.html) for KaTeX,
create a `katex.json` file in your `assets` folder!
{{% /hint %}}

# Example
{{< katex />}}


## Activation
KaTeX is activated on the page by first use of the shortcode or render block. you can force activation with empty `{{</* katex /*/>}}` and use delimiters defined in configuration in `assets/katex.json`.

## Rendering as block

{{% columns %}}

```latex
{{</* katex display=true >}}
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
{{< /katex */>}}
```

````latex
```katex
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
```
````

````latex
$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$
````

<--->

{{< katex display=true >}}
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
{{< /katex >}}

---

```katex
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
```

---

$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$

{{% /columns %}}

## Rendering inline 
When KaTeX is active on the page it is possible to write inline expressions.  

| Code | Output |
| --   | --     |
| `{{</* katex >}}\pi(x){{< /katex */>}}` | {{< katex >}}\pi(x){{< /katex >}} |
| `\\( \pi(x) \\)` | \\( \pi(x) \\) |

## Configuration
KaTeX configuration could be adjusted by editing `assets/katex.json` file. For example to enabled inline delimiters `$..$` put content below into the file.

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

