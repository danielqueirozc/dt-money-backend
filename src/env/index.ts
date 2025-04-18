import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(4000),
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
    console.error('❌ Invalid environment variables', _env.error.format()) // format: e um metodo do zod que formata os erros
    throw new Error('Invalid environment variables')
}