---
title: "Fallback fonts in VSCode"
date: 2023-07-06
slug: fallback-fonts-in-vscode
publish: true
tags:
- vscode
- today-i-learned
filepath: src/content/second-brain/Fallback fonts in VSCode.md
---

I ran my [dotfiles](https://github.com/narze/dotfiles) update today and found that my VSCode font looked weird, I'm using [Nerdfont-patched Fantasque Sans Mono](https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/FantasqueSansMono) but it's name changed from `FantasqueSansMono Nerd Font Mono` to `FantasqueSansM Nerd Font Mono` so after updating the font is missing from VSCode. Actually, you can use css-like trick in this field by adding fallback fonts [1]

```text
'FantasqueSansMono Nerd Font Mono', 'FantasqueSansM Nerd Font Mono'
```

Now I can have either one of the fonts I prefer. It will look like this in json setting

![](attachments/code%203.png)

[1]: https://stackoverflow.com/questions/47948040/how-to-change-fonts-in-vscode
