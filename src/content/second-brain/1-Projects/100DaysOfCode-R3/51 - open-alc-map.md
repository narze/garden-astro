---
title: "51 - open-alc-map"
date: 2023-06-29
slug: 100daysofcode-r3-51-open-alc-map
publish: true
tags:
- 100DaysOfCode
- Open-Alcohol-Map
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/51 - open-alc-map.md
---

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/QX6btbNeoBQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

* Upgrade to Svelte v4
* Move data to yaml format
  * Read file in raw format `import data from "./file.yaml?raw"`
  * Use `yaml` package to parse `parse(data)`
* Change logo to circle
  * Use svg `mask`

```html
<image
    href={getBrandImage(node.id)}
    x={node.x - 20}
    y={node.y - 20}
    height="40"
    width="40"
    mask="url(#image-mask)"
/>

<mask id="image-mask" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
    <circle cx="0.5" cy="0.5" r="0.5" fill="white" />
</mask>
```

* Show data on click
  * Use `<dialog>` HTML tag
  * Handle clicking outside the dialog to close, however got Typescript error on implementation
  * Declare custom attribute typing in a separate .d.ts file [ref.](https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error)

```typescript
declare namespace svelteHTML {
	interface HTMLAttributes<T> {
		'on:outclick'?: () => void;
	}
}
```

* Add more entries

As there are more entries, will have to adjust D3 force simulation to make them distribute more evenly

![](1-Projects/100DaysOfCode-R3/attachments/Pasted%20image%2020230629235125.png)
