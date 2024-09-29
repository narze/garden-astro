---
title: "74 - ChatOS - Merge guest chat logs"
date: 2023-08-01
slug: 100daysofcode-r3-74-chatos-merge-guest-chat-logs
publish: true
tags:
- 100DaysOfCode 
- ChatOS 
- firebase
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/74 - ChatOS - Merge guest chat logs.md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/ALabSN5Dyt0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

[Yesterday](/100daysofcode-r3-73-chatos-firestore-cont) I planned to add Firebase Admin and use batch update to move guest chat logs to user when logged in. Today I want guests to store chat logs on their local storage only, so I'll bring back [Dexie](https://dexie.org) and then user can opt-in to merge guest chat logs to user.

I also want to add more tests to ensure that login is working and user can be able to sync guest chat logs.

## Changes

* Add login flow tests.
* Add [`wait-on`](https://www.npmjs.com/package/wait-on)  to wait for Firebase Emulator port on Github Actions
* Sync guest chat logs to user by clicking `Sync Chat` ![](1-Projects/100DaysOfCode-R3/attachments/74%20-%20ChatOS%20-%20Merge%20guest%20chat%20logs.png)
