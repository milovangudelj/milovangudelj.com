import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

import { Container } from '@repo/ui'
import { getDictionary, type Locale } from '@repo/i18n'
import { getData } from '@repo/sanity/fetch'
import { urlForImage } from '@repo/sanity/image'
import { CaseStudyPayload, caseStudyBySlugQuery, caseStudyPaths } from '@repo/sanity/queries'
import { client } from '@repo/sanity'

import { CTA } from '~/components/cta'

export const dynamicParams = false
export async function generateStaticParams() {
  return (
    await client.fetch<string[]>(
      caseStudyPaths,
      {},
      {
        next: {
          tags: ['caseStudy', 'project'],
        },
      }
    )
  ).map((path) => ({ slug: path }))
}

export async function generateViewport({
  params: { slug, lang },
}: {
  params: { slug: string; lang: Locale }
}): Promise<Metadata> {
  const { color } = await getData<CaseStudyPayload>(
    caseStudyBySlugQuery,
    {
      slug,
      lang,
    },
    ['caseStudy', 'project']
  )

  return {
    themeColor: color,
  }
}

export async function generateMetadata({
  params: { slug, lang },
}: {
  params: { slug: string; lang: Locale }
}): Promise<Metadata> {
  const { title, subtitle, cover } = await getData<CaseStudyPayload>(
    caseStudyBySlugQuery,
    {
      slug,
      lang,
    },
    ['caseStudy', 'project']
  )

  return {
    title: { absolute: `${title} | Milovan Gudelj` },
    description: subtitle,
    alternates: {
      canonical: `https://www.milovangudelj.com/en/work/${slug}`,
      languages: {
        'it-IT': `https://www.milovangudelj.com/it/work/${slug}`,
      },
    },
    openGraph: {
      title: { absolute: `${title} | Milovan Gudelj` },
      description: subtitle,
      siteName: 'Milovan Gudelj',
      images: [
        {
          url: urlForImage(cover.image).width(1200).height(630).fit('crop').url(),
          width: 1200,
          height: 630,
        },
      ],
      locale: lang,
      type: 'website',
    },
  }
}

const ProjectPage = async ({
  params: { slug, lang },
}: {
  params: { slug: string; lang: Locale }
}) => {
  const dictionary = await getDictionary(lang, 'website')

  const { title, subtitle, intro, cover, body } = await getData<CaseStudyPayload>(
    caseStudyBySlugQuery,
    { slug, lang },
    ['caseStudy', 'project']
  )

  return (
    <>
      <Container as="main" className="relative max-xl:px-8">
        <header className="pb-16 max-xl:px-0 max-xl:pt-32 xl:p-32 xl:pb-16">
          <div className="text-button mb-8 flex items-center space-x-3">
            <Link href={`/${lang}/work`} className="text-white/70 transition hover:text-white">
              ← {dictionary.CaseStudy.back}
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
              src={urlForImage(cover.image)
                .width(cover.width)
                .height(Math.floor(cover.width / (1280 / 400)))
                .fit('crop')
                .focalPoint(cover.image.hotspot?.x ?? 0.5, cover.image.hotspot?.y ?? 0.5)
                .quality(100)
                .url()}
              alt={cover.image.alt ?? cover.image.caption}
              title={cover.image.caption ?? cover.image.alt ?? ''}
              quality={100}
              sizes="1280px"
              placeholder={'blur'}
              blurDataURL={cover.lqip}
              priority
              className={`w-full rounded-lg object-cover max-xl:aspect-video max-xl:max-h-[300px] xl:h-[400px] xl:rounded-2xl`}
              width={cover.width}
              height={cover.height}
            />
            <figcaption className="text-label-md pt-1 text-white/40 xl:pl-32">
              {cover.image.caption ?? cover.image.alt ?? ''}
            </figcaption>
          </figure>
        </header>
        <div className="flex flex-col gap-8 pt-0 max-xl:pb-32 xl:p-32 xl:pt-0">
          <PortableText
            value={body}
            components={{
              list: {
                bullet: ({ children }) => (
                  <ul className="flex list-disc flex-col gap-8 pl-5">{children}</ul>
                ),
                number: ({ children }) => (
                  <ol className="flex list-decimal flex-col gap-8 pl-5">{children}</ol>
                ),
              },
              listItem: {
                bullet: ({ children }) => (
                  <li className="pr-5 text-white/70">
                    <p>{children}</p>
                  </li>
                ),
                number: ({ children }) => (
                  <li className="pr-5 text-white/70">
                    <p>{children}</p>
                  </li>
                ),
              },
              types: {
                image: ({ value }) => {
                  return (
                    <figure className="relative my-24 xl:-mx-32">
                      <Image
                        src={urlForImage(value.asset)
                          .width(value.asset.metadata.dimensions.width)
                          .height(Math.floor(value.asset.metadata.dimensions.width / (1280 / 400)))
                          .fit('crop')
                          .focalPoint(value.hotspot?.x ?? 0.5, value.hotspot?.y ?? 0.5)
                          .quality(100)
                          .url()}
                        alt={value.alt ?? value.caption ?? ''}
                        title={value.caption ?? value.alt ?? ''}
                        quality={100}
                        sizes="1280px"
                        className="w-full rounded-lg object-cover max-xl:aspect-video max-xl:max-h-[300px] xl:h-[400px] xl:rounded-2xl"
                        width={value.asset.metadata.dimensions.width}
                        height={value.asset.metadata.dimensions.height}
                        placeholder="blur"
                        blurDataURL={value.asset.metadata.lqip}
                      />
                      <figcaption className="text-label-md pt-1 text-white/40 xl:pl-32">
                        {value.caption ?? value.alt ?? ''}
                      </figcaption>
                    </figure>
                  )
                },
              },
              marks: {
                // Ex. 1: custom renderer for the em / italics decorator
                strong: ({ children }) => (
                  <span className="text-sub-heading-mobile text-yellow inline-block last:mb-0">
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
                normal: ({ children }) => <p className="text-white/70">{children}</p>,
                h1: ({ children }) => (
                  <h1 className="text-h1-mobile 2xl:text-h1 mb-8">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-h2-mobile 2xl:text-h2 mb-8">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-h3-mobile 2xl:text-h3 mb-8">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-h4-mobile 2xl:text-h4 mb-8">{children}</h4>
                ),
                h5: ({ children }) => (
                  <h5 className="text-h5-mobile 2xl:text-h5 mb-8">{children}</h5>
                ),
                h6: ({ children }) => (
                  <h6 className="text-h6-mobile 2xl:text-h6 mb-8">{children}</h6>
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
