---
title: "75 - ChatOS - Debug app on iPad"
date: 2023-08-02
slug: 100daysofcode-r3-75-chatos-debug-app-on-ipad
publish: true
tags:
- 100DaysOfCode 
- ChatOS 
- devlog
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/75 - ChatOS - Debug app on iPad.md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/cR1ONcMaHIY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

ChatOS is not working after merging Firebase branch, debugging is possible via Chrome by enabling [Web Inspector](https://developer.chrome.com/blog/debugging-chrome-on-ios) and use macOS Safari to connect to the iOS Chrome's console.

I also use PiP to cast iPad's screen onto macOS for streaming.

To run local ChatOS on iPad, configure Firebase Emulator and Vite to expose host 0.0.0.0

```json
// firebase.json
{
	"emulators": {
		"auth": {
			"port": 9099,
			"host": "0.0.0.0"
		},
		"firestore": {
			"port": 8080,
			"host": "0.0.0.0"
		},
		"ui": {
			"enabled": true,
			"port": 4444
		},
		"singleProjectMode": true
	}
}
```

```shell
# Run vite dev server
pnpm run dev --host 0.0.0.0
```

## Changes

* Check for `window.Notification` presence in timer command, since mobile Chrome & Safari [does not support Notification API yet](https://developer.mozilla.org/en-US/docs/Web/API/notification)
* Turn off [auto capitalization](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize), so that the mobile keyboard will not use auto-capitalization

Now ChatOS works on iPad!

![](1-Projects/100DaysOfCode-R3/attachments/IMG_27B9BA42FD27-1.jpeg)
