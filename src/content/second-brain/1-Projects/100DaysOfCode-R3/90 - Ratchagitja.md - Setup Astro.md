---
title: "90 - Ratchagitja.md - Setup Astro"
date: 2023-08-20
slug: 100daysofcode-r3-90-ratchagitja-md-setup-astro
publish: true
tags:
- 100DaysOfCode
- ratchagitja
- astro
no_feed: true
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/90 - Ratchagitja.md - Setup Astro.md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/3XK3ZSZM7bI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Problem

5k+ markdown files caused Astro dev server to be very slow and also throws error on an unknown reason.

      File:
        /Users/narze/Code/github.com/narze/ratchagitja.md/entries/ก/139/61/17224572.md?astroContentCollectionEntry=true
      Stacktrace:
    UnknownContentCollectionError
        at getEntryModuleBaseInfo (file:///Users/narze/Code/github.com/narze/ratchagitja.md/web/node_modules/.pnpm/astro@2.10.12/node_modules/astro/dist/content/vite-plugin-content-imports.js:226:11)
        at async getContentEntryModule (file:///Users/narze/Code/github.com/narze/ratchagitja.md/web/node_modules/.pnpm/astro@2.10.12/node_modules/astro/dist/content/vite-plugin-content-imports.js:139:77)
        at async TransformContext.transform (file:///Users/narze/Code/github.com/narze/ratchagitja.md/web/node_modules/.pnpm/astro@2.10.12/node_modules/astro/dist/content/vite-plugin-content-imports.js:73:67)
        at async Object.transform (file:///Users/narze/Code/github.com/narze/ratchagitja.md/web/node_modules/.pnpm/vite@4.4.9/node_modules/vite/dist/node/chunks/dep-df561101.js:44283:30)
        at async loadAndTransform (file:///Users/narze/Code/github.com/narze/ratchagitja.md/web/node_modules/.pnpm/vite@4.4.9/node_modules/vite/dist/node/chunks/dep-df561101.js:54950:29)
        at async instantiateModule (file:///Users/narze/Code/github.com/narze/ratchagitja.md/web/node_modules/.pnpm/vite@4.4.9/node_modules/vite/dist/node/chunks/dep-df561101.js:55875:10)

(Found the cause, I cannot use symlinks within `src/content` folder)

It took 5 minutes to build on Vercel

![](1-Projects/100DaysOfCode-R3/attachments/90%20-%20Ratchagitja.md%20-%20Setup%20Astro.png)

https://ratchagitja.vercel.app/entries
