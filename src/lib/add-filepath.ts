import fs from "node:fs"
import { remark } from "remark"
import { visit } from "unist-util-visit"
import remarkFrontmatter from "remark-frontmatter"

export const addFilepath = (filePath: string) => {
  const markdown = fs.readFileSync(filePath, "utf-8")

  const processor = remark()
    .use(remarkFrontmatter)
    .use(() => (tree, file) => {
      visit(tree, "root", (node) => {
        visit(node, "yaml", (yamlNode: any) => {
          // Only add if not already exists
          if (!yamlNode.value.includes("filepath:")) {
            yamlNode.value += `\nfilepath: ${filePath}`
          }
        })
      })
    })

  const result = processor.processSync(markdown)

  fs.writeFileSync(filePath, String(result), {
    encoding: "utf-8",
  })
}
