import { remark } from "remark"
import { visit } from "unist-util-visit"

export const extractImageSources = (filePath) => {
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
