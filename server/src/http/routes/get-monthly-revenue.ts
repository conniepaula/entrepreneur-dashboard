import Elysia from 'elysia'
import { authentication } from '../authentication'
import { and, eq, gte, sql, sum } from 'drizzle-orm'
import dayjs from 'dayjs'
import { db } from '@/db/connection'
import { appointments } from '@/db/schema'

export const getMonthlyRevenue = new Elysia()
  .use(authentication)
  .get('/metrics/month-', async ({ getRepresentedBusinessId }) => {
    const businessId = await getRepresentedBusinessId()

    const today = dayjs()
    const lastMonth = today.subtract(1, 'month')
    const startOfLastMonth = lastMonth.startOf('month')

    /**
     * January is ZERO, that's why we need to sum 1 to get the actual month
     */
    const lastMonthWithYear = lastMonth.format('YYYY-MM')
    const currentMonthWithYear = today.format('YYYY-MM')

    const monthlyRevenue = await db
      .select({
        monthWithYear: sql<string>`TO_CHAR(${appointments.appointmentDate}, 'YYYY-MM')`,
        revenue: sum(appointments.totalInCents).mapWith(Number),
      })
      .from(appointments)
      .where(
        and(
          eq(appointments.businessId, businessId),
          gte(appointments.appointmentDate, startOfLastMonth.toDate()),
        ),
      )
      .groupBy(sql`TO_CHAR(${appointments.appointmentDate}, 'YYYY-MM')`)
      .having(({ revenue }) => gte(revenue, 1))

    const revenueThisMonth = monthlyRevenue.find((revenueThisMonth) => {
      return revenueThisMonth.monthWithYear === currentMonthWithYear
    })

    const revenueLastMonth = monthlyRevenue.find((revenueLastMonth) => {
      return revenueLastMonth.monthWithYear === lastMonthWithYear
    })

    const diffFromLastMonth =
      revenueLastMonth && revenueThisMonth
        ? (revenueThisMonth.revenue * 100) / revenueLastMonth.revenue
        : null

    return {
      revenue: revenueThisMonth?.revenue ?? 0,
      diffFromLastMonth: diffFromLastMonth
        ? Number((diffFromLastMonth - 100).toFixed(2))
        : 0,
    }
  })
