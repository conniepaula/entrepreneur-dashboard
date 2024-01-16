import Elysia from 'elysia'
import { authentication } from '../authentication'
import { and, count, eq, gte, sql } from 'drizzle-orm'
import dayjs from 'dayjs'
import { db } from '@/db/connection'
import { appointments } from '@/db/schema'

export const getAppointmentAmountThisMonth = new Elysia()
  .use(authentication)
  .get('/metrics/appointment-amount-month', async ({ getRepresentedBusinessId }) => {
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
          gte(appointments.appointmentDate, startOfLastMonth.toDate()),
        ),
      )
      .groupBy(sql`TO_CHAR(${appointments.appointmentDate}, 'YYYY-MM')`)
      .having(({ amount }) => gte(amount, 1))

    const appointmentAmountThisMonth = appointmentsPerMonth.find((appointmentsInMonth) => {
      return appointmentsInMonth.monthWithYear === currentMonthWithYear
    })

    const appointmentAmountLastMonth = appointmentsPerMonth.find((appointmentsInMonth) => {
      return appointmentsInMonth.monthWithYear === lastMonthWithYear
    })

    const diffFromLastMonth =
      appointmentAmountLastMonth && appointmentAmountThisMonth
        ? (appointmentAmountThisMonth.amount * 100) / appointmentAmountLastMonth.amount
        : null

    return {
      amount: appointmentAmountThisMonth?.amount ?? 0,
      diffFromLastMonth: diffFromLastMonth
        ? Number((diffFromLastMonth - 100).toFixed(2))
        : 0,
    }
  })
