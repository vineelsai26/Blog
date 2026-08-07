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
	// Workspace packages such as @vstack/ai are consumed as TypeScript source
	// and use Node-style ".js" specifiers for their relative imports, which is
	// what their NodeNext consumers require. Turbopack maps those back to the
	// ".ts" sources on its own; the webpack builder used by `next build
	// --webpack` needs the mapping spelled out.
	webpack: (config) => {
		config.resolve.extensionAlias = {
			...config.resolve.extensionAlias,
			'.js': ['.ts', '.tsx', '.js'],
		}
		return config
	},
}

export default nextConfig
