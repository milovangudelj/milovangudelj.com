import Image from 'next/image'

import { Container, Section } from '@repo/ui'
import { type Locale, getDictionary } from '@repo/i18n'

import { CTA } from '~components/sections/CTA'

import igLogo from '~images/igLogo.png'
import twLogo from '~images/twLogo.svg'
import drLogo from '~images/drLogo.svg'

export const metadata = {
  title: 'Milovan Gudelj - Contact me',
  description:
    "Let's work together! Feel free to reach out to me for any questions you might have.",
  alternates: {
    canonical: 'https://www.milovangudelj.com/en/contact',
    languages: { 'it-IT': 'https://www.milovangudelj.com/it/contact' },
  },
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
