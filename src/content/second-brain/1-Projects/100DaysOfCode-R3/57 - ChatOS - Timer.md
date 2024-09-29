---
title: "57 - ChatOS - Timer"
date: 2023-07-08
slug: 100daysofcode-r3-57-chatos-timer
publish: true
tags:
- chat-os
- sveltekit
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/57 - ChatOS - Timer.md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/05Lg7zyM8zA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

I plan to add a countdown timer to [ChatOS](https://chat.narze.live) to make it possible to achieve Pomodoro Workflow without using other timer apps. I was [using](/uses) Session and Toggl.

I create [Timer.svelte](https://github.com/narze/chat-os/blob/64108a90cd0e9389164a75516b0b69bfd1cb14e3/src/lib/commands/components/Timer.svelte) component and find out that [Web Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) alone will not work if I'm in another browser tab as the main thread stops the timer from running, I will have to use Web Worker to count the time in background, and Service Worker to post the notification when the timer is ended.

## Timer in web worker

I'm using SvelteKit on Vite. I can create a web worker like so. (Types are omitted)

```typescript
// timer.worker.ts
onmessage = (message) => {
	const { endAt } = message.data;

	const intervalId = setInterval(() => {
		if (Date.now() >= endAt) {
			clearInterval(intervalId);
			postMessage({ ended: true });
		}
	}, 1000);
};

export {};
```

Then, and dynamic import it with `?worker` suffix to [tell Vite that it's a web worker script](https://vitejs.dev/guide/features.html#web-workers). This component will send `{ endAt: Date }` to the worker, then worker will post `{ ended: true }` back when the timer ends.

```html
<!-- Timer.svelte -->

<script lang="ts">
    export let endAt: Date
    
    async function runTimerWorker() {
		const TimerWorker = await import('$lib/workers/timer.worker?worker');
		timerWorker = new TimerWorker.default();

		const message = { endAt };
		timerWorker.postMessage(message);
		
		timerWorker.onmessage = (event) => {
			const message = event.data;

			if (message.ended) {
				console.log("Received ended: true from the worker")
			}
		};
	}

    onMount(runTimerWorker)
</script>

...
```

## Notification in service worker

Create another service worker that can send web notification, it may be blank but I added some logging code so I can hack on it if needed.

```typescript
// service-worker.ts

/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
const sw = self as unknown as ServiceWorkerGlobalScope;

sw.addEventListener('activate', async () => {
	// This will be called only once when the service worker is activated.
	console.log('service worker activated');
});
```

Then import and register the service worker in the same component of the timer web worker.

```html
// Timer.svelte

<script lang="ts">
    let worker: ServiceWorkerRegistration;

    onMount(async () => {
		if ('serviceWorker' in navigator) {
			worker = await navigator.serviceWorker.register('./service-worker.js', {
				type: dev ? 'module' : 'classic' 
			});
		}
    })
</script>

...
```

Now you can use `worker.showNotification` to send notifications. But before that make sure you have notification permission by calling `Notification.requestPermission()`

```html
// Timer.svelte

<script lang="ts">
    ...

    async function runTimerWorker() {
        ...

        timerWorker.onmessage = (event) => {
			const message = event.data;

			if (message.ended) {
				console.log("Received ended: true from the worker")

                worker.showNotification("Timer", { body: "Timer is ended" })
			}
		};
    }
</script>

<!-- Don't forget to allow notification permission -->
<button on:click={() => Notification.requestPermission()}>
    Allow notification
</button>

...
```

See the working code (at the time of this writing) here:

* Component - [Timer.svelte](https://github.com/narze/chat-os/blob/91f6ca25ee884f97e837793ff75170488c4ecf2a/src/lib/commands/components/Timer.svelte)
* `timer` chat command - [timer.ts](https://github.com/narze/chat-os/blob/91f6ca25ee884f97e837793ff75170488c4ecf2a/src/lib/commands/timer.ts)
* Timer worker - [timer.worker.ts](https://github.com/narze/chat-os/blob/91f6ca25ee884f97e837793ff75170488c4ecf2a/src/lib/workers/timer.worker.ts)

Try the timer command on [ChatOS](https://chat.narze.live) by typing `timer mm:ss`

The finished timer ![](1-Projects/100DaysOfCode-R3/attachments/Screenshot%202023-07-09%20at%202.32.05%20AM.png)

The notification ![](1-Projects/100DaysOfCode-R3/attachments/57%20-%20ChatOS%20-%20Timer.png)

## Possible improvements

* Play around with [Notification properties](https://developer.mozilla.org/en-US/docs/Web/API/Notification#instance_properties), adding icon, custom sound, timestamp, etc.
* Refactor notification related code so that other commands can use it as well
* Support [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API), so that the tab can be closed but notification still can be sent to user (This may need persisting user...)

## References

* https://blog.atulr.com/web-notifications
* https://kit.svelte.dev/docs/service-workers
* https://vitejs.dev/guide/assets.html#importing-script-as-a-worker
