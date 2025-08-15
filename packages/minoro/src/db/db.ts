import { drizzle } from 'drizzle-orm/bun-sqlite'
import { env } from '../../env'
import * as schema from './schema'

export { schema }
export const db = drizzle(env.DATABASE_PATH, { schema })
