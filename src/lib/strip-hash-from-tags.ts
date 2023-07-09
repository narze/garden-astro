import fs from "node:fs"
import { remark } from "remark"
import { visit } from "unist-util-visit"
import remarkFrontmatter from "remark-frontmatter"

export const stripHashFromTags = (filePath: string) => {
  const markdown = fs.readFileSync(filePath, "utf-8")

  const processor = remark()
    .use(remarkFrontmatter)
    .use(() => (tree, file) => {
      visit(tree, "root", (node) => {
        visit(node, "yaml", (yamlNode) => {
          const frontmatter = yamlNode.value.replace(
            /tags:\n((\s*-\s+)?#.+\n)+/g,
            (match) => {
              return match.replace(/#.+/g, (tag) => tag.slice(1))
            }
          )

          yamlNode.value = frontmatter
        })
      })
    })

  const result = processor.processSync(markdown)

  fs.writeFileSync(filePath, String(result), {
    encoding: "utf-8",
  })
}
