---
title: Development Environment
weight: 10
bookFlatSection: true
bookIcon: rocket
---

# Development Environment

> so you can cast spells against dark arts(ai slop)

We use a Nix development environment in most of our projects. You can install the tools yourself, but then they are permanently on your computer and that is not fun, so this exists to encourage development on Nix and use it as a package manager instead.

Every project of ours has a `flake.nix` listing what that project needs, the compiler, the simulator, the linter, the versions. Nix builds that list into a shell and drops you in it. You get the same everything as whoever wrote the thing you are fixing, and when you walk away it is off your machine again.

Two things to install, once per computer, and then you never think about it again. Nix, which builds the environments, and direnv, which enters them for you so you stop typing `nix develop`. After that, starting on a new project is `git clone` and nothing else. No list of fourteen packages to install first, no wondering why it builds on their laptop and not yours.

## Choose your wand

- [Linux based machines](./linux)
- [MacOS](./darwin)
- [Windows](./dos)

## Then learn the one file

- [Using .envrc](./envrc), how direnv and the dev shell actually work, and what to do when one of them sulks.
