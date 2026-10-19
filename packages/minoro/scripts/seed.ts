// Seeds the local dev database (DATABASE_PATH) with fake-but-realistic data.
// Run: bun run seed   (from packages/minoro). Requires `bun run drizzle-push` first.
import { count } from 'drizzle-orm'
import { db, schema } from '../src/db/db'
import { env } from '../env'

const daysAgo = (n: number) => new Date(Date.now() - n * 24 * 60 * 60 * 1000)

const stack = (
  name: string,
  emoji: string,
  description: string,
  categories: Record<string, string[]>,
) => ({ name, emoji, description, categories })

const post = (
  title: string,
  excerpt: string,
  content: string,
  date: Date,
  status: 'draft' | 'published' = 'published',
) => ({ title, excerpt, content, dateCreated: date, dateUpdated: date, status })

const project = (
  title: string,
  link: string,
  description: string,
  technologies: string[],
  date: Date,
  status: 'draft' | 'published' = 'published',
) => ({ title, link, description, technologies, dateCreated: date, dateUpdated: date, status })

const category = (name: string, description: string, icon: string) => ({ name, description, icon })

const service = (name: string, description: string, why: string, categoryId: string) => ({
  name,
  description,
  why,
  category: categoryId,
})

const categories = [
  category('Networking', 'Reverse proxies, VPNs and DNS', 'network'),
  category('Media', 'Self-hosted media and storage', 'clapperboard'),
  category('Automation', 'CI/CD, backups and monitoring', 'workflow'),
]

const services = [
  service('Caddy', 'Reverse proxy with automatic HTTPS', 'Zero-config TLS certificates for every service.', categories[0]!.id),
  service('Tailscale', 'Mesh VPN to reach the lab from anywhere', 'Private access without exposing ports to the internet.', categories[0]!.id),
  service('Jellyfin', 'Media server for movies and series', 'Own your media library, skip the subscriptions.', categories[1]!.id),
  service('Immich', 'Self-hosted photo backup', 'Google Photos without Google.', categories[1]!.id),
  service('Uptime Kuma', 'Service monitoring and status page', 'Know before the family does when something is down.', categories[2]!.id),
]

await db.delete(schema.homelabServices)
await db.delete(schema.homelabServicesCategories)
await db.delete(schema.homelabData)
await db.delete(schema.post)
await db.delete(schema.projects)
await db.delete(schema.techStacks)
await db.delete(schema.profile)

