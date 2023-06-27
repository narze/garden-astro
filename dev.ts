import chokidar from "chokidar"
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

chokidar.watch(obsidianPath).on("change", (filePath, stats) => {
  // Ignore files that starts with .
  if (filePath.includes("/.")) {
    return
  }

  // Ignore non md/mdx/sdx files
  if (
    !filePath.endsWith(".md") &&
    !filePath.endsWith(".mdx") &&
    !filePath.endsWith(".sdx")
  ) {
    return
  }

  // console.log(filePath, stats)

  // Copy file to src/content/second-brain/local/**
  const destinationPath = `./src/content/second-brain/local/${filePath.replace(
    obsidianPath,
    ""
  )}`
  const destinationDir = path.dirname(destinationPath)

  // Create the destination directory if it doesn't exist
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true })
  }

  copyFileSync(filePath, destinationPath)

  console.log("Copied", filePath, "to", destinationPath)

  // Edit file and add local- to slug in the frontmatter to prevent collision
  const fileContent = fs.readFileSync(destinationPath, {
    encoding: "utf-8",
  })
  const fileContentWithLocal = fileContent.replace(
    /(?<=^slug: )(.*)/gm,
    "local-$1"
  )

  fs.writeFileSync(destinationPath, fileContentWithLocal, {
    encoding: "utf-8",
  })
})

// Cleanup src/content/second-brain/local on exit
process.on("SIGINT", () => {
  console.log("Cleaning up src/content/second-brain/local/")

  rimrafSync("./src/content/second-brain/local/*", { glob: true })

  process.exit()
})

console.log(`Watching ${obsidianPath} for changes`)
