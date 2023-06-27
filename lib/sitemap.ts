import { getCaseStudyPaths } from "~/sanity/lib/client";

export async function generateSiteMap() {
	const csUrls = await getCaseStudyPaths();

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
	<url>
		<loc>https://www.milovangudelj.com/en</loc>
		<xhtml:link rel="alternate" hreflang="en" href="https://www.milovangudelj.com/en"/>
		<xhtml:link rel="alternate" hreflang="it" href="https://www.milovangudelj.com/it"/>
	</url>
	<url>
		<loc>https://www.milovangudelj.com/en/about</loc>
		<xhtml:link rel="alternate" hreflang="en" href="https://www.milovangudelj.com/en/about"/>
		<xhtml:link rel="alternate" hreflang="it" href="https://www.milovangudelj.com/it/about"/>
	</url>
	<url>
		<loc>https://www.milovangudelj.com/en/work</loc>
		<xhtml:link rel="alternate" hreflang="en" href="https://www.milovangudelj.com/en/work"/>
		<xhtml:link rel="alternate" hreflang="it" href="https://www.milovangudelj.com/it/work"/>
	</url>
	<url>
		<loc>https://www.milovangudelj.com/en/portfolio</loc>
		<xhtml:link rel="alternate" hreflang="en" href="https://www.milovangudelj.com/en/portfolio"/>
		<xhtml:link rel="alternate" hreflang="it" href="https://www.milovangudelj.com/it/portfolio"/>
	</url>
	<url>
		<loc>https://www.milovangudelj.com/en/contact</loc>
		<xhtml:link rel="alternate" hreflang="en" href="https://www.milovangudelj.com/en/contact"/>
		<xhtml:link rel="alternate" hreflang="it" href="https://www.milovangudelj.com/it/contact"/>
	</url>
	${csUrls
		.map((slug) => {
			return `<url>
		<loc>${`https://www.milovangudelj.com/en/work/${slug}`}</loc>
		<xhtml:link rel="alternate" hreflang="en" href="${`https://www.milovangudelj.com/en/work/${slug}`}"/>
		<xhtml:link rel="alternate" hreflang="it" href="${`https://www.milovangudelj.com/it/work/${slug}`}"/>
	</url>`;
		})
		.join("")}
</urlset>
`;
}
