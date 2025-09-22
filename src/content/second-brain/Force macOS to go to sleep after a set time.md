---
title: Force macOS to go to sleep after a set time
date: 2025-09-22
slug: force-macos-to-go-to-sleep-after-a-set-time
publish: true
tags:
  - macos
draft: false
no_feed: false
unlisted: false
filepath: src/content/second-brain/Force macOS to go to sleep after a set time.md
---

Useful when leaving a task running unattended, don't forget to `caffeinate`

```bash
# Wait for 10 minutes, then sleep
sleep 600 ; pmset sleepnow
```
