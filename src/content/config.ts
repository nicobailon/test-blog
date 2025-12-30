import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDatetime: z.coerce.date(),
    modDatetime: z.coerce.date().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional()
  })
})

export const collections = { posts }
