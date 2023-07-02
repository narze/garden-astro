import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import githubFetchIntegration from "./src/lib/github-fetch-integration"
import svelte from "@astrojs/svelte"
import tailwind from "@astrojs/tailwind"
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

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [
    mdx(),
    sitemap(),
    githubFetchIntegration(),
    svelte(),
    tailwind(),
  ],
  markdown: {
    remarkPlugins: [prependImageSrcPlugin],
  },
})
