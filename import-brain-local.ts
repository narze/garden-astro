import degit from "degit"
import { globSync } from "glob"
import matter from "gray-matter"
import fs, { copyFileSync } from "node:fs"
import path from "node:path"
import { rimrafSync } from "rimraf"

const obsidianPath = resolveHome(
  `${process.env["OBSIDIAN_PATH"] || "~/obsidian"}`
)

function resolveHome(filepath: string): string {
  if (filepath[0] === "~") {
    return path.join(process.env.HOME!, filepath.slice(1))
  }

  return filepath
}

// Cleanup src/content/second-brain
rimrafSync("./src/content/second-brain/*", { glob: true })

// For each file in the directory, we need to:
// 1. Filter out non-markdown files
// 2. Read the file frontmatter
// 3. If it's has publish: true
// Then copy those files to the src/content/second-brain directory
globSync(`${obsidianPath}/**/*.md`)
  .filter((filePath) => {
    // Excludes these files:
    // - Includes #
    // - Starts with _
    // - Starts with .
    // - Starts with /templates

    return (
      !filePath.includes("#") &&
      !filePath.includes("_") &&
      !filePath.includes("/.") &&
      !filePath.includes("/_") &&
      !filePath.includes("/Untitled") &&
      !filePath.includes("/templates/")
    )
  })
  .forEach((filePath) => {
    try {
      const file = matter.read(filePath)

      if (
        // file?.data?.date ||
        // file?.data?.title ||
        String(file?.data?.publish) === "true"
      ) {
        const destinationPath = `./src/content/second-brain/${filePath.replace(
          obsidianPath,
          ""
        )}`
        const destinationDir = path.dirname(destinationPath)

        console.log("Copy", filePath, "to", destinationPath)

        // Create the destination directory if it doesn't exist
        if (!fs.existsSync(destinationDir)) {
          fs.mkdirSync(destinationDir, { recursive: true })
        }

        copyFileSync(filePath, destinationPath)
      }
    } catch (e) {
      console.error(e)
    }
  })
