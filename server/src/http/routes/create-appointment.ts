import { db } from "@/db/connection";
import { appointments } from "@/db/schema";
import Elysia, { t } from "elysia";
import { authentication } from "../authentication";
import { appointmentDetails } from "@/db/schema/appointment-details";

export const createAppointment = new Elysia().use(authentication).post(
  "/businesses/:businessId/appointments",
  async ({ params, body, getCurrentUser, set }) => {
    const { sub: clientId } = await getCurrentUser();
    const { businessId } = params;
    const { appointmentDetails: details, appointmentDate } = body;

    const servicesIds = details.map((detail) => detail.serviceId);

    const services = await db.query.services.findMany({
      where(fields, { eq, and, inArray }) {
        return and(
          eq(fields.businessId, businessId),
          inArray(fields.id, servicesIds),
        );
      },
    });

    const appointmentServices = details.map((detail) => {
      const service = services.find(
        (service) => service.id === detail.serviceId,
      );

      if (!service) {
        throw new Error("Services required are not provided by this business.");
      }

      return {
        serviceId: detail.serviceId,
        unitPriceInCents: service.priceInCents,
        quantity: detail.quantity,
        subtotalInCents: detail.quantity * service.priceInCents,
      };
    });

    const totalInCents = appointmentServices.reduce(
      (total, appointmentDetail) => {
        return total + appointmentDetail.subtotalInCents;
      },
      0,
    );

    await db.transaction(async (tx) => {
      const [appointment] = await tx
        .insert(appointments)
        .values({
          totalInCents,
          clientId: clientId,
          businessId,
          appointmentDate,
        })
        .returning({
          id: appointments.id,
        });

      await tx.insert(appointmentDetails).values(
        appointmentServices.map((appointmentService) => {
          return {
            appointmentId: appointment.id,
            serviceId: appointmentService.serviceId,
            priceInCents: appointmentService.unitPriceInCents,
            quantity: appointmentService.quantity,
          };
        }),
      );
    });

    set.status = 201;
  },
  {
    body: t.Object({
      appointmentDetails: t.Array(
        t.Object({
          serviceId: t.String(),
          quantity: t.Integer(),
        }),
      ),
      appointmentDate: t.Date(),
    }),
    params: t.Object({
      businessId: t.String(),
    }),
  },
);
