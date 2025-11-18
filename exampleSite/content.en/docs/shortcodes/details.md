# Details

Details shortcode is a helper for `details` html5 element. To collapse the details either omit the `open`
keyword when using positional arguments or set `open=false` when using parameters.

## Example with positional arguments
```tpl
{{%/* details "Title" [open] */%}}
## Markdown content
Lorem markdownum insigne...
{{%/* /details */%}}
```

{{% details "Title" open %}}
## Markdown content
Lorem markdownum insigne...
{{% /details %}}

## Example with parameters
```tpl
{{%/* details title="Title" open=true */%}}
## Markdown content
Lorem markdownum insigne...
{{%/* /details */%}}
```

{{% details title="Title" open=true %}}
## Markdown content
Lorem markdownum insigne...
{{% /details %}}
