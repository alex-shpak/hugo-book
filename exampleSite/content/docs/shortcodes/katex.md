# KaTeX

KaTeX shortcode let you render math typesetting in markdown document. See [KaTeX](https://katex.org/)

## Example 
{{< columns >}}

```latex
{{</* katex [class="text-center"] */>}}
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

