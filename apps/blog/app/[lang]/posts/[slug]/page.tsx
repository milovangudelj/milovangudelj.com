import { Metadata, Viewport } from 'next'

import { Section, Container } from '@repo/ui'
import { type Locale } from '@repo/i18n'
import { getPostBySlug, getPostPaths } from '@repo/sanity/fetch'
import { urlForImage } from '@repo/sanity/image'

import { toPlainText } from '~/utils/toPlainText'

export async function generateStaticParams() {
  const posts = await getPostPaths()

  return posts.map((post) => ({ slug: post }))
}

export const viewport: Viewport = {
  themeColor: '#FFC700',
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
