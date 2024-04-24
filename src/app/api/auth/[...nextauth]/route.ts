import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import db from '../../../../drizzle/db'
import {users} from '../../../../drizzle/schema/users'
import { eq } from 'drizzle-orm'


const handler = NextAuth({
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
			authorization: {
				params: {
					scope: 'read:user user:email repo',
				},
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			if (user && user.email) {
				const userData = await db.query.users.findFirst({
                    where: eq(users.email, user.email)
                })

				if (userData && userData.email === user.email) {
					if (!user.image) {
						return false
					}

                    await db
						.update(users)
						.set({
							githubToken: account?.access_token,
							profilePicture: user.image,
						})
						.where(eq(users.email, user.email))

					return true
				} else {
					if (!user.email || !user.name || !user.image) {
						return false
					}

                    const userData = await db.insert(users).values({
                        email: user.email,
                        profilePicture: user.image,
                        name: user.name,
                        githubToken: account?.access_token,
                    }).returning({
                        id: users.id,
                    })

					if (userData[0] && userData[0].id) {
						return true
					}
				}
			}

			return false
		},
	},
})

export { handler as GET, handler as POST }
