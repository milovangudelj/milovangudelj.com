import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/login", "/music-stats"],
		},
		sitemap: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/sitemap.xml`,
	};
}
