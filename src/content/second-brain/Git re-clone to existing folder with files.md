---
publish: true
date: 2025-09-15
slug: git-re-clone-to-existing-folder-with-files
title: Git re-clone to existing folder with files
filepath: src/content/second-brain/Git re-clone to existing folder with files.md
---

My Obsidian vault on another machine does not have `.git` so I have to re-clone only the `.git` folder. Use `--no-checkout` to clone only `.git` to a temporary path, then move it out.

```shell
git clone --no-checkout https://github.com/narze/second-brain temp_git
mv temp_git/.git .
rmdir temp_git
```

If some files are still missing, like `.gitignore` you can restore them with `git checkout HEAD`

```shell
git checkout HEAD -- .gitignore
git reset
```
