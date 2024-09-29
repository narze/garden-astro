---
title: "81 - garden-astro - Update front page"
date: 2023-08-09
slug: 100daysofcode-r3-81-garden-astro-update-front-page
publish: true
tags:
- 100DaysOfCode
- garden-astro
- astro
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/81 - garden-astro - Update front page.md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/-_Mz6CHRyIw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

* Change front page design
* Exclude post from RSS feed with `no_feed: true`
* Test Svelte syntax highlighting works

```svelte
<script lang="ts">
    export let count: number = 0

    function increment() { number += 1 }
</script>

<button on:click={increment}>Increment</button>
<button on:click={() => number = 0}>Reset</button>
```

Yes it works (Not on Obsidian though) ![](1-Projects/100DaysOfCode-R3/attachments/81%20-%20garden-astro%20-%20Update%20front%20page.png)

* Add [pagination](https://docs.astro.build/en/core-concepts/routing/#pagination)
