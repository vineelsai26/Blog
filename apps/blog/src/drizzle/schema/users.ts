import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	// Legacy, unused nullable columns retained only to avoid a destructive
	// migration on the existing table. They are never written by the current
	// OAuth flow; do not start populating them without a security review.
	password: text('password'),
	profilePicture: text('profilePicture').notNull(),
	githubToken: text('githubToken'),
	role: text('role').notNull().default('user'),
})
