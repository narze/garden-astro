---
title: "55 - garden-astro - Move website & add RSS feed"
date: 2023-07-04
slug: 100daysofcode-r3-55-garden-astro
publish: true
tags:
- 100DaysOfCode
- Digital-Garden
- garden-astro
- Astro
filepath: src/content/second-brain/1-Projects/100DaysOfCode-R3/55 - garden-astro.md
---

## Livestream

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/gOJU88MIXjs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Moving websites

Switch https://garden.narze.live too use garden-astro instead, here is the image of the old site which uses [Quartz](https://github.com/jackyzha0/quartz) ![](1-Projects/100DaysOfCode-R3/attachments/55%20-%20garden-astro.png)
The old website is moved to [garden-quartz.narze.live](https://garden-quartz.narze.live)

## Webring logo

Add webring logo to the site following these [instructions](https://github.com/wonderfulsoftware/webring#%E0%B8%A3%E0%B9%88%E0%B8%A7%E0%B8%A1%E0%B8%A7%E0%B8%87)

```html
<a href="https://webring.wonderful.software#garden.narze.live" title="วงแหวนเว็บ" style="width: 32px; display: block; margin: 0 auto;">
    <img
        alt="วงแหวนเว็บ"
        width="32"
        height="32"
        src="https://webring.wonderful.software/webring.white.svg"
    />
</a>
```

***

## Add RSS feed

The RSS feed can be easily added using `@astrojs/rss`  https://docs.astro.build/en/guides/rss/#setting-up-astrojsrss

```typescript
// feed.xml.ts

import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts"

export async function get(context) {
  const entries = (await getCollection("second-brain")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  )

  const items = entries.map((post) => ({
    title: post.data.title,
    pubDate: post.data.date,
    // description: post.data.description,
    // customData: post.data.customData,
    link: `/${post.slug}`,
  }))

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items,
  })
}
```

![](1-Projects/100DaysOfCode-R3/attachments/55%20-%20garden-astro-1.png)

The feed is available at https://garden.narze.live/feed.xml and https://garden.narze.live/index.xml (In case I forgot the URL)
