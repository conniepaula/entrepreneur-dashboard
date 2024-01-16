import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { pgTable, integer, text, timestamp } from 'drizzle-orm/pg-core'
import { businesses, users } from '.'

export const evaluations = pgTable('evaluations', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  clientId: text('client_id').references(() => users.id),
  businessId: text('business_id').references(() => users.id),
  rate: integer('rate').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const evaluationsRelations = relations(evaluations, ({ one }) => ({
  client: one(users, {
    fields: [evaluations.clientId],
    references: [users.id],
  }),
  business: one(businesses, {
    fields: [evaluations.businessId],
    references: [businesses.id],
  }),
}))
