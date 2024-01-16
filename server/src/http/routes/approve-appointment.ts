import Elysia, { t } from 'elysia'
import { authentication } from '../authentication'
import { db } from '@/db/connection'
import { appointments } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { UnauthorizedError } from './errors/unauthorized-error'

export const approveAppointment = new Elysia().use(authentication).patch(
  '/appointments/:id/approve',
  async ({ getRepresentedBusinessId, set, params }) => {
    const { id: appointmentId } = params
    const businessId = await getRepresentedBusinessId()

    const appointment = await db.query.appointments.findFirst({
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

    if (appointment.status !== 'booked') {
      set.status = 400

      return { message: 'Appointment has already been booked.' }
    }

    await db
      .update(appointments)
      .set({
        status: 'awaiting_payment',
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
