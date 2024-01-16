import Elysia, { t } from "elysia";
import { authentication } from "../authentication";
import { db } from "@/db/connection";
import { appointments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { UnauthorizedError } from "./errors/unauthorized-error";

export const completeAppointment = new Elysia().use(authentication).patch(
  "/appointments/:id/deliver",
  async ({ getRepresentedBusinessId, set, params }) => {
    const { id: appointmentId } = params;
    const businessId = await getRepresentedBusinessId();

    const appointment = await db.query.appointments.findFirst({
      where(fields, { eq, and }) {
        return and(
          eq(fields.id, appointmentId),
          eq(fields.businessId, businessId),
        );
      },
    });

    if (!appointment) {
      throw new UnauthorizedError();
    }

    const today = new Date();

    if (appointment.appointmentDate < today) {
      await db
        .update(appointments)
        .set({
          status: "awaiting_payment",
        })
        .where(eq(appointments.id, appointmentId));
      set.status = 402;

      return {
        message:
          "Client needs to make payment before appointment can be completed.",
      };
    }

    if (appointment.appointmentDate > today) {
      set.status = 400;

      return { message: "Appointment has not yet happened." };
    }

    await db
      .update(appointments)
      .set({
        status: "completed",
      })
      .where(eq(appointments.id, appointmentId));

    set.status = 204;
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  },
);
