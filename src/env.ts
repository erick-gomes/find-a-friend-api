import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DB_URL: z.string().url(),
  JWT_SECRET: z.string(),
})

const { data, success, error } = envSchema.safeParse(process.env)
if (success === false) {
  try {
    throw new Error('Invalid environment variables')
  } catch (err) {
    console.error(err)
    console.error('Error details:', error.format())
    process.exit(1)
  }
}

export const env = data
