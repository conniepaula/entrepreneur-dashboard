import Elysia, { Static, t } from 'elysia'
import { authentication } from '../authentication'
import { db } from '@/db/connection'
import { services } from '@/db/schema'
import { and, eq, inArray } from 'drizzle-orm'

const serviceSchema = t.Object({
  id: t.Optional(t.String()),
  name: t.String(),
  description: t.Optional(t.String()),
  price: t.Number({ minimum: 0 }),
})

export const updateServicesProvided = new Elysia().use(authentication).put(
  '/services-provided',
  async ({ getRepresentedBusinessId, set, body }) => {
    const businessId = await getRepresentedBusinessId()

    const {
      services: { deletedServiceIds, newOrUpdatedServices },
    } = body

    if (deletedServiceIds.length > 0) {
      await db
        .delete(services)
        .where(
          and(
            inArray(services.id, deletedServiceIds),
            eq(services.businessId, businessId),
          ),
        )
    }

    type Service = Static<typeof serviceSchema>
    type ServiceWithId = Required<Service>
    type ServiceWithoutId = Omit<Service, 'id'>

    const updatedServices = newOrUpdatedServices.filter(
      (service): service is ServiceWithId => {
        return !!service.id
      },
    )

    if (updatedServices.length > 0) {
      await Promise.all(
        updatedServices.map((service) => {
          return db
            .update(services)
            .set({
              name: service.name,
              description: service.description,
              priceInCents: service.price * 100,
            })
            .where(
              and(
                eq(services.id, service.id),
                eq(services.businessId, businessId),
              ),
            )
        }),
      )
    }

    const newServices = newOrUpdatedServices.filter(
      (service): service is ServiceWithoutId => {
        return !service.id
      },
    )

    if (newServices.length) {
      await db.insert(services).values(
        newServices.map((service) => {
          return {
            name: service.name,
            description: service.description,
            priceInCents: service.price * 100,
            businessId: businessId,
          }
        }),
      )
    }

    set.status = 204
  },
  {
    body: t.Object({
      services: t.Object({
        newOrUpdatedServices: t.Array(serviceSchema),
        deletedServiceIds: t.Array(t.String()),
      }),
    }),
  },
)
