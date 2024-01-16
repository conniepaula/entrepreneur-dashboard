import { createId } from '@paralleldrive/cuid2'
import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { businesses, users } from '.'
import { appointmentDetails } from './appointment-details'

export const appointmentStatusEnum = pgEnum('appointment_status', [
  'booked',
  'prepaid',
  'canceled',
  'awaiting_payment',
  'completed',
])

export const appointments = pgTable('appointments', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  clientId: text('client_id')
    .references(() => users.id, {
      onDelete: 'set null',
    })
    .notNull(),
  businessId: text('business_id')
    .references(() => businesses.id, {
      onDelete: 'set null',
    })
    .notNull(),
  status: appointmentStatusEnum('status').default('booked').notNull(),
  totalInCents: integer('total_in_cents').notNull(),
  appointmentDate: timestamp('appointment_date').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const appointmentsRelations = relations(appointments, ({ one, many }) => ({
  client: one(users, {
    fields: [appointments.clientId],
    references: [users.id],
  }),
  business: one(businesses, {
    fields: [appointments.businessId],
    references: [businesses.id],
  }),
  appointmentDetails: many(appointmentDetails),
}))
