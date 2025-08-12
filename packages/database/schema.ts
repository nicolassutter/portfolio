import { sqliteTable, numeric, integer, text } from 'drizzle-orm/sqlite-core'

const uuid = () =>
  text({ length: 36 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID())

// singleton
export const profile = sqliteTable('profile', {
  id: uuid(),
  bio: text(),
  email: text({ length: 255 }),
  socials: text({ mode: 'json' }).$type<Record<string, unknown>[]>(),
  name: text({ length: 255 }),
})

export const techStacks = sqliteTable('tech_stacks', {
  id: uuid(),
  name: text({ length: 255 }),
  description: text(),
  emoji: text({ length: 255 }),
  categories: text({ mode: 'json' }).$type<Record<string, string[]>>(),
})

export const post = sqliteTable('post', {
  id: uuid(),
  status: text({ length: 255, enum: ['draft', 'published'] })
    .default('draft')
    .notNull(),
  dateCreated: integer('date_created', { mode: 'timestamp' }),
  dateUpdated: integer('date_updated', { mode: 'timestamp' }),
  content: text(),
  title: text({ length: 255 }),
  excerpt: text(),
  // asset id/path on disk
  thumbnail: text({ length: 255 }),
})

export const projects = sqliteTable('projects', {
  id: uuid(),
  status: text({ length: 255, enum: ['draft', 'published'] })
    .default('draft')
    .notNull(),
  dateCreated: integer('date_created', { mode: 'timestamp' }),
  dateUpdated: integer('date_updated', { mode: 'timestamp' }),
  title: text({ length: 255 }),
  link: text({ length: 255 }),
  technologies: text({ mode: 'json' }).$type<string[]>(),
  description: text(),
  // asset id/path on disk
  thumbnail: text({ length: 255 }),
})

export const homelabServices = sqliteTable('homelab_services', {
  id: uuid(),
  name: text({ length: 255 }),
  description: text(),
  why: text(),
  category: numeric().references(() => homelabServicesCategories.id, {
    onDelete: 'set null',
  }),
})

// singleton
export const homelabData = sqliteTable('homelab_data', {
  id: uuid(),
  learnings: text({ mode: 'json' }).$type<Record<string, unknown>>(),
})

export const homelabServicesCategories = sqliteTable(
  'homelab_services_categories',
  {
    id: uuid(),
    name: text({ length: 255 }),
    description: text(),
    icon: text({ length: 255 }),
  },
)
