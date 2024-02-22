import { defineCollection, z } from 'astro:content'
import { articleSchema } from '../../types/types'

export const collections = {
  projects: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      link: z.string().optional(),
      stack: z.array(z.string()).optional(),
    }),
  }),
  skills: defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      subtitle: z.string(),
      icon: z.string().optional(),
    }),
  }),
  posts: defineCollection({
    type: 'content',
    schema: articleSchema,
  }),
}
