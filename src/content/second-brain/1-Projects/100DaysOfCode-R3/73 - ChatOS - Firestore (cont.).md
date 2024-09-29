---
title: "73 - ChatOS - Firestore (cont.)"
date: 2023-07-31
slug: 100daysofcode-r3-73-chatos-firestore-cont
publish: true
tags:
- 100DaysOfCode 
- ChatOS 
- firebase
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/73 - ChatOS - Firestore (cont.).md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Tasks

*   Separate chat messages from each users
    *   Now when logged in, the chat logs from before logging in (guest session) will not transferred to user. To fix this issue I need to setup Firebase Admin and use [Batch Write](https://firebase.google.com/docs/firestore/manage-data/transactions) to manually copy logs from guest collection to user collection. That will be the task for another day.

The Firestore collection paths are now `/users/:uid/messages`  and `/guests/:sessionId/messages`.

![](1-Projects/100DaysOfCode-R3/attachments/73%20-%20ChatOS%20-%20Firestore%20\(cont.\).png)
