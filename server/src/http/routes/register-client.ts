import { users } from '@/db/schema'
import { db } from '@/db/connection'
import Elysia from 'elysia'
import { z } from 'zod'

const registerClientBodySchema = z.object({
  name: z.string().min(1),
  phone: z.string(),
  email: z.string().email(),
})

export const registerClient = new Elysia().post(
  '/clients',
  async ({ body, set }) => {
    const { name, phone, email } = registerClientBodySchema.parse(body)

    await db.insert(users).values({
      name,
      email,
      phone,
    })

    set.status = 401
  },
)
