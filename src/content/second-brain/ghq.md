---
title: "ghq - Remote repo management tool"
date: 2023-07-26
slug: ghq-remote-repo-management-tool
publish: true
tags:
- command-line 
- git
filepath: src/content/second-brain/ghq.md
---

In all of my 3 Macs, I store all of my code within `~/Code` to make it persistent and easy to use across the machines. I use [`ghq`](https://github.com/x-motemen/ghq) to manage the inner structure.

To use `ghq`, simply run it anywhere in the terminal with your desired Github repository `user/repo` or full URL:

```shell
$ ghq get narze/garden-astro
# or
$ ghq get https://github.com/narze/garden-astro
```

If the code is not on the machine yet. The command will clone [narze/garden-astro](https://github.com/narze/garden-astro) to `~/Code/github.com/narze/garden-astro`. (Default root path is `~/ghq` but you can override `ghq.root` in your [gitconfig](https://github.com/narze/dotfiles/blob/987afd479b39fdcfb7f770e60b6c457538c96ec1/chezmoi/dot_gitconfig.tmpl#L14).)

I make a command line alias and add `-l` parameter (`look`) to change the path after cloning, and `-p` to clone with SSH url for using with private Github repositories.

```shell
alias gq='ghq get -l -p'
```

I can just type `gq narze/garden-astro` in a new terminal session and start coding right away.
