# Hints

Callout blocks for notes, warnings, and other contextual messages. Also supports standard GitHub markdown alerts.

## Syntax

```tpl
{{%/* hint [info|success|warning|danger] */%}}
Markdown content
{{%/* /hint */%}}
```

Or using markdown alerts

```markdown
> [!NOTE|TIP|IMPORTANT|WARNING|CAUTION]
> Markdown content
```

## Example

{{% hint %}}
**Default hint**  
Without a specified type.
{{% /hint %}}

{{% hint info %}}
**Info**  
Use for supplementary information that helps the reader.
{{% /hint %}}

{{% hint success %}}
**Success**  
Use to highlight a recommended approach or positive outcome.
{{% /hint %}}

{{% hint warning %}}
**Warning**  
Use for important caveats or potential issues.
{{% /hint %}}

{{% hint danger %}}
**Danger**  
Use for critical warnings about breaking changes or data loss.
{{% /hint %}}

## Markdown Alerts

Standard GitHub markdown alert syntax is also supported:

> [!NOTE]
> The theme requires Hugo **extended** edition for SCSS processing.

> [!TIP]
> Set `disablePathToLower = true` in your config to preserve URL casing.

> [!IMPORTANT]
> The `unsafe = true` goldmark setting is required for Mermaid and KaTeX shortcodes.

> [!WARNING]
> Service worker support is experimental and may change in future releases.

> [!CAUTION]
> Enabling `BookPortableLinks = 'error'` will fail the build if any markdown link targets are missing.
