/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
	},
	swcMinify: true,
	images: {
		deviceSizes: [640, 750, 828, 1080, 1200, 1366, 1920, 2048, 3840],
		domains: ["milovangudelj.com", "i.scdn.co", "cdn.sanity.io"],
	},
};

module.exports = nextConfig;
