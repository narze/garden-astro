import { defineConfig } from "astro/config"

import mdx from "@astrojs/mdx"

import sitemap from "@astrojs/sitemap"
import githubFetchIntegration from "./src/lib/github-fetch-integration"

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), githubFetchIntegration()],
})
