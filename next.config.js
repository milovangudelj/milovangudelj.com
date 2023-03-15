const withNextIntl = require("next-intl/plugin")(
	// This is the default (also the `src` folder is supported out of the box)
	"./lib/i18n.ts"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
	},
	swcMinify: true,
	images: {
		domains: ["milovangudelj.com", "media.graphassets.com", "i.scdn.co"],
	},
};

module.exports = withNextIntl({ ...nextConfig });
