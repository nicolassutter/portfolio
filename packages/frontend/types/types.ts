import { z } from 'astro:content'

const maybeDate = z.string().datetime().optional()

export const articleSchema = z.object({
  title: z.string(),
  publishedAt: maybeDate,
  views: z.number().optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  lang: z.enum(['en', 'fr']),
  thumbnail: z.string(),
  url: z.string().optional(),
  id: z.union([z.number(), z.string()]),
  date_created: maybeDate,
  content: z.string().optional(),
  status: z.enum(['published', 'draft']).optional(),
  date_updated: maybeDate,
  order: z.number(),
})

export type Article = z.infer<typeof articleSchema>
