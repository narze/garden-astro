import type { AstroIntegration, AstroConfig } from "astro"
import degit from "degit"
import { globSync } from "glob"
import { rimrafSync } from "rimraf"
import fs, { copyFileSync } from "node:fs"
import nodePath from "node:path"
import matter from "gray-matter"

const githubFetchIntegration = (options?: any): AstroIntegration => {
  let config: AstroConfig

  return {
    name: "github-fetch",

    hooks: {
      "astro:config:done": async ({ config: cfg }) => {
        console.log("Config done, fetching files from narze/garden...")

        const emitter = degit("narze/second-brain#main", {
          cache: false,
          force: true,
          verbose: true,
        })

        await emitter.clone("./tmp/second-brain")

        rimrafSync("./src/content/second-brain/*", { glob: true })

        // For each file in the directory, we need to:
        // 1. Filter out non-markdown files
        // 2. Read the file frontmatter
        // 3. If it's has publish: true
        // Then copy those files to the src/content/second-brain directory
        globSync("./tmp/second-brain/**/*.{md,mdx,svx}")
          .filter((path) => {
            // Excludes these files:
            // - Includes #
            // - Starts with _
            // - Starts with .
            // - Starts with /templates

            return (
              !path.includes("#") &&
              !path.includes("_") &&
              !path.includes("/.") &&
              !path.includes("/_") &&
              !path.includes("/Untitled") &&
              !path.includes("/templates/")
            )
          })
          .forEach((path) => {
            try {
              const file = matter.read(path)

              if (
                file?.data?.date &&
                file?.data?.title &&
                String(file?.data?.publish) === "true"
              ) {
                const destinationPath = `./src/content/second-brain/${path
                  .split("/")
                  .slice(2)
                  .join("/")}`
                const destinationDir = nodePath.dirname(destinationPath)

                console.log("Copy", path, "to", destinationPath)

                // Create the destination directory if it doesn't exist
                if (!fs.existsSync(destinationDir)) {
                  fs.mkdirSync(destinationDir, { recursive: true })
                }

                copyFileSync(path, destinationPath)
              }
            } catch (e) {
              console.error(e)
            }
          })

        console.log("Done fetching files from narze/garden")

        return
      },
    },
  }
}

export default githubFetchIntegration
