import Elysia, { t } from "elysia";
import { authentication } from "../authentication";
import { db } from "@/db/connection";
import { appointments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { UnauthorizedError } from "./errors/unauthorized-error";

export const makePaymentForAppointment = new Elysia().use(authentication).patch(
  "/appointments/:id/payment",
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

    if (["completed", "prepaid"].includes(appointment.status)) {
      set.status = 400;

      return { message: "Payment has already been made." };
    }

    const today = new Date()
    const isAppointmentInFuture = appointment.appointmentDate > today;

    await db
      .update(appointments)
      .set({
        status: isAppointmentInFuture ? "prepaid" : "completed",
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
