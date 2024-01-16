import Elysia from 'elysia'
import { authentication } from '../authentication'
import { and, count, eq, gte, sql } from 'drizzle-orm'
import dayjs from 'dayjs'
import { db } from '@/db/connection'
import { appointments } from '@/db/schema'

export const getAppointmentAmountToday = new Elysia()
  .use(authentication)
  .get('/metrics/appointment-amount-today', async ({ getRepresentedBusinessId }) => {
    const businessId = await getRepresentedBusinessId()

    const today = dayjs()
    const yesterday = today.subtract(1, 'day')
    const startOfYesterday = yesterday.startOf('day')

    /**
     * January is ZERO, so we need to sum 1 to get the actual month
     */
    const yesterdayWithMonthAndYear = yesterday.format('YYYY-MM-DD')
    const todayWithMonthAndYear = today.format('YYYY-MM-DD')

    const appointmentsPerDay = await db
      .select({
        dayWithMonthAndYear: sql<string>`TO_CHAR(${appointments.appointmentDate}, 'YYYY-MM-DD')`,
        amount: count(appointments.id),
      })
      .from(appointments)
      .where(
        and(
          eq(appointments.businessId, businessId),
          gte(appointments.appointmentDate, startOfYesterday.toDate()),
        ),
      )
      .groupBy(sql`TO_CHAR(${appointments.appointmentDate}, 'YYYY-MM-DD')`)
      .having(({ amount }) => gte(amount, 1))

    const appointmentAmountToday = appointmentsPerDay.find((appointmentsInDay) => {
      return appointmentsInDay.dayWithMonthAndYear === todayWithMonthAndYear
    })

    const appointmentAmountYesterday = appointmentsPerDay.find((appointmentsInDay) => {
      return appointmentsInDay.dayWithMonthAndYear === yesterdayWithMonthAndYear
    })

    const diffFromYesterday =
      appointmentAmountYesterday && appointmentAmountToday
        ? (appointmentAmountToday.amount * 100) / appointmentAmountYesterday.amount
        : null

    return {
      amount: appointmentAmountToday?.amount ?? 0,
      diffFromYesterday: diffFromYesterday
        ? Number((diffFromYesterday - 100).toFixed(2))
        : 0,
    }
  })
