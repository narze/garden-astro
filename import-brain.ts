import degit from "degit"
import { globSync } from "glob"
import matter from "gray-matter"
import fs, { copyFileSync } from "node:fs"
import nodePath from "node:path"
import { rimrafSync } from "rimraf"

const emitter = degit("narze/second-brain#main", {
  cache: false,
  force: true,
  verbose: true,
})

emitter.on("info", (info: any) => {
  console.log(info.message)
})

emitter.clone("./tmp/second-brain").then(async () => {
  // Cleanup src/content/second-brain
  rimrafSync("./src/content/second-brain")

  // For each file in the directory, we need to:
  // 1. Filter out non-markdown files
  // 2. Read the file frontmatter
  // 3. If it's has publish: true
  // Then copy those files to the src/content/second-brain directory
  globSync("./tmp/second-brain/**/*.md")
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
          file?.data?.date ||
          file?.data?.title ||
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
})