await db.insert(schema.profile).values({
  bio: `Hi, I'm **Nicolas**, a software engineer who likes building things end to end — from the PostgreSQL schema to the homelab it runs on.\n\nWhen I'm not writing TypeScript, I'm probably tinkering with my self-hosted stack or going for a run.`,
  email: 'nicolas@example.com',
  name: 'Nicolas Sutter',
  socials: [
    { name: 'Github', url: 'https://github.com/sutter-nicolas', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nicolas-sutter', icon: 'linkedin' },
    { name: 'RSS', url: 'https://sutter-nicolas.com/rss.xml', icon: 'rss' },
  ],
})

await db.insert(schema.techStacks).values([
  stack('Web Applications', '🌐', 'Full-stack apps from database to deployment', {
    Frontend: ['React', 'Astro', 'Tailwind CSS', 'Vue'],
    Backend: ['Node.js', 'Bun', 'tRPC'],
    Database: ['PostgreSQL', 'Drizzle ORM', 'SQLite'],
    Deployment: ['Docker', 'Coolify'],
    Testing: ['Vitest', 'Playwright'],
  }),
  stack('API Development', '⚡', 'Typed, documented and versioned APIs', {
    Backend: ['Hono', 'Fastify', 'Zod'],
    Database: ['Redis', 'PostgreSQL'],
    Testing: ['Vitest'],
  }),
  stack('Cloud Infrastructure', '☁️', 'Infrastructure as code on a budget', {
    Deployment: ['Terraform', 'Hetzner', 'Cloudflare'],
    Monitoring: ['Grafana', 'Prometheus', 'Uptime Kuma'],
  }),
])

await db.insert(schema.post).values([
  post(
    'Securing My Homelab: A Caddy and Tailscale Story',
    'How I locked down my home services without giving up convenience.',
    `# The problem\n\nEvery service I self-host used to be another open port...\n\n## The fix\n\nCaddy in front of everything, Tailscale for anything private.`,
    daysAgo(7),
  ),
  post(
    'How I Self-Host My Critical Services on a Hetzner VPS',
    'A practical tour of a small but mighty server setup.',
    `# One VPS to rule them all\n\nA €5 server runs more than you would expect...`,
    daysAgo(14),
  ),
  post(
    'The Quest for Typesafe APIs',
    'From REST clients with hope-based typing to end-to-end type safety.',
    `# Types all the way down\n\nSharing types between server and client changed everything...`,
    daysAgo(30),
  ),
  post(
    'Backups You Actually Restore',
    'Untested backups are Schrödinger backups. Here is my restore-first routine.',
    `# Trust, but restore\n\nA backup that has never been restored is a hypothesis...`,
    daysAgo(60),
    'draft',
  ),
])

await db.insert(schema.projects).values([
  project(
    'Portfolio CMS',
    'https://github.com/sutter-nicolas/portfolio',
    'This very website: an Astro frontend on a small headless CMS, self-hosted.',
    ['Astro', 'Bun', 'SQLite', 'Drizzle ORM'],
    daysAgo(21),
  ),
  project(
    'Homelab Dashboard',
    'https://github.com/sutter-nicolas/homelab-dashboard',
    'Single glance at every service, its status and its uptime.',
    ['React', 'Hono', 'Grafana'],
    daysAgo(45),
  ),
  project(
    'Recipe CLI',
    'https://github.com/sutter-nicolas/recipe-cli',
    'Terminal recipe manager that scales ingredients for the actual number of guests.',
    ['TypeScript', 'Bun'],
    daysAgo(90),
  ),
  project(
    'Secret Side Project',
    'https://github.com/sutter-nicolas/secret',
    'Shipped soon, described here later.',
    ['Rust'],
    daysAgo(3),
    'draft',
  ),
])

await db.insert(schema.homelabServicesCategories).values(categories)
await db.insert(schema.homelabServices).values(services)

await db.insert(schema.homelabData).values({
  learnings: {
    technicalSkills: [
      { text: 'Reverse proxying and TLS with Caddy' },
      { text: 'Docker networking without pulling your hair out' },
      { text: 'Backup strategies that survive a dead SD card' },
    ],
    keyLessons: [
      { title: 'Boring tech wins', description: 'A plain VPS and a bash script beat a Kubernetes cluster for a homelab.' },
      { title: 'Automate or skip it', description: 'If a maintenance task needs a runbook, it needs a cron job instead.' },
    ],
    architecturePhases: [
      { title: 'Phase 1: One box', description: 'Everything on a single VPS, ports closed, Caddy in front.' },
      { title: 'Phase 2: Segmentation', description: 'Split public services from private ones with Tailscale.' },
    ],
    biggestChallenges: [
      { title: 'Certificate renewals', description: 'Solved itself once I stopped fighting Caddy and let it do its job.' },
    ],
  },
})

// self-check: every table got its rows back
const expected: Record<string, number> = {
  profile: 1,
  techStacks: 3,
  post: 4,
  projects: 4,
  homelabServicesCategories: 3,
  homelabServices: 5,
  homelabData: 1,
}
for (const [table, n] of Object.entries(expected)) {
  const [{ c }] = await db
    .select({ c: count() })
    .from(schema[table as keyof typeof schema])
  if (c !== n) throw new Error(`seed check failed: ${table} has ${c} rows, expected ${n}`)
}

console.log(`✓ seeded ${env.DATABASE_PATH}`)
