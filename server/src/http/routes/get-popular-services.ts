import Elysia from 'elysia'
import { authentication } from '../authentication'
import { and, count, eq } from 'drizzle-orm'
import { db } from '@/db/connection'
import { appointmentDetails, appointments, services } from '@/db/schema'

export const getPopularServices = new Elysia()
  .use(authentication)
  .get('/metrics/popular-services', async ({ getRepresentedBusinessId }) => {
    const businessId = await getRepresentedBusinessId()

    try {
      const popularServices = await db
        .select({
          service: services.name,
          amount: count(appointmentDetails.id),
        })
        .from(appointmentDetails)
        .leftJoin(appointments, eq(appointments.id, appointmentDetails.appointmentId))
        .leftJoin(services, eq(services.id, appointmentDetails.serviceId))
        .where(and(eq(appointments.businessId, businessId)))
        .groupBy(services.name)
        .limit(5)

      return popularServices
    } catch (err) {
      console.log(err)
    }
  })
