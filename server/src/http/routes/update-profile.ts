import Elysia, { t } from 'elysia'
import { authentication } from '../authentication'
import { db } from '@/db/connection'
import { businesses } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const updateProfile = new Elysia().use(authentication).put(
  '/profile',
  async ({ getRepresentedBusinessId, set, body }) => {
    const businessId = await getRepresentedBusinessId()
    const { name, description } = body

    await db
      .update(businesses)
      .set({
        name,
        description,
      })
      .where(eq(businesses.id, businessId))

    set.status = 204
  },
  {
    body: t.Object({
      name: t.String(),
      description: t.Optional(t.String()),
    }),
  },
)
