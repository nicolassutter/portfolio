import { drizzle } from 'drizzle-orm/sqlite-proxy'
import ky from 'ky'
import z from 'zod'
import * as schema from '@repo/database/schema'
import { DB_AUTH_TOKEN } from 'astro:env/server'
import { MINORO_URL } from 'astro:env/client'

export { schema }

export const db = drizzle(
  async (sql, params, method) => {
    try {
      const response = await ky
        .post(`${MINORO_URL}/api/db`, {
          json: {
            sql,
            params,
            method,
          },
          headers: {
            'X-Auth-Token': DB_AUTH_TOKEN,
          },
        })
        .json()

      const rows = z
        .object({
          result: z.array(z.unknown()),
        })
        .parse(response)

      return { rows: rows.result }
    } catch (e) {
      throw new Error(
        `Failed to execute query: ${sql} with params: ${JSON.stringify(params)}. Error: ${(e as Error).message}`,
      )
    }
  },
  {
    schema: schema,
  },
)
