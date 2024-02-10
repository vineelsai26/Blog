import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import prisma from '../../../../prisma/prisma'


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
			if (user.email) {
				const userData = await prisma.users.findUnique({
					where: { email: user.email },
				})

				if (userData && userData.email === user.email) {
					if (!user.image) {
						return false
					}
					await prisma.users.update({
						where: { email: user.email },
						data: {
							githubToken: account?.access_token,
							profilePicture: user.image,
						},
					})

					return true
				} else {
					if (!user.email || !user.name || !user.image) {
						return false
					}

					const userData = await prisma.users.create({
						data: {
							email: user.email,
							profilePicture: user.image,
							name: user.name,
							githubToken: account?.access_token,
						},
						select: {
							id: true,
						},
					})
					if (userData && userData.id) {
						return true
					}
				}
			}

			return false
		},
	},
})

export { handler as GET, handler as POST }
