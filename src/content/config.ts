import { defineCollection, z } from "astro:content"

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),
    draft: z.boolean().optional(),
  }),
})

// Format from narze/second-brain
// title: "{{title}}"
// created: {{date:YYYY-MM-DD}} {{time:HH:mm}}
// date: {{date:YYYY-MM-DD}}
// draft: true
const secondBrain = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val))
      .optional(),
    created: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val))
      .optional(),
    draft: z.boolean().optional(),
  }),
})

export const collections = { blog, secondBrain }
