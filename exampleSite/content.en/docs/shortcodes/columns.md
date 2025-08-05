# Columns

Columns help organize shorter pieces of content horizontally for readability. `columns` shortcode styles markdown list as up to 3 columns.

## Example

```tpl
{{%/* columns [ratio="1:1"] [class="..."] */%}}
- ### Left Content
  Lorem markdownum insigne...

- ### Mid Content
  Lorem markdownum insigne...

- ### Right Content
  Lorem markdownum insigne...
{{%/* /columns */%}}
```

{{% columns %}}
- ### Left Content
  Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
  stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
  protulit, sed sed aere valvis inhaesuro Pallas animam: qui _quid_, ignes.
  Miseratus fonte Ditis conubia.

- ### Mid Content
  Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
  stringit, frustra Saturnius uteroque inter!

- ### Right Content
  Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
  stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
  protulit, sed sed aere valvis inhaesuro Pallas animam: qui _quid_, ignes.
  Miseratus fonte Ditis conubia.
{{% /columns %}}

## Settings size ratio for columns

```tpl
{{%/* columns ratio="1:2" */%}}
- ## x1 Column
  Lorem markdownum insigne...

- ## x2 Column
  Lorem markdownum insigne...
{{%/* /columns */%}}
```

{{% columns ratio="1:2" %}}
- ### x1 Column
  Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
  stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
  protulit, sed sed aere valvis inhaesuro Pallas animam: qui _quid_, ignes.
  Miseratus fonte Ditis conubia.

- ### x2 Column
  Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
  stringit, frustra Saturnius uteroque inter!
  
  Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
  stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
  protulit, sed sed aere valvis inhaesuro Pallas animam: qui _quid_, ignes.
  Miseratus fonte Ditis conubia.
{{% /columns %}}
