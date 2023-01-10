/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
	  domains: ['skillicons.dev'],
	  dangerouslyAllowSVG: true,
  },
}

module.exports = nextConfig
