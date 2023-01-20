/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	productionBrowserSourceMaps: true,
	images: {
		domains: ['skillicons.dev'],
		dangerouslyAllowSVG: true,
	},
}

module.exports = nextConfig
