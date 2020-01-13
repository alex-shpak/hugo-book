# KaTeX

KaTeX shortcode let you render math typesetting in markdown document. See [KaTeX](https://katex.org/)

## Example
{{< columns >}}

```latex
{{</* katex [display] [class="text-center"]  */>}}
x = \begin{cases}
   a &\text{if } b \\
   c &\text{if } d
\end{cases}
{{</* /katex */>}}
```

<--->

{{< katex >}}
x = \begin{cases}
   a &\text{if } b \\
   c &\text{if } d
\end{cases}
{{< /katex >}}

{{< /columns >}}

## Display Mode Example

Here is some inline example: {{< katex >}}\pi(x){{< /katex >}}, rendered in the same line. And below is `display` example, having `display: block`
{{< katex display >}}
x = \begin{cases}
   a &\text{if } b \\
   c &\text{if } d
\end{cases}
{{< /katex >}}
Text continues here.
