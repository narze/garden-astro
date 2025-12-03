---
title: Git stash only staged changes
date: 2025-12-03
slug: git-stash-only-staged-changes
publish: true
tags:
  - git
draft: true
no_feed: false
unlisted: false
filepath: src/content/second-brain/Git stash only staged changes.md
---

Given that you have 2 changes but want to stash only one e.g.

```
will-stash-this-file.txt
this-i-will-keep.txt
```

Add changes you want to stash

```shell
git add will-stash-this-file.txt
```

Then use `-S` option to stash only staged file

```shell
git stash -S # or git stash save -S
```

Verify that the unstaged file remains

```shell
git status -s
M this-i-will-keep
```
