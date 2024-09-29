---
title: "85 - Update narze/resume"
date: 2023-08-14
slug: 100daysofcode-r3-85-update-narze-resume
publish: true
tags:
- 100DaysOfCode
- svelte
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/85 - Update narze resume.md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/Z9TX_cWo350" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

https://github.com/narze/resume

* Change to SvelteKit v1.0 (Replace the project with newly created SvelteKit)
* Update `HideToggle` which mutates parent element directly to component with slot

Before

```svelte
<script lang="ts">
	let hide = false;

	function hideToggle(e: Event) {
		hide = !hide;
		const el = e.target as HTMLInputElement;
		const parentEl = el.parentNode as HTMLInputElement;

		if (hide) {
			parentEl.classList.add('web-only', 'text-gray-300');
		} else {
			parentEl.classList.remove('web-only', 'text-gray-300');
		}
	}
</script>

<button class="hide-toggle web-only" on:click={hideToggle}>{hide ? '[Show]' : '[Hide]'}</button>

<style lang="postcss">
	.hide-toggle {
		@apply text-gray-700 underline;
	}
</style>
```

After

```svelte
<script lang="ts">
	let hide = false;

	const toggleHide = () => (hide = !hide);
</script>

<button class="web-only" class:text-gray-300={hide} on:click={toggleHide}
	>{hide ? '[Show]' : '[Hide]'}</button
>

<div class="inline" class:web-only={hide} class:text-gray-300={hide}>
	<slot />
</div>
```
