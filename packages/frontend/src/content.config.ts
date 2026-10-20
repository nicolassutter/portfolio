import { defineCollection, z } from 'astro:content'
import { file, glob } from 'astro/loaders'

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    excerpt: z.string(),
    dateCreated: z.coerce.date(),
    dateUpdated: z.coerce.date(),
    thumbnail: z.string(),
  }),
})

const profile = defineCollection({
  loader: glob({ base: './src/content/profile', pattern: '**/*.yaml' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    bio: z.string(),
    socials: z.array(
      z.object({ name: z.string(), url: z.string(), icon: z.string() }),
    ),
  }),
})

const techStacks = defineCollection({
  loader: file('./src/content/tech-stacks.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    emoji: z.string(),
    categories: z.record(z.string(), z.array(z.string())),
  }),
})

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.yaml' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    link: z.string().nullable(),
    technologies: z.array(z.string()),
    description: z.string(),
    thumbnail: z.string().nullable(),
    dateCreated: z.coerce.date().nullable(),
    dateUpdated: z.coerce.date(),
  }),
})

const homelabCategories = defineCollection({
  loader: file('./src/content/homelab-categories.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    icon: z.string(),
  }),
})

const homelabServices = defineCollection({
  loader: file('./src/content/homelab-services.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    why: z.string(),
    category: z.string(),
  }),
})

const homelabLearnings = defineCollection({
  loader: glob({
    base: './src/content/homelab-learnings',
    pattern: '**/*.yaml',
  }),
  schema: z.object({
    id: z.string(),
    learnings: z.object({
      technicalSkills: z.array(z.object({ text: z.string() })),
      keyLessons: z.array(
        z.object({ title: z.string(), description: z.string() }),
      ),
      architecturePhases: z.array(
        z.object({ title: z.string(), description: z.string() }),
      ),
      biggestChallenges: z.array(
        z.object({ title: z.string(), description: z.string() }),
      ),
    }),
  }),
})

export const collections = {
  posts,
  profile,
  techStacks,
  projects,
  homelabCategories,
  homelabServices,
  homelabLearnings,
}
