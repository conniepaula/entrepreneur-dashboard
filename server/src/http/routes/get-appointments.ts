import Elysia, { t } from "elysia";
import { appointments, users } from "@/db/schema";
import { db } from "@/db/connection";
import { eq, and, ilike, desc, count, sql } from "drizzle-orm";
import { createSelectSchema } from "drizzle-typebox";
import { authentication } from "../authentication";

export const getAppointments = new Elysia().use(authentication).get(
  "/appointments",
  async ({ query, getCurrentUser, set }) => {
    const { pageIndex, appointmentId, clientName, status } = query;
    const { businessId } = await getCurrentUser();

    if (!businessId) {
      set.status = 401;

      throw new Error("User is not a business representative.");
    }

    const baseQuery = db
      .select({
        appointmentId: appointments.id,
        createdAt: appointments.createdAt,
        status: appointments.status,
        clientName: users.name,
        total: appointments.totalInCents,
      })
      .from(appointments)
      .innerJoin(users, eq(users.id, appointments.clientId))
      .where(
        and(
          eq(appointments.businessId, businessId),
          appointmentId
            ? ilike(appointments.id, `%${appointmentId}%`)
            : undefined,
          status ? eq(appointments.status, status) : undefined,
          clientName ? ilike(users.name, `%${clientName}%`) : undefined,
        ),
      );

    const [appointmentsCount] = await db
      .select({ count: count() })
      .from(baseQuery.as("baseQuery"));

    const allAppointments = await baseQuery
      .offset(pageIndex * 10)
      .limit(10)
      .orderBy((fields) => {
        return [
          sql`CASE ${fields.status} 
          WHEN 'booked' THEN 1
          WHEN 'prepaid' THEN 2
          WHEN 'awaiting_payment' THEN 3
          WHEN 'completed' THEN 4
          WHEN 'canceled' THEN 99
          END`,
          desc(fields.createdAt),
        ];
      });

    const result = {
      appointments: allAppointments,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: appointmentsCount.count,
      },
    };

    return result;
  },
  {
    query: t.Object({
      clientName: t.Optional(t.String()),
      appointmentId: t.Optional(t.String()),
      status: t.Optional(createSelectSchema(appointments).properties.status),
      pageIndex: t.Numeric({ minimum: 0 }),
    }),
  },
);
