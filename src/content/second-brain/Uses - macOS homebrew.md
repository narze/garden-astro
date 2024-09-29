---
title: "Uses - macOS homebrew"
date: 2023-08-06
updated: "2023-08-06"
slug: uses-macos-homebrew
publish: true
tags:
- commandline
- macos
- uses
filepath: src/content/second-brain/Uses - macOS homebrew.md
---

A collection of [homebrew](https://brew.sh) packages I use on my macOS machines. Most of them can be found on my [dotfiles](https://github.com/narze/dotfiles/blob/master/chezmoi/.chezmoiscripts/run_once_after_darwin_10-install-packages.sh.tmpl). To keep it brief, I won't add the well known ones here.

* [asdf](https://asdf-vm.com)

  A package manager for almost everything version manageable, I use this to manage [my Ruby, NodeJS, Rust, Direnv, etc. versions](https://github.com/narze/dotfiles/blob/master/chezmoi/.chezmoiscripts/run_once_after_darwin_31-install-asdf-plugins-macos.sh.tmpl).

* [yabai](https://github.com/koekeishiya/yabai)

  Tiling window manager for macOS, usually paired with skhd to manage shortcut keys that I mostly used up all my Option key (⌥) shortcuts.

  [My yabairc](https://github.com/narze/dotfiles/blob/master/chezmoi/executable_dot_yabairc), [my skhdrc](https://github.com/narze/dotfiles/blob/master/chezmoi/executable_dot_skhdrc).

* [ghq](https://github.com/x-motemen/ghq)

  [Manage remote Git repositories within a directory](/ghq-remote-repo-management-tool)

* [colima](https://github.com/abiosoft/colima)

  Say goodbye to Docker Desktop and use this container runtime instead

* [direnv](https://direnv.net)

  Auto load and unload environment variables exported in any directories with `.envrc` file

* [zoxide](https://github.com/ajeetdsouza/zoxide)

  Jump around directories with `z`

* [chezmoi](https://www.chezmoi.io)

  A Dotfiles manager

* [amitv87-pip](https://github.com/amitv87/PiP) (cask)

  Display any Mac apps, screens, AirPlay compatible devices (e.g. iPad, iPhone) in an always on top window similar to Picture In Picture video mode.
