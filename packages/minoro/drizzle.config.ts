import { defineConfig } from 'drizzle-kit'
import { env } from './env'
import * as schema from './src/db/schema'
import { getTableName } from 'drizzle-orm'

const tables = Object.values(schema).map((table) => getTableName(table))

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: env.DATABASE_PATH,
  },
  tablesFilter: tables,
})
