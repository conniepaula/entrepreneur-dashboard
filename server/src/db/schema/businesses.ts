import { createId } from '@paralleldrive/cuid2'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './users'
import { appointments, services } from '.'

export const businesses = pgTable('businesses', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  representativeId: text('representative_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const businessesRelations = relations(businesses, ({ one, many }) => ({
  representative: one(users, {
    fields: [businesses.representativeId],
    references: [users.id],
    relationName: 'businessRepresentative',
  }),
  appointments: many(appointments),
  services: many(services),
}))
