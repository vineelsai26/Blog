import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as articles from './schema/articles'
import * as users from './schema/users'

const client = createClient({
	url: process.env.NEXT_TURSO_URL!,
	authToken: process.env.NEXT_TURSO_TOKEN!,
})

const db = drizzle(client, { schema: { ...articles, ...users } })

export default db
