---
title: 45 - Garden Astro - Dev mode
publish: true
date: 2023-06-22
slug: 100daysofcode-r3-45-garden-astro-cont
tags:
- Astro
- Digital-Garden
- 100DaysOfCode
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/45 - garden-astro (cont.).md
---

# Garden Astro - Dev mode

Create a development script (Run with `npx tsx watch dev.ts`) to support editing notes locally on Obsidian and preview on the browser without pulling notes from Github (narze/garden), while it won't affect existing notes and git history

*   Use `chokidar` to watch my Obsidian vault
    *   \[x] Check if saving file on Obsidian trigger the event
    *   \[x] When saved, copy the file to narze/garden/src/content/second-brain/local
    *   Clear /local path on exit, and gitignore it
    *   Handle file conflict (Use second-brain/local path so that it won't conflicted with existing files)
    *   Editing file in obsidian will reflect to vscode instantly, and also on the local website 👍
*   Problems found
    *   Cannot edit local markdown files in vscode, the files will be replaced by Obsidian
    *   Links & images would break

Also created `import-brain-local.ts` to import notes locally from Obsidian, now this note will be published on https://garden-astro.vercel.app/100daysofcode-r3-45-garden-astro-cont
