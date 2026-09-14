---
title: Windows
weight: 30
---

# Windows

Nix does not run on Windows. It runs on Linux, and Windows can run Linux, so what you are really setting up is WSL2 first and nix second. Takes about fifteen minutes, most of which is a reboot.

You need Windows 11, or Windows 10 22H2 and up. Anything older and you are better off dual booting.

Only the first two steps happen in PowerShell. Everything after that is inside the Ubuntu window, and from there you are just doing what the Linux page says.

## 1. Install WSL

Open **Terminal** or **PowerShell as administrator** (right click, run as administrator) and run:

```powershell
wsl --install
```

That pulls WSL2 and Ubuntu. Reboot when it tells you to. On the way back up an Ubuntu window opens and asks for a username and password, that password is your sudo password inside Linux, it has nothing to do with your Windows login.

Already had WSL from some class two years ago? Make sure it is current and actually version 2:

```powershell
wsl --update
wsl -l -v
```

If the `VERSION` column says 1, fix it:

```powershell
wsl --set-version Ubuntu 2
```

## 2. Turn on systemd

This is the step everybody misses. Nix installs a background service called `nix-daemon`, and services need systemd. WSL did not run systemd for years, now it does, but it is off unless you ask.

Inside your **Ubuntu** window:

```sh
sudo nano /etc/wsl.conf
```

Put this in the file (add it if there is already other stuff in there, do not delete their stuff):

```ini
[boot]
systemd=true
```

`Ctrl+O`, `Enter`, `Ctrl+X` to save and get out of nano.

Now shut the whole thing down from **PowerShell**, not from inside Ubuntu:

```powershell
wsl --shutdown
```

Give it about ten seconds, then open Ubuntu again and check that PID 1 is systemd:

```sh
ps -p 1 -o comm=
```

It should print `systemd`. If it prints `init` or `sh`, the config did not take, check for a typo in `/etc/wsl.conf` and shut it down again.

## 3. Install nix

Same as any Linux box, from inside Ubuntu:

```sh
sh <(curl -L https://nixos.org/nix/install) --daemon
```

Close the Ubuntu window, open a new one, and check:

```sh
nix --version
systemctl status nix-daemon    # should say running
```

## 4. Turn on flakes

```sh
mkdir -p ~/.config/nix
echo "experimental-features = nix-command flakes" >> ~/.config/nix/nix.conf
nix run nixpkgs#hello
```

If `hello` prints back at you, you are done, you have a working nix.

## 5. direnv

This is the part that makes the whole thing pleasant. You walk into a project folder and its tools are there, you walk out and they are not. Still inside Ubuntu:

```sh
nix profile install nixpkgs#direnv
echo 'eval "$(direnv hook bash)"' >> ~/.bashrc
```

Ubuntu hands you bash. If you went and installed zsh, it is `~/.zshrc` and `direnv hook zsh` instead. Do not skip the hook, the binary does nothing without it, and this is where people get stuck.

Close the Ubuntu window, open a new one.

## 6. Try it on a real project

> [!WARNING]
> **Keep your code in the Linux home folder.** Clone into `~/` inside Ubuntu, never into `/mnt/c/Users/you/...`. Files on the Windows side are slow through the translation layer and file watchers do not get told when they change, so live reload silently stops working and you will think the project is broken. Nix builds crawl there for the same reason.

```sh
cd ~
git clone https://github.com/cdi-sjsu/grimoire
cd grimoire
```

direnv will refuse to load the `.envrc` and tell you it is blocked. That is on purpose, it makes you look at the file before it runs it:

```sh
direnv allow
hugo server
```

First load takes a minute while it pulls hugo, after that it is instant. Open http://localhost:1313/grimoire/ in your normal Windows browser, WSL forwards localhost for you. That hugo only exists inside this folder, `cd ..` and it is gone again.

Next is [Using .envrc](./envrc), which is the part you will actually use day to day.

## VS Code (optional)

Skip this if you already have an editor you like inside the terminal. If you want VS Code, the trick is that it runs in two halves: the window on Windows, everything else (your files, git, language servers, the tools direnv loaded) inside Ubuntu. Set up that way it behaves like a normal Linux editor.

Install it **on the Windows side**, not inside Ubuntu. Grab the [Windows installer](https://code.visualstudio.com/download), and when it asks about **Select Additional Tasks**, leave **Add to PATH** checked, that is what makes `code` work from the Ubuntu shell.

Then install the [WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl). That is the only one you need on Windows to start.

Ubuntu ships without two things the VS Code server wants, so from **Ubuntu**:

```sh
sudo apt update
sudo apt install wget ca-certificates
```

### Opening a project

From the Ubuntu shell, inside the project:

```sh
code .
```

The first run downloads a small server into your Linux home, after that it is quick. The bottom left corner of the window should read **WSL: Ubuntu**. If it does not, you opened the Windows copy of the folder and none of this applies.

> [!IMPORTANT]
> **Start it from the shell, in the project folder.** VS Code's server does not run your `.bashrc`, so the direnv hook never fires on its own. Launching with `code .` from a shell direnv has already loaded hands the whole environment over, which is why the editor can find `hugo` and friends. Open the folder from the Windows side and it cannot.

If you would rather not go back to the terminal every time, `Ctrl+Shift+P` and type `WSL` gives you **Reopen Folder in WSL** and the rest of the options.

### Extensions

The extensions tab splits into two lists, **Local** and **WSL: Ubuntu**. Themes and keybindings stay local and you install them once. Anything that touches your code, language servers, formatters, debuggers, has to live on the Ubuntu side. VS Code flags those with a ⚠ and an **Install in WSL: Ubuntu** button, click it.

The built in terminal is already your Ubuntu shell, with direnv working normally, so `hugo server` from in there does the right thing.

### When `code` is not found

Usually **Add to PATH** was unchecked during install. Reinstall VS Code with it checked, or add it yourself in Ubuntu:

```sh
echo 'export PATH="$PATH:/mnt/c/Program Files/Microsoft VS Code/bin"' >> ~/.bashrc
```

Then open a new Ubuntu window. Microsoft keeps a longer [troubleshooting list](https://code.visualstudio.com/docs/remote/troubleshooting) for the stranger cases.

## If systemd refuses to cooperate

There is a single user install that skips the daemon entirely:

```sh
sh <(curl -L https://nixos.org/nix/install) --no-daemon
```

Everything in these docs still works, builds just run as you instead of as the daemon. Try the systemd route first though, it is the setup the rest of the club is on.
