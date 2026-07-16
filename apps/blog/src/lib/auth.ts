import type { NextAuthOptions, Session } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import db from '../drizzle/db'
import { users } from '../drizzle/schema/users'
import { eq } from 'drizzle-orm'

// The single account permitted to perform mutations across the app.
export const ADMIN_EMAIL = 'mail@vineelsai.com'

// Sign-in is restricted to an explicit allowlist so arbitrary GitHub
// accounts cannot create rows in the primary users table. The admin is
// always allowed; additional emails may be provisioned via env.
const allowedSignInEmails = new Set(
	[ADMIN_EMAIL, ...(process.env.NEXT_ALLOWED_EMAILS?.split(',') ?? [])]
		.map((email) => email.trim().toLowerCase())
		.filter(Boolean)
)

export function isAdmin(session: Session | null | undefined): boolean {
	return session?.user?.email === ADMIN_EMAIL
}

// Canonical NextAuth configuration. Exported so every getServerSession()
// call site can pass the same options; without this, a future session/jwt
// callback or strategy change would silently return sessions missing the
// fields the admin gate relies on.
export const authOptions: NextAuthOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
			authorization: {
				params: {
					scope: 'read:user user:email',
				},
			},
		}),
	],
	callbacks: {
		async signIn({ user }) {
			if (!user || !user.email) {
				return false
			}

			if (!allowedSignInEmails.has(user.email.toLowerCase())) {
				return false
			}

			const userData = await db.query.users.findFirst({
				where: eq(users.email, user.email),
			})

			if (userData && userData.email === user.email) {
				if (!user.image) {
					return false
				}

				await db
					.update(users)
					.set({
						profilePicture: user.image,
					})
					.where(eq(users.email, user.email))

				return true
			}

			if (!user.name || !user.image) {
				return false
			}

			const inserted = await db
				.insert(users)
				.values({
					email: user.email,
					profilePicture: user.image,
					name: user.name,
				})
				.returning({
					id: users.id,
				})

			return Boolean(inserted[0]?.id)
		},
	},
}
