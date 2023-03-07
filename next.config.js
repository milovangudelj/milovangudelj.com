/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
		typedRoutes: true,
	},
	swcMinify: true,
	images: {
		domains: ["milovangudelj.com", "media.graphassets.com", "i.scdn.co"],
	},
};

module.exports = nextConfig
