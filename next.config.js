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
						value: 'nosniff'
					}
				]
			}
		]
	},
	optimizeFonts: true,
	images: {
		domains: [
			'icons.vineelsai.com',
			'vineelsai.com',
			'static.vineelsai.com',
		],
		dangerouslyAllowSVG: true
	},
	swcMinify: true,
}

export default nextConfig
