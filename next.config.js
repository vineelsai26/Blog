/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	productionBrowserSourceMaps: true,
	images: {
		domains: [
			'skillicons.dev', 
			'vineelsai.com',
			'static.vineelsai.com',
		],
		dangerouslyAllowSVG: true
	},
	swcMinify: true,
}

export default nextConfig
