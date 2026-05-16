# Tabs

Organize content by context, for example installation instructions for each supported platform.

## Syntax

```tpl
{{</* tabs */>}}
{{%/* tab "First" */%}} Markdown content {{%/* /tab */%}}
{{%/* tab "Second" */%}} Markdown content {{%/* /tab */%}}
{{</* /tabs */>}}
```

## Example

{{< tabs >}}

{{% tab "macOS" %}}
```shell
brew install hugo
```
{{% /tab %}}

{{% tab "Linux" %}}
```shell
sudo snap install hugo
```
{{% /tab %}}

{{% tab "Windows" %}}
```shell
choco install hugo-extended
```
{{% /tab %}}

{{< /tabs >}}
