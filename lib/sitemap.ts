export async function generateSiteMap() {
	const csUrls = await(
		await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL!}/api/getCSUrls`)
	).json() as string[];

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
	<url>
		<loc>https://www.milovangudelj.com</loc>
		<xhtml:link rel="alternate" hreflang="en" href="https://www.milovangudelj.com"/>
		<xhtml:link rel="alternate" hreflang="it" href="https://www.milovangudelj.com/it"/>
	</url>
	<url>
		<loc>https://www.milovangudelj.com/about</loc>
		<xhtml:link rel="alternate" hreflang="en" href="https://www.milovangudelj.com/about"/>
		<xhtml:link rel="alternate" hreflang="it" href="https://www.milovangudelj.com/it/about"/>
	</url>
	<url>
		<loc>https://www.milovangudelj.com/work</loc>
		<xhtml:link rel="alternate" hreflang="en" href="https://www.milovangudelj.com/work"/>
		<xhtml:link rel="alternate" hreflang="it" href="https://www.milovangudelj.com/it/work"/>
	</url>
	<url>
		<loc>https://www.milovangudelj.com/portfolio</loc>
		<xhtml:link rel="alternate" hreflang="en" href="https://www.milovangudelj.com/portfolio"/>
		<xhtml:link rel="alternate" hreflang="it" href="https://www.milovangudelj.com/it/portfolio"/>
	</url>
	<url>
		<loc>https://www.milovangudelj.com/contact</loc>
		<xhtml:link rel="alternate" hreflang="en" href="https://www.milovangudelj.com/contact"/>
		<xhtml:link rel="alternate" hreflang="it" href="https://www.milovangudelj.com/it/contact"/>
	</url>
	<url>
		<loc>https://www.milovangudelj.com/login</loc>
		<xhtml:link rel="alternate" hreflang="en" href="https://www.milovangudelj.com/login"/>
		<xhtml:link rel="alternate" hreflang="it" href="https://www.milovangudelj.com/it/login"/>
	</url>
	<url>
		<loc>https://www.milovangudelj.com/music-stats</loc>
		<xhtml:link rel="alternate" hreflang="en" href="https://www.milovangudelj.com/music-stats"/>
		<xhtml:link rel="alternate" hreflang="it" href="https://www.milovangudelj.com/it/music-stats"/>
	</url>
	${csUrls
		.map((slug) => {
			return `<url>
		<loc>${`https://www.milovangudelj.com/work/${slug}`}</loc>
		<xhtml:link rel="alternate" hreflang="en" href="${`https://www.milovangudelj.com/work/${slug}`}"/>
		<xhtml:link rel="alternate" hreflang="it" href="${`https://www.milovangudelj.com/it/work/${slug}`}"/>
	</url>`;
		})
		.join("")}
</urlset>
`;
}
