---
title: "66 - ChatOS - Add Firebase Auth (cont.)"
date: 2023-07-18
slug: 100daysofcode-r3-66-chatos-add-firebase-auth-cont
publish: true
tags:
- firebase
- 100DaysOfCode 
- ChatOS
- SvelteKit
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/66 - ChatOS - Add Firebase Auth (cont.).md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/zCGL8aT8hoc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Refactor Auth into a Svelte store

[Yesterday](/100daysofcode-r3-65-chatos-add-firebase-auth) I did add Firebase Auth's `getUserAuthState()` function into `+layout.ts`, this will not support SSR since when rendering on server it will always return null-ish user. I researched more and found [Fireship's code](https://github.com/codediodeio/sveltefire/blob/master/src/lib/stores.ts#L93-L119) that utilize [`svelte/store`](https://svelte.dev/docs/svelte-store) and can write a condition to support SSR.

```typescript
// src/lib/firebase-store.ts

export function userStore() {
	// SSR - Server Side Rendering
	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable<undefined>(undefined);
		return {
			subscribe
		};
	}

    // CSR - Client Side Rendering (works on browser)
	const { subscribe } = writable<User | null | undefined>(auth?.currentUser ?? undefined, (set) => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return { subscribe };
}
```

Now in layout or view files, get the store subscriber and use it like this.

```html
<script lang="ts">
  import { userStore } from "$lib/firebase-store";

  const user = userStore()
</script>

{#if $user === undefined}
  <p>Loading...</p>
{:else if $user}
  <p>Logged in as {$user.displayName}</p>
{:else}
  <p>
    Not logged in
  </p>
{/if}
```

The `$user` will have 3 possible states (`undefined`, `null`, and `object`) and will be the default one if ran on SSR, so you will not see the page blinks from `Not logged in` to `Loading`
