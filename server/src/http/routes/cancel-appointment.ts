import Elysia, { t } from 'elysia'
import { authentication } from '../authentication'
import { db } from '@/db/connection'
import { appointments } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const cancelAppointment = new Elysia().use(authentication).patch(
  '/appointments/:id/cancel',
  async ({ getCurrentUser, set, params }) => {
    const { id: appointmentId } = params
    const { businessId } = await getCurrentUser()

    if (!businessId) {
      set.status = 401

      throw new Error('User is not a business representative.')
    }

    const appointment = await db.query.appointments.findFirst({
      where(fields, { eq, and }) {
        return and(
          eq(fields.id, appointmentId),
          eq(fields.businessId, businessId),
        )
      },
    })

    if (!appointment) {
      set.status = 401

      throw new Error('Appointment not found under the represented business.')
    }

    if (!['completed', 'awaiting_payment'].includes(appointment.status)) {
      set.status = 400

      return {
        code: 'STATUS_NOT_VALID',
        message: 'Appointment cannot be cancelled after it has been attended.',
      }
    }

    await db
      .update(appointments)
      .set({
        status: 'canceled',
      })
      .where(eq(appointments.id, appointmentId))

    set.status = 204
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  },
)
