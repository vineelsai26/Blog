/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	productionBrowserSourceMaps: true,
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
	optimizeFonts: true,
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
		],
		dangerouslyAllowSVG: true,
	},
	swcMinify: true,
}

export default nextConfig
