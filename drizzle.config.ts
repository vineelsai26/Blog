import type { Config } from 'drizzle-kit'

export default {
	dialect: 'turso',
	schema: 'src/drizzle/schema/*',
	out: '.drizzle',
	breakpoints: true,
	dbCredentials: {
		url: process.env.NEXT_TURSO_URL!,
		authToken: process.env.NEXT_TURSO_TOKEN!,
	},
} satisfies Config
