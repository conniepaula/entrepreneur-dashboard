import Elysia from 'elysia'
import { authentication } from '../authentication'
import { db } from '@/db/connection'

export const getRepresentedBusiness = new Elysia()
  .use(authentication)
  .get('/represented-business', async ({ getRepresentedBusinessId }) => {
    const businessId = await getRepresentedBusinessId()

    const business = await db.query.businesses.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, businessId)
      },
    })

    if (!business) {
      throw new Error('Business not found.')
    }

    return business
  })
