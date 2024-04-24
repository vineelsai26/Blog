import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password'),
	profilePicture: text('profilePicture').notNull(),
	githubToken: text('githubToken'),
	role: text('role').notNull().default('user'),
})
