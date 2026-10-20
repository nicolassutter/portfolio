// Wipes and reseeds the local dev database (DATABASE_PATH) with generated fake data.
// Run: bun run seed   (from packages/minoro). Requires `bun run drizzle-push` first.
import { reset, seed } from 'drizzle-seed'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { readFile } from 'node:fs/promises'
import { env } from '../env'
import * as schema from '../src/db/schema'

const db = drizzle(env.DATABASE_PATH)
const samplePost = await readFile(
  new URL('./seed/sample-post.md', import.meta.url),
  'utf8',
)

await reset(db, schema)

await seed(db, schema, { count: 10 }).refine((f) => ({
  // singletons (profile also singleton, see below)
  // text-enum columns: random strings would break `status = 'published'` filters
  post: {
    count: 9,
    columns: {
      status: f.valuesFromArray({ values: ['draft', 'published'] }),
      title: f.loremIpsum({ sentencesCount: 1 }),
      excerpt: f.loremIpsum({ sentencesCount: 2 }),
      content: f.loremIpsum({ sentencesCount: 6 }),
    },
  },
  projects: {
    columns: {
      status: f.valuesFromArray({ values: ['draft', 'published'] }),
      title: f.loremIpsum({ sentencesCount: 1 }),
      description: f.loremIpsum({ sentencesCount: 2 }),
    },
  },
  // JSON columns: the generator can't infer their shapes (frontend expects
  // specific structures and zod-catches anything else to null)
  profile: {
    count: 1,
    columns: {
      name: f.fullName(),
      bio: f.loremIpsum({ sentencesCount: 3 }),
      socials: f.default({
        defaultValue: [
          { name: 'Github', url: 'https://github.com/example', icon: 'github' },
          { name: 'LinkedIn', url: 'https://linkedin.com/in/example', icon: 'linkedin' },
        ],
      }),
    },
  },
  techStacks: {
    columns: {
      name: f.companyName(),
      emoji: f.valuesFromArray({ values: ['⚡', '🌐', '☁️', '📱', '🛠️'] }),
      description: f.loremIpsum({ sentencesCount: 1 }),
      categories: f.default({
        defaultValue: { Frontend: ['React', 'Astro'], Backend: ['Bun', 'Hono'], Database: ['SQLite'] },
      }),
    },
  },
  homelabServices: {
    columns: {
      name: f.companyName(),
      description: f.loremIpsum({ sentencesCount: 1 }),
      why: f.loremIpsum({ sentencesCount: 1 }),
    },
  },
  homelabData: {
    count: 1,
    columns: {
      learnings: f.default({
        defaultValue: {
          technicalSkills: [{ text: 'Docker networking' }],
          keyLessons: [{ title: 'Boring tech wins', description: 'A VPS and a cron job beat a cluster.' }],
          architecturePhases: [{ title: 'One box', description: 'Everything on a single VPS.' }],
          biggestChallenges: [{ title: 'Cert renewals', description: 'Let Caddy do its job.' }],
        },
      }),
    },
  },
  homelabServicesCategories: {
    columns: {
      name: f.companyName(),
      description: f.loremIpsum({ sentencesCount: 1 }),
    },
  },
}))

await db.insert(schema.post).values({
  title: 'A seeded Markdown post',
  excerpt: 'A predictable Markdown fixture for local development.',
  content: samplePost,
  status: 'published',
  dateCreated: new Date(),
  dateUpdated: new Date(),
})

console.log(`✓ seeded ${env.DATABASE_PATH}`)

// guard against silent refine typos overriding singleton counts
for (const [t, sql] of [
  ['profile', 'select count(*) from profile'],
  ['homelabData', 'select count(*) from homelab_data'],
] as const) {
  const n = db.$client.query(sql).get() as { 'count(*)': number }
  if (n['count(*)'] !== 1) throw new Error(`seed check failed: ${t} should be a singleton`)
}
