import { getPostPaths } from '@repo/sanity/fetch'

export async function generateSiteMap() {
  const postUrls = await getPostPaths()

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
	<url>
		<loc>https://blog.milovangudelj.com/en</loc>
		<xhtml:link rel="alternate" hreflang="en" href="https://blog.milovangudelj.com/en"/>
		<xhtml:link rel="alternate" hreflang="it" href="https://blog.milovangudelj.com/it"/>
	</url>
	<url>
		<loc>https://blog.milovangudelj.com/en/posts</loc>
		<xhtml:link rel="alternate" hreflang="en" href="https://blog.milovangudelj.com/en/posts"/>
		<xhtml:link rel="alternate" hreflang="it" href="https://blog.milovangudelj.com/it/posts"/>
	</url>
	<url>
		<loc>https://blog.milovangudelj.com/en/guestbook</loc>
		<xhtml:link rel="alternate" hreflang="en" href="https://blog.milovangudelj.com/en/guestbook"/>
		<xhtml:link rel="alternate" hreflang="it" href="https://blog.milovangudelj.com/it/guestbook"/>
	</url>
	${postUrls
    .map((slug) => {
      return `<url>
		<loc>${`https://blog.milovangudelj.com/en/posts/${slug}`}</loc>
		<xhtml:link rel="alternate" hreflang="en" href="${`https://blog.milovangudelj.com/en/posts/${slug}`}"/>
		<xhtml:link rel="alternate" hreflang="it" href="${`https://blog.milovangudelj.com/it/posts/${slug}`}"/>
	</url>`
    })
    .join('')}
</urlset>
`
}
