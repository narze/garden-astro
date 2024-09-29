---
title: "Git reset only unstaged changes"
date: 2023-08-28
slug: git-reset-only-unstaged-changes
publish: true
tags:
- til
- git
- commandline
filepath: src/content/second-brain/Git reset only unstaged changes.md
---

Oftentimes I add logging commands when I add more features. This is a simplified example of changes I'll see in Git diff:

```diff
<!-- Svelte -->
 <script lang="ts">
 	export let title: string;
+	export let published: boolean;   // <- I want to keep this change
 	export let description: string;
+
+   // This logging line is not meant to be Git committed
+	$: console.log({ title, published, description });
 </script>
...
```

I can get rid of the line with `console.log` easily by resetting the changes. But by doing so I'll lose the other changes, too. So what I did have to go through more steps:

```shell
git add -p # and choose changes to be staged, excluding logging lines
git commit -m "..." # commit
git reset --hard # remove all changes, thus logging lines are gone
```

This method works, by the way if my work is half done and I don't want to commit yet, I have to restore the latest commit with `git reset HEAD^` and continue the work.

So I do some research and found a way to make this workflow more simple. By using `git checkout -- .` (The "." at the end is mandatory.) This command will revert all the changes excluding the staged code.

The steps will be simpler like so:

```shell
git add -p # add the changes you want to keep
git checkout -- . # remove all unstaged changes
```

Beware if you did not staged anything it will have the same effect as `git reset --hard` !
