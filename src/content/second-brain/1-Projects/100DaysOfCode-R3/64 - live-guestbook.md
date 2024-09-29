---
title: "64 - live-guestbook"
date: 2023-07-16
slug: 100daysofcode-r3-64-live-guestbook
publish: true
tags:
- sveltekit
- 100DaysOfCode 
- tailwind
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/64 - live-guestbook.md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/3OOYlWenizo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Originally @srakrn's idea, I think it's a fun idea to work on in Sunday night...

![](1-Projects/100DaysOfCode-R3/attachments/64%20-%20live-guestbook.png)

## Technologies

*   SvelteKit
*   Tailwind
*   [lowdb](https://github.com/typicode/lowdb)
*   [Svelte Carousel](https://vadimkorr.github.io/svelte-carousel)

The implementation is simple, just a form to submit data, and another page to load those data and display. [Code](https://github.com/narze/live-guestbook)

See in action! https://live-guestbook.vercel.app

![](1-Projects/100DaysOfCode-R3/attachments/64%20-%20live-guestbook-1.png)

After submitting the posts can be viewed at https://live-guestbook.vercel.app/show

![](1-Projects/100DaysOfCode-R3/attachments/64%20-%20live-guestbook-2.png)

Note: On Vercel I store the data in [Temporary Storage](https://vercel.com/guides/how-can-i-use-files-in-serverless-functions#using-temporary-storage) so the data can be erased at any time.
