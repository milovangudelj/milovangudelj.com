import { Metadata } from 'next'

import { Container } from '~/components/Container'
import { Section } from '~/components/Section'

import { Locale } from '~/i18n.config'
import { getPostBySlug, getPostPaths } from '~/sanity/lib/client'
import { urlForImage } from '~/sanity/lib/image'
import { toPlainText } from '~/utils/toPlainText'

export async function generateStaticParams() {
  const posts = await getPostPaths()

  return posts.map((post) => ({ slug: post }))
}

export async function generateMetadata({
  params: { slug, lang },
}: {
  params: { slug: string; lang: Locale }
}): Promise<Metadata> {
  const { title, intro, cover } = await getPostBySlug({ slug, lang })

  return {
    title: `${title} | Milovan Gudelj`,
    description: toPlainText(intro),
    alternates: {
      canonical: `https://blog.milovangudelj.com/en/posts/${slug}`,
      languages: {
        'it-IT': `https://blog.milovangudelj.com/it/posts/${slug}`,
      },
    },
    themeColor: '#FFC700',
    openGraph: {
      images: {
        url: urlForImage(cover.image).url(),
        width: cover.width,
        height: cover.height,
      },
    },
  }
}

export default async function PostPage({
  params: { slug, lang },
}: {
  params: { slug: string; lang: Locale }
}) {
  const { title } = await getPostBySlug({ slug, lang })

  return (
    <Section>
      <Container>
        <h1>{title}</h1>
      </Container>
    </Section>
  )
}
