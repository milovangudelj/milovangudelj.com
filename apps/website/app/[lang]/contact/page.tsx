import Image from 'next/image'
import { Metadata } from 'next'

import { Container, Section } from '@repo/ui'
import { type Locale, getDictionary } from '@repo/i18n'
import { getData } from '@repo/sanity/fetch'
import { PageMetadataPayload, pageMetadataQuery } from '@repo/sanity/queries'
import { urlForImage } from '@repo/sanity/image'

import { CTA } from '~components/cta'

import igLogo from '~images/igLogo.png'
import twLogo from '~images/twLogo.svg'
import drLogo from '~images/drLogo.svg'

export async function generateMetadata({
  params: { lang = 'en' },
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const metadata = await getData<PageMetadataPayload | null>(
    pageMetadataQuery,
    { slug: 'contact' },
    ['page']
  )
  if (!metadata) return {}

  const { title, description, ogImage } = metadata

  return {
    title: title[lang],
    description: description[lang],
    alternates: {
      canonical: 'https://www.milovangudelj.com/en/contact',
      languages: { 'it-IT': 'https://www.milovangudelj.com/it/contact' },
    },
    openGraph: {
      title: title[lang],
      description: description[lang],
      siteName: 'Milovan Gudelj',
      images: [
        {
          url: urlForImage(ogImage).width(1200).height(630).fit('crop').url(),
          width: 1200,
          height: 630,
        },
      ],
      locale: lang,
      type: 'website',
    },
  }
}

const ContactPage = async ({ params: { lang = 'en' } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang, 'website')

  return (
    <>
      <Section className="relative overflow-hidden">
        <Container as="main" className="flex items-center justify-between space-y-0">
          <div className="space-y-16">
            <h1 className="text-h1-mobile md:text-d1-mobile 2xl:text-d1">
              {dictionary.Contact.title}
            </h1>
            <p className="text-sub-heading-mobile 2xl:text-sub-heading">
              {dictionary.Contact.description}
            </p>
            <div className="font-space flex items-center gap-4 py-0.5 md:gap-12">
              <a
                href="https://instagram.com/milovangudelj"
                target="_blank"
                rel="noreferrer"
                className="text-body hover:text-instagram md:text-sub-heading-mobile xl:text-sub-heading font-semibold transition"
              >
                Instagram <span className="text-instagram">↗</span>
              </a>
              <a
                href="https://dribbble.com/milovangudelj"
                target="_blank"
                rel="noreferrer"
                className="text-body hover:text-dribbble md:text-sub-heading-mobile xl:text-sub-heading font-semibold transition"
              >
                Dribbble <span className="text-dribbble">↗</span>
              </a>
              <a
                href="https://twitter.com/milovangudelj"
                target="_blank"
                rel="noreferrer"
                className="text-body hover:text-twitter md:text-sub-heading-mobile xl:text-sub-heading font-semibold transition"
              >
                Twitter <span className="text-twitter">↗</span>
              </a>
            </div>
          </div>
          <div className="mr-[calc(32px+128px)] hidden origin-center rotate-12 flex-col items-center space-y-20 xl:flex">
            <Image
              alt="Dribbble logo"
              className="origin-center -rotate-12"
              src={drLogo}
              width={100}
              loading="eager"
            />
            <div className="flex space-x-[100px]">
              <Image
                alt="Twitter logo"
                className="origin-center -rotate-12"
                src={twLogo}
                width={100}
                loading="eager"
              />
              <Image
                alt="Instagram logo"
                className="origin-center -rotate-12"
                src={igLogo}
                width={100}
                loading="eager"
              />
            </div>
          </div>
        </Container>
      </Section>
      <CTA lang={lang as Locale} />
    </>
  )
}

export default ContactPage
