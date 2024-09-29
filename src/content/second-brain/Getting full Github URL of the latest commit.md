---
title: "Getting full Github URL of the latest commit"
created: 2023-01-12 15:46
date: 2023-01-13
slug: getting-full-github-url-of-the-latest-commit
publish: true
tags:
- github
- command-line
filepath: src/content/second-brain/Getting full Github URL of the latest commit.md
---

I want to share my latest commit's url, previously I would go to Github repo, click the latest commit message, then copy the url.

```shell
gh repo view -w # Opens current repo in the browser
```

It turns out that building the URL is much simpler

```shell
gh browse -c -n | pbcopy # Returns current url of the last commit tree, then pipe to macOS clipboard
# e.g. https://github.com/narze/advent-of-code-2022/tree/8de068f8645dbe1ba01f882f3e5326322ba07322
```

By the way I want to see the commit diff not the file tree, naive approach

```shell
gh browse -c -n | sed "s/\/tree\//\/commit\//" # Replaces /tree/ with /commit/
```

Neat! But it will cause bad URL if you ever have a repo called `tree` ...

So that I asked ChatGPT but...

![](attachments/Pasted%20image%2020230112155322.png)

I fallback to good ol' StackOverflow and found [the ultimate solution](https://stackoverflow.com/a/70837590)

```shell
echo "$(gh repo view --json url --jq .url)/commit/$(git rev-parse HEAD)"
```
