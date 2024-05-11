import type { Config } from 'drizzle-kit'

export default {
	dialect: 'sqlite',
	schema: 'src/drizzle/schema/*',
	out: '.drizzle',
	breakpoints: true,
	driver: 'turso',
	dbCredentials: {
		url: process.env.NEXT_TURSO_URL!,
		authToken: process.env.NEXT_TURSO_TOKEN!,
	},
} satisfies Config
