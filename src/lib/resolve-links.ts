import fs from "node:fs"
import path from "node:path"
import { remark } from "remark"
import { visit } from "unist-util-visit"
import matter from "gray-matter"
import remarkFrontmatter from "remark-frontmatter"

export const resolveLinks = (filePath: string) => {
  let modified = false
  const markdown = fs.readFileSync(filePath, "utf-8")

  const imageSources: string[] = []

  const processor = remark()
    .use(remarkFrontmatter)
    .use(() => (tree) => {
      visit(tree, "link", (node) => {
        if (!node.url.startsWith("http") && !node.url.startsWith("kindle:")) {
          const linkUrl = decodeURI(node.url)

          const linkDestinationPath = path.resolve(
            `./src/content/second-brain/${linkUrl}`
          )

          if (
            fs.existsSync(linkDestinationPath) &&
            fs.lstatSync(linkDestinationPath).isFile()
          ) {
            try {
              const destFile = matter.read(linkDestinationPath)

              if (destFile?.data?.slug) {
                node.url = encodeURI(`/${destFile.data.slug}`)
                modified = true
              }
            } catch (e) {
              console.error(e)
            }
          } else {
            // Link is not valid (due to the file is not imported or not exists)
            ;(node as any).type = "text"
            ;(node as any).value = node.children
              .map((child) => (child as any).value)
              .join("")
            modified = true
          }
        }
      })
    })

  const result = processor.processSync(markdown)

  if (modified) {
    fs.writeFileSync(filePath, String(result), {
      encoding: "utf-8",
    })
  }

  return imageSources
}
