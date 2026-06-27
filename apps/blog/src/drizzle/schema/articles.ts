import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const articles = sqliteTable('articles', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	url: text('url').unique().notNull(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	content: text('content').notNull(),
	imageUrl: text('imageUrl').notNull(),
	createdBy: text('createdBy').notNull(),
	createdAt: integer('createdAt', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updatedAt', { mode: 'timestamp' }).notNull(),
	private: integer('private', { mode: 'boolean' }).notNull(),
	tags: text('tags', { mode: 'json' }).$type<string[]>(),
})
