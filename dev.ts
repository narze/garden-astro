import chokidar from "chokidar"
import fs, { copyFileSync } from "node:fs"
import path from "node:path"
import { rimrafSync } from "rimraf"
import { remark } from "remark"
import { visit } from "unist-util-visit"

const obsidianPath = resolveHome(
  `${process.env["OBSIDIAN_PATH"] || "~/obsidian"}`
)

function resolveHome(filepath: string): string {
  if (filepath[0] === "~") {
    return path.join(process.env.HOME!, filepath.slice(1))
  }

  return filepath
}

const extractImageSources = (filePath) => {
  const markdown = fs.readFileSync(filePath, "utf-8")

  const imageSources = []

  const processor = remark().use(() => (tree) => {
    visit(tree, "image", (node) => {
      // console.log({ node })
      const imageUrl = decodeURI(node.url)

      imageSources.push(imageUrl)
    })
  })

  processor.processSync(markdown)

  return imageSources
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

  // Ignore Untitled files, they are probably temporary
  if (filePath.includes("/Untitled")) {
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

  // Parse the file with remark, and then get image paths
  // Copy those images to public/images/**
  const imageSources = extractImageSources(filePath)

  imageSources.forEach((imageSource) => {
    const srcPath = `${obsidianPath}/${imageSource}`

    const destinationPath = `./public/images/${imageSource}`
    const destinationDir = path.dirname(destinationPath)

    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true })
    }

    copyFileSync(srcPath, destinationPath)

    console.log("Copied", srcPath, "to", destinationPath)
  })
})

// Cleanup src/content/second-brain/local on exit
process.on("SIGINT", () => {
  console.log("Cleaning up src/content/second-brain/local/")

  rimrafSync("./src/content/second-brain/local/*", { glob: true })

  process.exit()
})

console.log(`Watching ${obsidianPath} for changes`)
