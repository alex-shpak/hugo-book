# Hugo Book Theme

[![Hugo](https://img.shields.io/badge/hugo-0.158-blue.svg)](https://gohugo.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Build with Hugo](https://github.com/alex-shpak/hugo-book/workflows/Build%20with%20Hugo/badge.svg)

### [Hugo](https://gohugo.io) documentation theme as simple as plain book

![Screenshot](https://raw.githubusercontent.com/alex-shpak/hugo-book/main/images/screenshot.png)

## Features

- Clean simple design
- Light and Mobile-Friendly
- Multi-language support
- Customisable
- Zero initial configuration
- Handy shortcodes
- Comments support
- Simple blog and taxonomy
- Primary features work without JavaScript
- Dark Mode

## Requirements
- [Hugo](https://gohugo.io/installation/) extended edition, v0.158 or higher

## Quick Start
Use the [starter repository](https://github.com/alex-shpak/hugo-book-starter):

```sh
git clone https://github.com/alex-shpak/hugo-book-starter my-docs
cd my-docs
git submodule update --init --remote
hugo server --minify
```

## Documentation
Example site is self-documenting at [book.alxs.dev](https://book.alxs.dev)

## Versioning
This theme follows a simple incremental versioning by updating minor SemVer version `v0.13.0`, `v0.14.0` and so on. Breaking changes are expected between releases. Note that previously theme used simple `v1`-`v11` versioning, but switch was made for better hugo modules support.

If you want lower maintenance, use one of the released versions. If you want to live on the bleeding edge of changes, you can use the `main` branch and update your website when needed, this also the default branch.

## Contributing
### [Extra credits to contributors](https://github.com/alex-shpak/hugo-book/graphs/contributors)
Contributions are welcome and I will review and consider pull requests.  
Primary goals are:

- Keep it simple.
- Keep minimal (or zero) default configuration.
- Avoid interference with user-defined layouts.
- Avoid using JS if it can be solved by CSS.
