import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts"
import type { APIRoute } from "astro"

export const GET: APIRoute = async (context) => {
  const entries = (
    await getCollection("second-brain", ({ data }) => {
      return (
        data.draft !== true && data.no_feed !== true && data.unlisted !== true
      )
    })
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

  const items = entries.map((post) => ({
    title: post.data.title,
    pubDate: post.data.date,
    // description: post.data.description,
    // customData: post.data.customData,

    // Compute RSS link from post `slug`
    // This example assumes all posts are rendered as `/blog/[slug]` routes
    link: `/${post.slug}`,
  }))

  return rss({
    // `<title>` field in output xml
    title: SITE_TITLE,
    // `<description>` field in output xml
    description: SITE_DESCRIPTION,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: String(context.site),
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items,
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  })
}
