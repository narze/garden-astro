---
title: "53 - garden-astro - Add link resolver"
date: 2023-07-02
slug: 100daysofcode-r3-53-garden-astro-add-link-resolver
publish: true
tags:
- Astro
- Digital-Garden
- 100DaysOfCode
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/53 - garden-astro - Add link resolver.md
---

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/QNxlSBWc09U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Create a link resolver script and hook with Github fetch integration & dev.ts script. It uses `gray-matter` to read each of the entries and check if each markdown link points to other web pages (after filter non-published pages), then overwrite the link with working slugs.

* Link to other [published page](/100daysofcode-r3-52-garden-astro-add-tailwind) should work
* Link to homepage should work on website (not working on Obsidian since it does not link to a file)
* Link to [other websites](https://narze.live) should still work since it starts with `http`

\#offstream
I also added [Prettier](https://github.com/narze/garden-astro/commit/b24181ce8d33752a268e096c9f3e7801320f61de) & [ESLint](https://github.com/narze/garden-astro/commit/317817bbc197abb1e01c59e60b57f944bbf9d790), then took some time to add "View Source" button, to achieve that I have to create another script to add `filepath:` key to frontmatter

```typescript
import fs from "node:fs"
import { remark } from "remark"
import { visit } from "unist-util-visit"
import remarkFrontmatter from "remark-frontmatter"

export const addFilepath = (filePath: string) => {
  const markdown = fs.readFileSync(filePath, "utf-8")

  const processor = remark()
    .use(remarkFrontmatter)
    .use(() => (tree, file) => {
      visit(tree, "root", (node) => {
        visit(node, "yaml", (yamlNode) => {
          yamlNode.value += `\nfilepath: ${filePath}`
        })
      })
    })

  const result = processor.processSync(markdown)

  fs.writeFileSync(filePath, String(result), {
    encoding: "utf-8",
  })
}
```
