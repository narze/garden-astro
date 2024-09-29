---
title: "54 - garden-astro - tags & search"
date: 2023-07-03
slug: 100daysofcode-r3-54-garden-astro-tags-search
publish: true
tags:
- Astro
- Digital-Garden
- 100DaysOfCode
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/54 - garden-astro - tags & search.md
---

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/qtQ6RK-NDPI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Add tags

Start by adding type schema in Astro's `config.ts`

```typescript
const secondBrain = defineCollection({
  schema: z.object({
    ...
    tags: z.array(z.string()).optional(),
  }),
})
```

Then the tags will be available in Astro layout file

```typescript
// Post.astro
const { title, date, draft, updated, filepath, tags } = Astro.props
```

## All tags page

![](1-Projects/100DaysOfCode-R3/attachments/Pasted%20image%2020230703220104.png)

## Tag entries page

![](1-Projects/100DaysOfCode-R3/attachments/Pasted%20image%2020230703220118.png)

## Search

Use [Pagefind](https://pagefind.app) that indexes the whole site after build. There is one problem about the library is it have to be async imported and it's not available on development, luckily there is a workaround to [add a dev endpoint to mock the library on development.](https://blog.otterlord.dev/post/astro-search/#adding-a-dev-endpoint)

![](1-Projects/100DaysOfCode-R3/attachments/Pasted%20image%2020230703235733.png)

The search result is not ideal since it does not strip some html tags, will deal with it later. ![](1-Projects/100DaysOfCode-R3/attachments/Pasted%20image%2020230704000014.png)

***

\#issue Degit blows up

```
09:11:04 PM [build] Waiting for the github-fetch integration...
 error   zlib: unexpected end of file
  File:
    /Users/narze/Code/github.com/narze/garden-astro/node_modules/.pnpm/degit@2.8.4/node_modules/degit/dist/index-688c5d50.js:1322:22
  Code:
    1321 |       Buffer.concat = OriginalBufferConcat;
    > 1322 |       this[_onError](new ZlibError(err));
           |                      ^
```

Solution : Clear degit cache `rm -rf ~/.degit` [ref.](https://github.com/Rich-Harris/degit/issues/313) (Cannot use `tiged` since it does not support typescript)

Maybe we should move to Octokit in the near future...
