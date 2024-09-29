---
title: "61 - garden-astro"
date: 2023-07-12
slug: 100daysofcode-r3-61-garden-astro
publish: true
tags:
- 100DaysOfCode
- obsidian
- garden-astro
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/61 - garden-astro.md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/4Sh_cmY2usE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Add link to obsidian from the site, using Advanced URI plugin

Obsidian has support for [URI scheme `obsidian://`](https://help.obsidian.md/Advanced+topics/Using+Obsidian+URI) but it needs absolute path to the file and I've tested that it does not work with symbolic links.

But luckily there is a plugin called [Advanced URI](https://github.com/Vinzent03/obsidian-advanced-uri) that support using rel[ative vault path](https://vinzent03.github.io/obsidian-advanced-uri/actions/navigation) so I can use obsidian://advanced-uri?filepath=1-Projects/100DaysOfCode-R3/61 - garden-astro to open this file in my Obsidian app.

I already implemented filepath in [53 - garden-astro - Add link resolver](/100daysofcode-r3-53-garden-astro-add-link-resolver). I will build the link at the page's footer. The code is very simple once you already have the relative file path.

```tsx
<a
    href={`obsidian://advanced-uri?filepath=${encodeURIComponent(
      filepath
    )}`}
>
    Edit in Obsidian
</a>
```

I plan to hide this link later since it won't work with other people, maybe I'll add authentication.
