import { z } from 'zod'

export const env = z
  .object({
    DATABASE_PATH: z
      .string()
      .refine(
        (str) => !str.includes('file:'),
        'DATABASE_PATH must not include "file:"',
      ),
    MINORO_DATABASE_PATH: z.string(),
    FRONTEND_URL: z.string(),
    PORT: z.coerce.number().optional().default(3000),
    ONE_TIME_ADMIN_TOKEN: z.string().optional(),
    ASSETS_DIR: z.string(),
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    DB_AUTH_TOKEN: z.string(),
  })
  .parse(process.env)
