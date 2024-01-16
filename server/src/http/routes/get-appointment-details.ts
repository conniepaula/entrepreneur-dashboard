import Elysia, { t } from 'elysia'
import { authentication } from '../authentication'
import { db } from '@/db/connection'
import { UnauthorizedError } from './errors/unauthorized-error'
import { NotARepresentativeError } from './errors/not-a-representative-error'

export const getAppointmentDetails = new Elysia().use(authentication).get(
  '/appointments/:id',
  async ({ getCurrentUser, params }) => {
    const { id: appointmentId } = params
    const { businessId } = await getCurrentUser()

    if (!businessId) {
      throw new NotARepresentativeError()
    }

    const appointment = await db.query.appointments.findFirst({
      columns: {
        id: true,
        createdAt: true,
        appointmentDate: true,
        status: true,
        totalInCents: true,
      },
      with: {
        client: {
          columns: {
            name: true,
            phone: true,
            email: true,
          },
        },
        appointmentDetails: {
          columns: {
            id: true,
            priceInCents: true,
            quantity: true,
          },
          with: {
            service: {
              columns: {
                name: true,
              },
            },
          },
        },
      },
      where(fields, { eq, and }) {
        return and(
          eq(fields.id, appointmentId),
          eq(fields.businessId, businessId),
        )
      },
    })

    if (!appointment) {
      throw new UnauthorizedError()
    }

    return appointment
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  },
)
