import { z } from 'zod'
import { db, schema } from './db'
import { asc, count, eq } from 'drizzle-orm'

export async function getAllPosts(
  options: { perPage?: number; page?: number } = {},
) {
  const { page, perPage = 10 } = options
  const offset = page ? (page - 1) * perPage : 0

  const posts = await db.query.post.findMany({
    where: (t, { eq }) => eq(t.status, 'published'),
    orderBy: (t, { desc }) => [desc(t.dateCreated)],
    limit: perPage,
    offset,
  })

  const aggregation = await db
    .select({
      count: count(),
    })
    .from(schema.post)
    .where(eq(schema.post.status, 'published'))

  return {
    posts,
    total: aggregation[0]?.count ?? 0,
  }
}

export async function getLatestPosts() {
  return db.query.post.findMany({
    where: (t, { eq }) => eq(t.status, 'published'),
    orderBy: (t, { desc }) => [desc(t.dateCreated)],
    limit: 3,
  })
}
export type Post = Awaited<ReturnType<typeof getLatestPosts>>[number]

export async function getPostById(id: string) {
  return db.query.post.findFirst({
    where: (t, { eq }) => eq(t.id, id),
  })
}

export async function getProfile() {
  return db.query.profile.findFirst()
}
export type Profile = Awaited<ReturnType<typeof getProfile>>

export async function getTechStacks() {
  return db.query.techStacks.findMany()
}
export type TechStack = Awaited<ReturnType<typeof getTechStacks>>[number]

export async function getProjects() {
  return db.query.projects.findMany()
}
export type Project = Awaited<ReturnType<typeof getProjects>>[number]

export async function getHomelabServices() {
  const services = (
    await db
      .select()
      .from(schema.homelabServices)
      .orderBy(asc(schema.homelabServices.name))
      .leftJoin(
        schema.homelabServicesCategories,
        eq(
          schema.homelabServices.category,
          schema.homelabServicesCategories.id,
        ),
      )
  ).map(
    ({ homelab_services: service, homelab_services_categories: category }) => {
      return {
        ...service,
        category: {
          name: category?.name ?? null,
          icon: category?.icon ?? null,
        },
      }
    },
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
        icon: category?.icon ?? '',
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

  const { learnings } = (await db.query.homelabData.findFirst())!

  return {
    learnings: HomelabLearningSchema.catch(null).parse(learnings),
  }
}
