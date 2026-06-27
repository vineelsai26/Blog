/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	reactStrictMode: true,
	productionBrowserSourceMaps: false,
	headers: async () => {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
				],
			},
		]
	},
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'icons.vineelsai.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'vineelsai.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'static.vineelsai.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				pathname: '/**',
			},
		],
		dangerouslyAllowSVG: true,
	},
}

export default nextConfig
