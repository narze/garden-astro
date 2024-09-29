---
title: "50 - garden-astro - Add image & link support"
date: 2023-06-28
slug: 100daysofcode-r3-50-garden-astro-add-image-and-link-support
publish: true
tags:
- Astro
- Digital-Garden
- 100DaysOfCode
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/50 - garden-astro - Add image & link support.md
---

Normal Image looks like this in Obsidian, it's a markdown image link.

`![](1-Projects/100DaysOfCode-R3/attachments/Pasted%20image%2020230628232312.png)`

![](1-Projects/100DaysOfCode-R3/attachments/Pasted%20image%2020230628232312.png)

^ If you see the images above rendered correctly, the Remark plugin is working.

It is an absolute path from the root folder, so to make it render on Astro I have to copy the image to Astro, and also modify the resulting link to `/public/path-to-image`, I plan to create a [Remark](https://github.com/remarkjs/remark) plugin to modify the image & href links.

The plugin itself is a tree traversal function that recursively visit each node and modify the url of images like so

```typescript
function prependImageSrcPlugin() {
  return (tree) => {
    function visit(node) {
      if (node.type === "image" && node.url) {
        node.url = `/images/${node.url}`
      }
      if (node.children) {
        node.children.forEach(visit)
      }
    }

    visit(tree)
  }
}

export default defineConfig({
  markdown: {
    remarkPlugins: [prependImageSrcPlugin],
  },
})
```

Then add the script to copy the images from Obsidian to Astro build step, by extracting image path of each markdown file, and copy to `/public/images/` folder

```typescript
export const extractImageSources = (filePath) => {
  const markdown = fs.readFileSync(filePath, "utf-8")

  const imageSources = []

  const processor = remark().use(() => (tree) => {
    visit(tree, "image", (node) => {
      // Decode URI since the url can have spaces or other symbols `%20`
      const imageUrl = decodeURI(node.url)

      imageSources.push(imageUrl)
    })
  })

  processor.processSync(markdown)

  return imageSources
}

// Usage
const imageSources = extractImageSources(filePath)

imageSources.forEach((imageSource) => {
    const srcPath = `/your/obsidian/path/${imageSource}`
    
    const destinationPath = `./public/images/${imageSource}`
    const destinationDir = path.dirname(destinationPath)
    
    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true })
    }
    
    copyFileSync(srcPath, destinationPath)
    
    console.log("Copied", srcPath, "to", destinationPath)
})
```
