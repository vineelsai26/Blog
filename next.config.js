/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	productionBrowserSourceMaps: true,
	images: {
		domains: ['skillicons.dev', 'vineelsai.com'],
		dangerouslyAllowSVG: true
	},
	experimental: {
		serverActions: true,
	},
	swcMinify: true,
}

export default nextConfig
