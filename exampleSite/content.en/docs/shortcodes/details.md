# Details

Details shortcode is a helper for `details` html5 element. To collapse the details either omit the `open`
keyword or set `open=false`.

## Example 1
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

## Example 2
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
