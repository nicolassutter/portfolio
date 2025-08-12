import { createCms } from 'minoro'
import { views as postsViews } from './views/posts'
import { env } from './env'
import { views as projectsViews } from './views/projects'
import { views as homelabViews } from './views/homelab'
import { views as assetsViews } from './views/assets'
import { views as profileViews } from './views/profile'
import { db } from './src/db/db'
import { z } from 'zod'

// create the db if it does not exist
const dbFile = Bun.file(env.MINORO_DATABASE_PATH)
const dbExists = await dbFile.exists()

if (!dbExists) {
  await Bun.write(dbFile, '')
  console.log(`Database file created at ${env.MINORO_DATABASE_PATH}`)
}

const minoro = createCms({
  views: [
    ...postsViews,
    ...projectsViews,
    ...homelabViews,
    ...assetsViews,
    ...profileViews,
  ],
  allowedOrigins: [env.FRONTEND_URL],
  ONE_TIME_ADMIN_TOKEN: env.ONE_TIME_ADMIN_TOKEN,
  async setup() {
    return {
      database: {
        type: 'sqlite',
        connection: `file:${env.MINORO_DATABASE_PATH}`,
      },
    }
  },
})

/**
 * Extend the http server to query the database directly.
 */
minoro._app.post('/api/db', async (c) => {
  // check for auth token
  const reqToken = c.req.header('X-Auth-Token')

  if (reqToken !== env.DB_AUTH_TOKEN) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const bodySchema = z.object({
    sql: z.string(),
    params: z.array(z.any()),
    method: z.enum(['run', 'all', 'values', 'get']),
  })

  const json = await c.req.json()

  try {
    const { sql, params, method } = bodySchema.parse(json)

    // prevent multiple queries
    const sqlBody = sql.replace(/;/g, '')

    const query = db.$client.query(sqlBody)

    if (method === 'run') {
      query.run(...params)
      return c.json(undefined)
    }

    const result: unknown[][] = query.values(...params)

    if (method === 'get') {
      return c.json({ result: result[0] })
    }

    return c.json({ result })
  } catch (e) {
    return c.json({ error: e }, 500)
  }
})

await minoro.ready
await minoro.serveStaticUi()
await minoro.serveStaticDirectory(env.ASSETS_DIR, '/assets')

Bun.serve({ fetch: minoro.fetch, port: env.PORT })
