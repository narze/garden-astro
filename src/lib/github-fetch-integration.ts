import type { AstroIntegration, AstroConfig } from "astro"
import degit from "degit"
import { globSync } from "glob"
import { rimrafSync } from "rimraf"
import fs, { copyFileSync } from "node:fs"
import nodePath from "node:path"
import matter from "gray-matter"
import { extractImageSources } from "./extract-image-sources"
import { resolveLinks } from "./resolve-links"
import { addFilepath } from "./add-filepath"
import { stripHashFromTags } from "./strip-hash-from-tags"
import { Octokit } from "octokit"
import { extractTar } from "@actions/tool-cache"

const githubFetchIntegration = (options?: any): AstroIntegration => {
  let config: AstroConfig

  return {
    name: "github-fetch",

    hooks: {
      "astro:config:done": async ({ config: cfg }) => {
        console.log("Config done, fetching files from narze/second-brain...")

        // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
        const octokit = new Octokit({})
        const owner = "narze"
        const repo = "second-brain"
        const downloadResponse =
          await octokit.rest.repos.downloadTarballArchive({
            owner,
            repo,
            ref: "main",
          })

        let data = Buffer.from(downloadResponse.data as ArrayBuffer)

        // Write
        if (!fs.existsSync("./tmp")) {
          fs.mkdirSync("./tmp")
        }
        const archivePath = nodePath.join("./tmp/", `archive.tar.gz`)
        await fs.promises.writeFile(archivePath, data)
        data = Buffer.from("") // Free memory

        // Extract file to ./tmp/second-brain
        const extractedFolder = await extractTar(
          archivePath,
          "./tmp/second-brain"
        )

        console.log({ extractedFolder })

        rimrafSync("./public/images/*", { glob: true })
        rimrafSync("./src/content/second-brain/*", { glob: true })

        const slugs: string[] = []
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

                // Prevent copying if the slug already exists
                if (slugs.includes(file.data.slug)) {
                  console.log(
                    "Slug",
                    file.data.slug,
                    "already exists, skipping"
                  )
                  return
                }
                slugs.push(file.data.slug)

                console.log("Copy", path, "to", destinationPath)

                // Create the destination directory if it doesn't exist
                if (!fs.existsSync(destinationDir)) {
                  fs.mkdirSync(destinationDir, { recursive: true })
                }

                copyFileSync(path, destinationPath)

                // Parse the file with remark, and then get image paths
                // Copy those images to public/images/**
                const imageSources = extractImageSources(path)
                // console.log({ imageSources })

                imageSources.forEach((imageSource) => {
                  const srcPath = `./tmp/second-brain/${imageSource}`

                  const destinationPath = `./public/images/${imageSource}`
                  const destinationDir = nodePath.dirname(destinationPath)

                  // Skip if file not exist
                  if (!fs.existsSync(srcPath)) {
                    console.log("File", srcPath, "not found, skipping")
                    return
                  }

                  // Create the destination directory if it doesn't exist
                  if (!fs.existsSync(destinationDir)) {
                    fs.mkdirSync(destinationDir, { recursive: true })
                  }

                  copyFileSync(srcPath, destinationPath)

                  // console.log("Copied", srcPath, "to", destinationPath)
                })
              }
            } catch (e) {
              console.error(e)
            }
          })

        console.log("Done fetching files from narze/garden")

        globSync("./src/content/second-brain/**/*.{md,mdx,svx}").forEach(
          (path) => {
            resolveLinks(path)
            addFilepath(path)
            stripHashFromTags(path)
          }
        )

        return
      },
    },
  }
}

export default githubFetchIntegration
