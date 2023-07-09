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
    filepath: z.string().optional(), // Added from add-filepath plugin
    tags: z.array(z.string().or(z.null())).optional(),
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
      .transform((val) => new Date(val)),
    updated: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    draft: z.boolean().optional(),
    filepath: z.string(), // Added from add-filepath plugin
    tags: z
      .array(
        z
          .string()
          .refine(
            (tag) => !/\s/.test(tag),
            (tag) => ({
              message: `Tag "${tag}" cannot include whitespaces`,
            })
          )
          .or(z.null())
      )
      .optional(),
  }),
})

export const collections = { blog, "second-brain": secondBrain }
