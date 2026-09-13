---
title: Linux
weight: 10
---

# Linux

Nix sits on top of whatever distro you already run. It does not fight your package manager, it does not replace apt or pacman, everything it installs goes into `/nix/store` and nowhere else. If you break something you delete the store and you are back to where you started.

Already on NixOS? You have nix and you have flakes, skip down to [direnv](#direnv).

## Install it

```sh
sh <(curl -L https://nixos.org/nix/install) --daemon
```

That is the official multi user install. It asks for sudo once, sets up the `nix-daemon` service, and makes a handful of build users. Say yes to it.

Close the terminal and open a new one after it finishes, otherwise your shell has no idea nix exists.

```sh
nix --version
```

## Turn on flakes

Flakes are still called experimental but everything we write uses them, so switch them on:

```sh
mkdir -p ~/.config/nix
echo "experimental-features = nix-command flakes" >> ~/.config/nix/nix.conf
```

If you would rather do it for every user on the machine, the same line goes in `/etc/nix/nix.conf` and then `sudo systemctl restart nix-daemon`.

Quick smoke test, this pulls a program, runs it, and never installs it:

```sh
nix run nixpkgs#hello
```

## direnv

This is the part that makes the whole thing pleasant. You walk into a project folder and its tools are there, you walk out and they are not. Install it with the nix you just set up:

```sh
nix profile install nixpkgs#direnv
```

Now hook it into your shell, which is the step people skip and then wonder why nothing happens. The binary does nothing on its own, it needs a line in your shell rc. Pick your shell:

```sh
# zsh
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc

# bash
echo 'eval "$(direnv hook bash)"' >> ~/.bashrc

# fish
echo 'direnv hook fish | source' >> ~/.config/fish/config.fish
```

Open a new terminal so the hook is actually loaded.

## Try it on a real project

```sh
git clone https://github.com/cdi-sjsu/grimoire
cd grimoire
```

direnv will refuse to load the `.envrc` and tell you it is blocked. That is on purpose, it makes you look at the file before it runs it:

```sh
direnv allow
```

First load takes a minute while it pulls hugo. After that it is instant, and every new terminal you open in that folder is already set up.

```sh
hugo version
hugo server
```

Open http://localhost:1313/grimoire/ and it live reloads as you save. That hugo only exists inside this folder, `cd ..` and it is gone again.

Next is [Using .envrc](./envrc), which is the part you will actually use day to day.

## Uninstalling

`sudo rm -rf /nix`, then remove the `nix-daemon` service and the lines the installer added to your shell rc files. It also made the build users, `nixbld1` through `nixbld32`, and a `nixbld` group, so clean those out too if you are being thorough.
