import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { appointments, services } from ".";
import { createId } from "@paralleldrive/cuid2";

export const appointmentDetails = pgTable('appointment_details', {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  appointmentId: text("appointment_id")
    .notNull()
    .references(() => appointments.id, {
      onDelete: "cascade",
    }),
  serviceId: text("service_id").references(() => services.id, {
    onDelete: "set null",
  }),
  quantity: integer("quantity").default(1),
  priceInCents: integer("price_in_cents").notNull(),
});

export const appointmentDetailsRelations = relations(appointmentDetails, ({ one }) => ({
  appointment: one(appointments, {
    fields: [appointmentDetails.appointmentId],
    references: [appointments.id],
  }),
  service: one(services, {
    fields: [appointmentDetails.serviceId],
    references: [services.id],
  }),
}));
