/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
	app(input) {
		return {
			name: 'Blog',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws',
			providers: {
				aws: {
					region: 'ap-south-1',
					profile: 'prod',
				},
				// cloudflare: {
				// 	apiToken: process.env.CLOUDFLARE_API_TOKEN,
				// },
			},

		}
	},
	async run() {
		new sst.aws.Nextjs('Blog', {
			// domain: {
			// 	name: 'vineelsai.com',
			// 	dns: sst.cloudflare.dns(),
			// },
			environment: {
				NEXT_TURSO_URL: process.env.NEXT_TURSO_URL!,
				NEXT_TURSO_TOKEN: process.env.NEXT_TURSO_TOKEN!,
				NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
				GITHUB_ID: process.env.GITHUB_ID!,
				GITHUB_SECRET: process.env.GITHUB_SECRET!,
				NEXT_DISCORD_WEBHOOK: process.env.NEXT_DISCORD_WEBHOOK!,
				NEXT_STATIC_UPLOAD_AUTH_KEY:
					process.env.NEXT_STATIC_UPLOAD_AUTH_KEY!,
				NEXT_APP_URL: 'https://vineelsai.com',
			},
		})
	},
})
