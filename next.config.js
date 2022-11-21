/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["milovangudelj.com", "media.graphassets.com", "i.scdn.co"],
	},
};

module.exports = nextConfig
