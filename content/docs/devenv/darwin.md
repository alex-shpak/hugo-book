---
title: MacOS
weight: 20
---

# MacOS

Same nix, same commands as Linux. The only difference is that macOS will not let anything write to `/`, so the installer makes a separate APFS volume for `/nix` and mounts it there. That is normal, do not delete it.

Intel and Apple Silicon both work.

## Install it

```sh
sh <(curl -L https://nixos.org/nix/install) --daemon
```

It will ask for your password and tell you it is creating a volume. Let it. Then open a new terminal tab:

```sh
nix --version
```

> [!NOTE]
> The [Determinate Systems installer](https://install.determinate.systems/) is honestly the nicer option on mac. It handles the volume, turns on flakes, and survives macOS upgrades better.

## Turn on flakes

The Determinate installer already did this, skip it if you went that way.

```sh
mkdir -p ~/.config/nix
echo "experimental-features = nix-command flakes" >> ~/.config/nix/nix.conf
```

Smoke test:

```sh
nix run nixpkgs#hello
```

## direnv

This is the part that makes the whole thing pleasant. You walk into a project folder and its tools are there, you walk out and they are not. Install it with nix rather than brew, so you are on the same version as the rest of us:

```sh
nix profile install nixpkgs#direnv
```

Now hook it into your shell, which is the step people skip and then wonder why nothing happens. macOS gives you zsh unless you changed it:

```sh
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc
```

If you did change it:

```sh
# bash
echo 'eval "$(direnv hook bash)"' >> ~/.bash_profile

# fish
echo 'direnv hook fish | source' >> ~/.config/fish/config.fish
```

Open a new tab so the hook is actually loaded.

## Try it on a real project

```sh
git clone https://github.com/cdi-sjsu/grimoire
cd grimoire
```

direnv will refuse to load the `.envrc` and tell you it is blocked. That is on purpose, it makes you look at the file before it runs it:

```sh
direnv allow
```

First load takes a minute while it pulls hugo. After that it is instant, and every new tab you open in that folder is already set up.

```sh
hugo version
hugo server
```

Open http://localhost:1313/grimoire/ and it live reloads as you save. That hugo only exists inside this folder, `cd ..` and it is gone again.

Next is [Using .envrc](./envrc), which is the part you will actually use day to day.

## When macOS updates break it

A big macOS upgrade sometimes eats the `/nix` mount or the shell hooks and suddenly `nix: command not found`. Nothing is actually lost, it just needs remounting:

```sh
sudo /nix/nix-installer repair    # Determinate installer
```

With the official installer you re run the installer, it picks the existing store back up.
