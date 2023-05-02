/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	productionBrowserSourceMaps: true,
	images: {
		domains: ['skillicons.dev', 'vineelsai.com', 's3.us-west-2.amazonaws.com'],
		dangerouslyAllowSVG: true
	},
	experimental: {
		appDir: true,
	},
	swcMinify: true,
}

export default nextConfig
