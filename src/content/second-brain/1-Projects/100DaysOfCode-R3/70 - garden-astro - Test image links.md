---
title: "70 - garden-astro - Test image links"
date: 2023-07-24
slug: 100daysofcode-r3-70-garden-astro-test-image-links
publish: true
tags:
- garden-astro
- 100DaysOfCode 
- playwright
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/70 - garden-astro - Test image links.md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/tXU7FJ2ui-4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

I find that after changing Github fetch method from Degit to Octokit. The images stop rendering.

![](1-Projects/100DaysOfCode-R3/attachments/70%20-%20garden-astro%20-%20Test%20image%20links.png)

I verify that the path is correct, but it seems that all the image files are corrupted.

![](1-Projects/100DaysOfCode-R3/attachments/70%20-%20garden-astro%20-%20Test%20image%20links-1.png)

Upon debugging, I find the root of the problem I parse the file content before writing to file system.

```typescript
for await (const item of readTar(passThroughStream, fileFilter)) {
  const source = item.content.toString()
  const path = pathWithoutTopmostDir(item.entry.path)
  const destinationPath = `./tmp/second-brain/${path}`

  await fs.promises.writeFile(destinationPath, source) // Source is string
}
```

The fix is simple, just use the file content directly, it is a `Buffer` that is also supported by `writeFile` function.

```typescript
for await (const item of readTar(passThroughStream, fileFilter)) {
  const path = pathWithoutTopmostDir(item.entry.path)
  const destinationPath = `./tmp/second-brain/${path}`

  await fs.promises.writeFile(destinationPath, item.content) // Buffer
}
```

The images are now render-able again.

![](1-Projects/100DaysOfCode-R3/attachments/70%20-%20garden-astro%20-%20Test%20image%20links-2.png)

## Testing

To prevent broken images in the future, I add the Playwright test to test all the images on the website to the existing link tester.

```typescript
async function isImageLoaded(src: string) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = src
  })
}

const locator = page.locator("img")
const images = await locator.evaluateAll((imgs: HTMLImageElement[]) =>
  imgs
    .map((img) => img.src)
    .filter((src) => src.startsWith("http://localhost:3000"))
)

for (const imageSrc of images) {
  const isLoaded = await page.evaluate(isImageLoaded, imageSrc)
  
  if (!isLoaded) {
    console.error("Broken image", imageSrc, "on page", link)
    brokenImages.push({ image: imageSrc, page: link })
  }
}

expect(brokenImages.length).toEqual(0)
```

When the test found any broken images, it will fail the test.

![](1-Projects/100DaysOfCode-R3/attachments/70%20-%20garden-astro%20-%20Test%20image%20links-3.png)
