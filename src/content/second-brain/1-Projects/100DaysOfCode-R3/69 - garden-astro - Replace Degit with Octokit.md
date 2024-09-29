---
title: "69 - garden-astro - Replace Degit with Octokit"
date: 2023-07-22
slug: 100daysofcode-r3-69-garden-astro-replace-degit-with-octokit
publish: true
tags:
- garden-astro
- 100DaysOfCode
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/69 - garden-astro - Replace Degit with Octokit.md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/tq6vnled3KQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Changes

* Switch from [degit](https://github.com/Rich-Harris/degit) to [Octokit.js](https://github.com/octokit/octokit.js)

## Problems found

* \[ ] The tarball file that Octokit downloaded contain randomly named subfolder. This causes the image path failed to resolve.

![](1-Projects/100DaysOfCode-R3/attachments/69%20-%20garden-astro%20-%20Replace%20Degit%20with%20Octokit-1.png)

References

* https://github.com/actions/checkout/blob/main/src/github-api-helper.ts
* https://github.com/dtinth/notes-infrastructure/blob/d16a640627875438c7ca091188f60951388aea38/src/workers/publish.ts?fbclid=IwAR004pzUuC1YH4kSsiTWVdZ63N4IZ2ra7LBit7RBZrDMxXWpN7XHGBewnm0#L60
