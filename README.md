# Hugo Book Theme
### Documentation theme as simple as plain book

Description, motivation

![Screenshot](images/screenshot.png)

## Features
* Clean simple design
* Mobile friendly
* Customizable menu
* Renders single site section (`docs` by default)

## Installation
```
git clone ...
```

## Configuration
### Menu
There are two options to render menu:
1. Use file tree as menu (Option by default).  
   You can set `title` and `weight` in front matter to adjust menu.

2. Use leaf bundle and content of it's `index.md` as 
menu.  
   You can enable it by pointing to leaf bundle with `BookMenuBundle` parameter on Site level.

   ```md
   - [**Introduction**](/docs/introduction/)
   - [Motivation](/docs/motivation/)
   - [Configuration](/docs/configuration/)
      - [Server](/docs/configuration/server/)
      - [Client](/docs/configuration/client/)
   <br />
   - [Addtional Information](docs/configuration/additional-information/)
   - [*Links*](/docs/links/)
   ```

   Also see [Example](exampleSite/content/menu) and [Site configuration](#site-configuration)


### Site configuration
There is few configuration options you can add to your `config.yml|json|toml` file
```yaml
# (Optional) Set this to true if you use captial letters in file names
disablePathToLower: true

params:
  # (Optional, default true) Show or hide table of contents globally
  # You can also specify this parameter per page in front matter
  BookShowToC: true

  # (Optional, default none) Set leaf bundle to render side menu
  # When not specified file structure and weights will be used
  # See https://gohugo.io/content-management/page-bundles/
  BookMenuBundle: /docs/menu

  # (Optional, default docs) Specify section of content to render as menu
  # You can also set value to "*" to render all sections to menu
  BookSection: docs
```


### Per document configuration
You can specify additional params per document in front matter
```yaml
---
# Set type to 'docs' if you want to render page outside of configured section
type: docs

# Set page weight to re-arrange items in file-tree menu (if BookMenuBundle not set)
weight: 10

# Set to mark page as top level section in file-tree menu (if BookMenuBundle not set)
bookTopSection: true

# Set to hide table of contents, default true
bookShowToC: false
---
```


## License
[MIT](LICENSE)