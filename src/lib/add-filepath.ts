import fs from "node:fs"
import path from "node:path"
import { remark } from "remark"
import { visit } from "unist-util-visit"
import matter from "gray-matter"
import remarkFrontmatter from "remark-frontmatter"

export const addFilepath = (filePath: string) => {
  let modified = false
  const markdown = fs.readFileSync(filePath, "utf-8")

  const processor = remark()
    .use(remarkFrontmatter)
    .use(() => (tree, file) => {
      visit(tree, "root", (node) => {
        visit(node, "yaml", (yamlNode) => {
          yamlNode.value += `\nfilepath: ${filePath}`
        })
      })
    })

  const result = processor.processSync(markdown)

  fs.writeFileSync(filePath, String(result), {
    encoding: "utf-8",
  })
}
