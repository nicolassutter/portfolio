import {
  createDirectus,
  staticToken,
  rest,
  readItems,
  readSingleton,
  readItem,
} from '@directus/sdk'
import { DIRECTUS_PUBLIC_URL } from 'astro:env/client'
import { DIRECTUS_ADMIN_TOKEN } from 'astro:env/server'
import type { Merge } from 'type-fest'
import type { components } from '../types/directus.gen'
import { z } from 'zod'

console.log('DIRECTUS_PUBLIC_URL =', DIRECTUS_PUBLIC_URL)

type GetSchema<T extends keyof components['schemas']> = components['schemas'][T]

type Schema = {
  projects: Merge<
    GetSchema<'ItemsProjects'>,
    {
      technologies: string[]
    }
  >[]
  tech_stacks: Merge<
    GetSchema<'ItemsTechStacks'>,
    {
      categories: Record<string, string[]>
    }
  >[]
  profile: Merge<
    GetSchema<'ItemsProfile'>,
    {
      socials: {
        name: string
        url: string
        icon: string
      }[]
    }
  >
  post: GetSchema<'ItemsPost'>[]
  homelab_services: GetSchema<'ItemsHomelabServices'>[]
  homelab_data: GetSchema<'ItemsHomelabData'>
}

const directus = createDirectus<Schema>(DIRECTUS_PUBLIC_URL)
  .with(rest())
  .with(staticToken(DIRECTUS_ADMIN_TOKEN))

export async function getAllPosts(
  options: { perPage?: number; page?: number } = {},
) {
  const { page, perPage = 10 } = options
  const offset = page ? (page - 1) * perPage : 0

  const [posts, aggregation] = await Promise.all([
    // Get all posts with a filter for published status, pagination, and sorting
    directus.request(
      readItems('post', {
        filter: { status: { _eq: 'published' } },
        limit: perPage,
        offset,
        sort: ['-date_created'],
      }),
    ),

    // Get the total count of posts with a filter for published status
    // aggregate the total count of posts into an array of a single row which has a count property
    directus.request(
      readItems('post', {
        filter: { status: { _eq: 'published' } },
        aggregate: { count: '*' },
      }),
    ) as unknown as Promise<{ count: number }[]>,
  ])

  return {
    posts,
    total: aggregation[0]?.count ?? 0,
  }
}

export async function getLatestPosts() {
  const posts = await directus.request(
    readItems('post', {
      filter: { status: { _eq: 'published' } },
      limit: 3,
      sort: ['-date_created'],
    }),
  )
  return posts
}
export type Post = Awaited<ReturnType<typeof getLatestPosts>>[number]

export async function getPostById(id: string) {
  const post = await directus.request(readItem('post', id))
  return post
}

export async function getProfile() {
  const profile = await directus.request(readSingleton('profile'))
  return profile
}
export type Profile = Awaited<ReturnType<typeof getProfile>>

export async function getTechStacks() {
  const stacks = await directus.request(readItems('tech_stacks'))
  return stacks
}
export type TechStack = Awaited<ReturnType<typeof getTechStacks>>[number]

export async function getProjects() {
  const projects = await directus.request(readItems('projects'))
  return projects
}
export type Project = Awaited<ReturnType<typeof getProjects>>[number]

export async function getHomelabServices() {
  const services = await directus.request(
    readItems('homelab_services', {
      fields: ['*', 'category.name', 'category.icon'],
    }),
  )

  type Service = (typeof services)[number]

  const servicesByCategory: Record<
    string,
    {
      name: string
      icon: string
      services: Service[]
    }
  > = {}

  services.forEach((service) => {
    const category = service.category as null | { name: string; icon: string }
    const categoryName = category?.name || 'Uncategorized'

    if (!servicesByCategory[categoryName]) {
      servicesByCategory[categoryName] = {
        name: categoryName,
        icon: category?.icon ?? null,
        services: [],
      }
    }

    servicesByCategory[categoryName]?.services.push(service)
  })

  return servicesByCategory
}

export async function getHomelabData() {
  const HomelabLearningSchema = z
    .object({
      technicalSkills: z.array(
        z.object({
          text: z.string(),
        }),
      ),
      keyLessons: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      ),
      architecturePhases: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      ),
      biggestChallenges: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      ),
    })
    .or(z.null())

  const { learnings } = await directus.request(readSingleton('homelab_data'))

  return {
    learnings: HomelabLearningSchema.catch(null).parse(learnings),
  }
}
