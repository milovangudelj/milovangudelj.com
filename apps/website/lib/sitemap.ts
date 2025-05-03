import { client } from '@repo/sanity'
import { caseStudyPaths } from '@repo/sanity/queries'

const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL!;

export async function generateSiteMap() {
  const csUrls = await client.fetch<string[]>(
    caseStudyPaths,
    {},
    {
      next: {
        tags: ['caseStudy', 'project'],
      },
    }
  )

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
	<url>
		<loc>${baseUrl}/en</loc>
		<xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en"/>
		<xhtml:link rel="alternate" hreflang="it" href="${baseUrl}/it"/>
	</url>
	<url>
		<loc>${baseUrl}/en/about</loc>
		<xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/about"/>
		<xhtml:link rel="alternate" hreflang="it" href="${baseUrl}/it/about"/>
	</url>
	<url>
		<loc>${baseUrl}/en/work</loc>
		<xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/work"/>
		<xhtml:link rel="alternate" hreflang="it" href="${baseUrl}/it/work"/>
	</url>
	<url>
		<loc>${baseUrl}/en/portfolio</loc>
		<xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/portfolio"/>
		<xhtml:link rel="alternate" hreflang="it" href="${baseUrl}/it/portfolio"/>
	</url>
	<url>
		<loc>${baseUrl}/en/contact</loc>
		<xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/contact"/>
		<xhtml:link rel="alternate" hreflang="it" href="${baseUrl}/it/contact"/>
	</url>
	${csUrls
    .map((slug) => {
      return `<url>
		<loc>${baseUrl}/en/work/${slug}</loc>
		<xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/work/${slug}"/>
		<xhtml:link rel="alternate" hreflang="it" href="${baseUrl}/it/work/${slug}"/>
	</url>`
    })
    .join('')}
</urlset>
`
}
