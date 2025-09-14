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
    tags: z
      .array(z.any())
      .default([])
      .nullable()
      .transform((arr) => (arr ? arr.map((item) => String(item)) : [])),
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
      .or(z.date())
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    no_feed: z.boolean().optional(),
    draft: z.boolean().optional(),
    unlisted: z.boolean().optional(),
    filepath: z.string(), // Added from add-filepath plugin
    tags: z
      .array(z.any())
      .nullable()
      .default([])
      .transform((arr) => (arr ? arr.map((item) => String(item).trim()) : []))
      .refine(
        (arr) =>
          arr.every(
            (item) =>
              z
                .string()
                .refine((value) => !/\s/.test(value), {
                  message: "String must not contain whitespaces",
                })
                .safeParse(item).success
          ),
        {
          message: "Array elements must not contain whitespaces",
        }
      ),
  }),
})

export const collections = { blog, "second-brain": secondBrain }
