---
weight: 60
bookCollapseSection: true
---

# Shortcodes

Hugo Book includes shortcodes for common documentation patterns. All interactive shortcodes work without JavaScript using CSS-only techniques.

Hugo shortcodes use two delimiter styles:

`{{</* shortcode */>}}`
: Renders inner content as plain HTML. Use for shortcodes that don't contain markdown.

`{{%/* shortcode */%}}`
: Processes inner content as markdown. Use when the shortcode body contains markdown formatting.

> [!NOTE]
> Use `{{%/* shortcode */%}}` when the body contains markdown that needs to be rendered. `{{</* shortcode */>}}` passes content as-is without markdown processing.
> When nesting shortcodes (e.g. tabs inside columns), the outer shortcode must use `{{%/* shortcode */%}}` for the inner shortcodes and markdown to be processed.
