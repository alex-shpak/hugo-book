# Steps

Render an ordered list as a series of numbered steps with visual connectors.

## Syntax

```tpl
{{%/* steps */%}}
1. ## Step Title
   Step description...

2. ## Step Title
   Step description...
{{%/* /steps */%}}
```

## Example

{{% steps %}}
1. ## Create your site
   Run `hugo new site my-docs` to scaffold a new Hugo project.

2. ## Add the theme
   Clone or add hugo-book as a submodule in your `themes/` directory.

3. ## Write content
   Add markdown files under `content/docs/`. Each file becomes a page in the sidebar menu.

4. ## Deploy
   Run `hugo` to build the site. The output is in the `public/` directory, ready for any static hosting.
{{% /steps %}}
