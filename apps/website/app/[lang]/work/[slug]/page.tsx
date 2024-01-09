import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

import { Locale } from '~/i18n.config'
import { getCaseStudyBySlug, getCaseStudyPaths } from '~/sanity/client'
import { urlForImage } from '~/sanity/image'
import { Container } from '~/components/Container'
import { CTA } from '~/components/sections/CTA'

export async function generateStaticParams() {
  const caseStudies = await getCaseStudyPaths()

  return caseStudies.map((caseStudy) => ({ slug: caseStudy }))
}

export async function generateViewport({
  params: { slug, lang },
}: {
  params: { slug: string; lang: Locale }
}): Promise<Metadata> {
  const { color } = await getCaseStudyBySlug({
    slug,
    lang,
  })

  return {
    themeColor: color,
  }
}

export async function generateMetadata({
  params: { slug, lang },
}: {
  params: { slug: string; lang: Locale }
}): Promise<Metadata> {
  const { title, subtitle, cover } = await getCaseStudyBySlug({
    slug,
    lang,
  })

  return {
    title: `${title} | Milovan Gudelj`,
    description: subtitle,
    alternates: {
      canonical: `https://www.milovangudelj.com/en/work/${slug}`,
      languages: {
        'it-IT': `https://www.milovangudelj.com/it/work/${slug}`,
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

const ProjectPage = async ({
  params: { slug, lang },
}: {
  params: { slug: string; lang: Locale }
}) => {
  const { title, subtitle, intro, cover, body } = await getCaseStudyBySlug({ slug, lang })

  return (
    <>
      <Container as="main" className="relative max-xl:px-8">
        <header className="pb-16 max-xl:px-0 max-xl:pt-32 xl:p-32 xl:pb-16">
          <div className="text-button mb-8 flex items-center space-x-3">
            <Link href={`/${lang}/work`} className="text-white/70 transition hover:text-white">
              ← Go Back
            </Link>
            <span className="inline-block h-6 w-px bg-white/[0.06]"></span>
            <h1 className="text-yellow">{title}</h1>
          </div>
          <span className="text-h1-mobile 2xl:text-h1 mb-16 block">{subtitle}</span>
          <PortableText
            value={intro!}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="text-sub-heading-mobile 2xl:text-sub-heading mb-8 text-white last:mb-0">
                    {children}
                  </p>
                ),
              },
            }}
          />
          <figure className="relative mt-32 xl:-mx-32">
            <Image
              src={urlForImage(cover.image).url()}
              alt={cover.image.alt ?? cover.image.caption}
              title={cover.image.alt}
              quality={100}
              sizes="1280px"
              placeholder={'blur'}
              blurDataURL={cover.lqip}
              priority
              className="w-full rounded-lg object-cover max-xl:aspect-video max-xl:max-h-[300px] xl:h-[400px] xl:rounded-2xl"
              width={cover.width}
              height={cover.height}
            />
            <figcaption className="text-label-md pt-1 text-white/40 xl:pl-32">
              {cover.image.caption ?? cover.image.alt ?? ''}
            </figcaption>
          </figure>
        </header>
        <div className="pt-0 max-xl:pb-32 xl:p-32 xl:pt-0">
          <PortableText
            value={body}
            components={{
              types: {
                image: ({ value }) => {
                  return (
                    <figure className="relative my-32 xl:-mx-32">
                      <Image
                        src={value.asset.url}
                        alt={value.alt ?? value.caption ?? ''}
                        title={value.alt ?? value.caption ?? ''}
                        quality={100}
                        sizes="1280px"
                        className="w-full rounded-lg object-cover max-xl:aspect-video max-xl:max-h-[300px] xl:h-[400px] xl:rounded-2xl"
                        width={value.asset.metadata.dimensions.width}
                        height={value.asset.metadata.dimensions.height}
                        placeholder="blur"
                        blurDataURL={value.asset.metadata.lqip}
                      />
                      <figcaption className="text-label-md pt-1 text-white/40 xl:pl-32">
                        {cover.image.caption ?? cover.image.alt ?? ''}
                      </figcaption>
                    </figure>
                  )
                },
              },
              marks: {
                // Ex. 1: custom renderer for the em / italics decorator
                strong: ({ children }) => (
                  <span className="text-sub-heading-mobile text-yellow mb-8 inline-block last:mb-0">
                    {children}
                  </span>
                ),

                // Ex. 2: rendering a custom `link` annotation
                link: ({ value, children }) => {
                  const target = (value?.href || '').match(/^https?:\/\/|^\/\//i)
                    ? '_blank'
                    : undefined
                  if (target === '_blank')
                    return (
                      <a
                        href={value?.href}
                        target={target}
                        rel={target === '_blank' ? 'noindex nofollow noreferrer' : ''}
                      >
                        {children}
                      </a>
                    )

                  return <Link href={value?.href ?? ''}>{children}</Link>
                },
              },
              block: {
                normal: ({ children }) => (
                  <p className="mb-8 text-white/70 last:mb-0">{children}</p>
                ),
                h1: ({ children }) => (
                  <h1 className="text-h1-mobile 2xl:text-h1 mb-16 last:mb-0">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-h2-mobile 2xl:text-h2 mb-16 last:mb-0">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-h3-mobile 2xl:text-h3 mb-16 last:mb-0">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-h4-mobile 2xl:text-h4 mb-16 last:mb-0">{children}</h4>
                ),
                h5: ({ children }) => (
                  <h5 className="text-h5-mobile 2xl:text-h5 mb-16 last:mb-0">{children}</h5>
                ),
                h6: ({ children }) => (
                  <h6 className="text-h6-mobile 2xl:text-h6 mb-16 last:mb-0">{children}</h6>
                ),
              },
            }}
          />
        </div>
      </Container>
      <CTA lang={lang} className="first-of-type:border-solid" />
    </>
  )
}

export default ProjectPage
