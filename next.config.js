const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src 'self';
  style-src 'self';
  font-src 'self';
  img-src 'self' https://i.scdn.co https://cdn.sanity.io;
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "Content-Security-Policy",
						value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
					},
				],
			},
		];
	},
	experimental: {
		appDir: true,
	},
	swcMinify: true,
	images: {
		deviceSizes: [640, 750, 828, 1080, 1200, 1366, 1920, 2048, 3840],
		domains: ["milovangudelj.com", "i.scdn.co", "cdn.sanity.io"],
	},
};

module.exports = { ...nextConfig };
