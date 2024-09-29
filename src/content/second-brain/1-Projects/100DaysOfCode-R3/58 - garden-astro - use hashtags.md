---
title: "58 - garden-astro - use hashtags"
date: 2023-07-09
slug: 100daysofcode-r3-58-garden-astro-use-hashtags
publish: true
tags:
 - Digital-Garden
 - Astro
 - 100DaysOfCode
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/58 - garden-astro - use hashtags.md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/TpQQpHVH3jo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Previously I add support for tags in this format

```yaml
tags:
- Astro
- Digital Garden
- 100DaysOfCode
```

However it is hard to search existing tags in Obsidian, I'll change the format to use hashtags instead like this. Upon typing `#` in Obsidian will show tags autocomplete menu

```yaml
tags:
- #Astro
- #Digital-Garden
- #100DaysOfCode
```

![](1-Projects/100DaysOfCode-R3/attachments/58%20-%20garden-astro%20-%20use%20hashtags.png)

But in yaml `#` is a comment keyword so that it will be `[null, null, null]` in Astro. I have to strip all the `#` so that the tags can appear on the website. I tried parsing this frontmatter with `js-yaml` but also get `null` so I have to use RegEx to match and replace them. This is the resulting code.

```typescript
import fs from "node:fs"
import { remark } from "remark"
import { visit } from "unist-util-visit"
import remarkFrontmatter from "remark-frontmatter"

export const stripHashFromTags = (filePath: string) => {
  const markdown = fs.readFileSync(filePath, "utf-8")

  const processor = remark()
    .use(remarkFrontmatter)
    .use(() => (tree, file) => {
      visit(tree, "root", (node) => {
        visit(node, "yaml", (yamlNode) => {
          const frontmatter = yamlNode.value.replace(
            /tags:\n((\s*-\s+)?#.+\n)+/g,
            (match) => {
              return match.replace(/#.+/g, (tag) => tag.slice(1))
            }
          )

          yamlNode.value = frontmatter
        })
      })
    })

  const result = processor.processSync(markdown)

  fs.writeFileSync(filePath, String(result), {
    encoding: "utf-8",
  })
}
```

It will now display on Astro site since `#` is removed.

![](1-Projects/100DaysOfCode-R3/attachments/58%20-%20garden-astro%20-%20use%20hashtags-1.png)

## Disallow whitespaces in tags

Since we're using hashtags as tags in Obsidian, we should not have spaces in the tags like `#Digital Garden` should not be allowed.

Add `zod` schema with `refine` to scan for whitespaces within tags array.

```typescript
const secondBrain = defineCollection({
  schema: z.object({
    ...,

    tags: z
      .array(
        z
          .string()
          .refine(
            (tag) => !/\s/.test(tag), // returns false when tag has spaces
            (tag) => ({
              message: `Tag "${tag}" cannot include whitespaces`,
            })
          )
          .or(z.null())
      )
  })
})
```

Astro site will now raise errors if any tags are including spaces.

![](1-Projects/100DaysOfCode-R3/attachments/58%20-%20garden-astro%20-%20use%20hashtags-2.png)
