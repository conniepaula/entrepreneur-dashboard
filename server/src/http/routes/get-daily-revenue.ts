import Elysia, { t } from 'elysia'
import { authentication } from '../authentication'
import { and, count, eq, gte, lte, sql, sum } from 'drizzle-orm'
import dayjs from 'dayjs'
import { db } from '@/db/connection'
import { appointments } from '@/db/schema'

export const getDailyRevenue = new Elysia().use(authentication).get(
  '/metrics/daily-revenue',
  async ({ getRepresentedBusinessId, query, set }) => {
    const businessId = await getRepresentedBusinessId()

    const { from, to } = query

    const startDate = from ? dayjs(from) : dayjs().subtract(7, 'd')
    const endDate = to ? dayjs(to) : from ? startDate.add(7, 'days') : dayjs()

    if (endDate.diff(startDate, 'days') > 7) {
      set.status = 400

      return {
        code: 'INVALID_PERIOD',
        message: 'Start and end date must be within a seven day period.',
      }
    }

    const revenuePerDay = await db
      .select({
        date: sql<string>`TO_CHAR(${appointments.appointmentDate}, 'DD/MM')`,
        revenue: sum(appointments.totalInCents).mapWith(Number),
      })
      .from(appointments)
      .where(
        and(
          eq(appointments.businessId, businessId),
          gte(
            appointments.appointmentDate,
            startDate
              .startOf('day')
              .add(startDate.utcOffset(), 'minutes')
              .toDate(),
          ),
          lte(
            appointments.appointmentDate,
            endDate.endOf('day').add(endDate.utcOffset(), 'minutes').toDate(),
          ),
        ),
      )
      .groupBy(sql`TO_CHAR(${appointments.appointmentDate}, 'DD/MM')`)
      .having(({ revenue }) => gte(revenue, 1))

    const appointmentRevenuePerDay = revenuePerDay.sort((a, b) => {
      const [dayA, monthA] = a.date.split('/').map(Number)
      const [dayB, monthB] = b.date.split('/').map(Number)

      if (monthA === monthB) {
        return dayA - dayB
      } else {
        const dateA = new Date(2023, monthA - 1)
        const dateB = new Date(2023, monthB - 1)

        return dateA.getTime() - dateB.getTime()
      }
    })

    return appointmentRevenuePerDay
  },
  {
    query: t.Object({
      from: t.Optional(t.String()),
      to: t.Optional(t.String()),
    }),
  },
)
