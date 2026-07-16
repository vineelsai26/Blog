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
		// SVG optimization is required for the icon assets served from
		// icons.vineelsai.com, but a script-bearing SVG on an allowlisted
		// host must not be able to execute. Force downloads instead of
		// inline rendering and apply a strict CSP that blocks scripts.
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'none'; script-src 'none'; sandbox;",
	},
}

export default nextConfig
