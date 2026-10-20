import { getCollection } from 'astro:content'

export async function getAllPosts() {
  return (await getCollection('posts'))
    .map((post) => ({ ...post.data, content: post.body }))
    .sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime())
}

export type Post = Awaited<ReturnType<typeof getAllPosts>>[number]

export async function getProfile() {
  const profile = (await getCollection('profile'))[0]
  if (!profile) throw new Error('Profile content is required')
  return profile.data
}

export type Profile = Awaited<ReturnType<typeof getProfile>>

export async function getTechStacks() {
  return (await getCollection('techStacks')).map((stack) => stack.data)
}

export type TechStack = Awaited<ReturnType<typeof getTechStacks>>[number]

export async function getProjects() {
  return (await getCollection('projects')).map((project) => project.data)
}

export type Project = Awaited<ReturnType<typeof getProjects>>[number]

export async function getHomelabServices() {
  const categories = new Map(
    (await getCollection('homelabCategories')).map((category) => [
      category.data.id,
      category.data,
    ]),
  )
  const services = (await getCollection('homelabServices'))
    .map((service) => service.data)
    .sort((a, b) => a.name.localeCompare(b.name))

  return services.reduce<
    Record<string, { icon: string; services: typeof services }>
  >((grouped, service) => {
    const category = categories.get(service.category)
    const name = category?.name ?? 'Uncategorized'
    const group = (grouped[name] ??= {
      icon: category?.icon ?? '',
      services: [],
    })
    group.services.push(service)
    return grouped
  }, {})
}

export async function getHomelabData() {
  return {
    learnings: (await getCollection('homelabLearnings'))[0]?.data.learnings,
  }
}
