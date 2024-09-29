---
title: "Git - fatal: detected dubious ownership in repository"
date: 2023-07-08
slug: git-fatal-detected-dubious-ownership-in-repository
publish: true
tags:
- git
filepath: src/content/second-brain/Git - fatal error detected dubious ownership in repository.md
---

I got some git errors while building my keyboard firmware

![](attachments/Git%20-%20fatal%20error%20detected%20dubious%20ownership%20in%20repository.png)

Adding `git config --global --add safe.directory /some/path/` works, but it will took some time to add it one by one.

However, you can add wildcard safe directories using `"*"` [1], allowing every directories to be fetched.

```shell
git config --global --add safe.directory "*"
```

[1]: https://stackoverflow.com/a/71943783
