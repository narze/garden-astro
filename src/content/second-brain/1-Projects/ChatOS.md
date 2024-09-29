---
title: "ChatOS"
date: 2023-07-20
slug: chat-os
publish: true
tags:
- 
draft: true
filepath: src/content/second-brain/1-Projects/ChatOS.md
---

\#excluded

# TODOs & Ideas

*   https://arc.net/p/8F97E451-856E-472E-ABAB-C68E386E696B
*   \[i] Command parser (Typed)
*   \[i] Share text/url/etc. to ChatOS
*   \[ ] Store unencrypted message alongside encrypted? (~~Nanostores~~ vs Dexie indexeddb)
*   \[ ] Add ability for component to add more reply messages
*   \[ ] OpenAI / ChatGPT integration
*   \[x] Sync with Firestore ✅
*   \[x] Fix bug in iOS safari / chrome ![](1-Projects/attachments/ChatOS.png) ✅ Chat logs not rendering, but can still send message and see message on desktop devices
*   \[ ] Image / file upload
*   \[ ] Timer
    *   \[ ] Restart timer
    *   \[ ] Sound alert
*   \[ ] Redo command `!!`
*   \[ ] Get / post URL
*   \[ ] Excalidraw?
*   \[ ] Readme (setup project)
*   \[ ] TODO app
*   \[ ] iframe
*   \[ ] bookmark (detect url)
*   \[ ] QR (detect url)
*   \[ ] Random string, uuid
*   \[ ] Delete message
*   \[ ] PWA
*   \[ ] say command
*   \[ ] Temporary message mode (Remove messages older than 7 - 30 days)
*   \[ ] Improve notification action on click & auto dismiss

```shell
# .envrc
export VITE_FIREBASE_EMULATOR_HOST=$(ipconfig getifaddr en0) 

pnpm run dev
```

## Architecture

ChatOS.excalidraw

![ChatOS.excalidraw](Excalidraw.priv/ChatOS.excalidraw.svg)
%%🖋 Edit in Excalidraw, and the dark exported image%%

***

<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fnarze%2Fposts%2Fpfbid02M11LkLDzaxJdJCAM1WcGJSidPXEjrWcD3hkAPF1V3XfEACQvaF2LtzRFGQ1d6MYbl&show_text=true&width=500" width="500" height="480" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
