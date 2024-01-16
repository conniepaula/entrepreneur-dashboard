import Elysia from 'elysia'
import { authentication } from '../authentication'
import { and, count, eq, gte, sql } from 'drizzle-orm'
import dayjs from 'dayjs'
import { db } from '@/db/connection'
import { appointments } from '@/db/schema'

export const getCanceledAppointmentsInMonth = new Elysia()
  .use(authentication)
  .get(
    '/metrics/canceled-appointments-in-month',
    async ({ getRepresentedBusinessId }) => {
      const businessId = await getRepresentedBusinessId()

      const today = dayjs()
      const lastMonth = today.subtract(1, 'month')
      const startOfLastMonth = lastMonth.startOf('month')

      /**
       * January is ZERO, that's why we need to sum 1 to get the actual month
       */
      const lastMonthWithYear = lastMonth.format('YYYY-MM')
      const currentMonthWithYear = today.format('YYYY-MM')

      const appointmentsPerMonth = await db
        .select({
          monthWithYear: sql<string>`TO_CHAR(${appointments.appointmentDate}, 'YYYY-MM')`,
          amount: count(appointments.id),
        })
        .from(appointments)
        .where(
          and(
            eq(appointments.businessId, businessId),
            eq(appointments.status, 'canceled'),
            gte(appointments.appointmentDate, startOfLastMonth.toDate()),
          ),
        )
        .groupBy(sql`TO_CHAR(${appointments.appointmentDate}, 'YYYY-MM')`)
        .having(({ amount }) => gte(amount, 1))

      const appointmentAmountInCurrentMonth = appointmentsPerMonth.find((appointmentsInMonth) => {
        return appointmentsInMonth.monthWithYear === currentMonthWithYear
      })

      const appointmentAmountInPreviousMonth = appointmentsPerMonth.find((appointmentsInMonth) => {
        return appointmentsInMonth.monthWithYear === lastMonthWithYear
      })

      const diffFromLastMonth =
        appointmentAmountInPreviousMonth && appointmentAmountInCurrentMonth
          ? (appointmentAmountInCurrentMonth.amount * 100) /
            appointmentAmountInPreviousMonth.amount
          : null

      return {
        amount: appointmentAmountInCurrentMonth?.amount ?? 0,
        diffFromLastMonth: diffFromLastMonth
          ? Number((diffFromLastMonth - 100).toFixed(2))
          : 0,
      }
    },
  )
