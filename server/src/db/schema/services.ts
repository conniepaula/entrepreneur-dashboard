import { createId } from '@paralleldrive/cuid2'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { businesses } from '.'
import { appointmentDetails } from './appointment-details'

export const services = pgTable('services', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  priceInCents: integer('price_in_cents').notNull(),
  businessId: text('business_id')
    .references(() => businesses.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const servicesRelations = relations(services, ({ one, many }) => ({
  business: one(businesses, {
    fields: [services.businessId],
    references: [businesses.id],
    relationName: 'serviceBusiness',
  }),
  appointmentDetails: many(appointmentDetails),
}))
