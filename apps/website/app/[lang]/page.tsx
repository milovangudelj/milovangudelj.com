import { Container, Section } from '@repo/ui'
import { Locale } from '@repo/types/i18n'

import { CTA } from '~components/sections/CTA'
import { Projects } from '~components/Projects'

import { getDictionary } from '~utils/getDictionary'
import { getSlimProjects } from '~/sanity/client'

const Home = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const projects = await getSlimProjects(lang)

  const dictionary = await getDictionary(lang)

  return (
    <>
      <Section className="relative text-white lg:h-[var(--mobile-nav-height)]">
        <Container as="main">
          <h1 className="text-h1-mobile md:text-d1-mobile 2xl:text-d1 mb-16">
            {dictionary.Home.heroTitle.webDev} <br className="hidden md:inline" />
            <span className="text-yellow">/</span> {dictionary.Home.heroTitle.designer}
          </h1>
          <p className="text-sub-heading-mobile md:text-sub-heading max-w-[500px]">
            {dictionary.Home.heroParagraph}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/poly-me-sd.webp"
            loading="eager"
            alt="A picture of me"
            srcSet="/images/poly-me.webp 2x"
            width={402}
            height={535}
            className="pointer-events-none absolute bottom-0 right-[var(--side-width)] hidden select-none object-cover lg:block"
          />
        </Container>
        <p className="text-label-md absolute bottom-8 left-8 text-white/70 xl:left-[var(--side-width)]">
          {dictionary.Home.more} <span className="font-space text-yellow">↓</span>
        </p>
      </Section>
      <Section>
        <Container>
          <h2 className={'text-h2-mobile xl:text-h2'}>{dictionary.About.main.title}</h2>
          <div className="space-y-8 text-white/70">
            <p className="text-body max-w-[680px]">{dictionary.About.main.p1}</p>
            <p className="text-body max-w-[680px]">{dictionary.About.main.p2}</p>
          </div>
        </Container>
      </Section>
      <Section className="overflow-hidden">
        <Container>
          <h2 className="text-h2-mobile md:text-h2">{dictionary.Work.title}</h2>
          <p className="text-body max-w-[680px] text-white/70">{dictionary.Work.description}</p>
          <Projects projects={projects} />
        </Container>
      </Section>
      <CTA lang={lang} />
    </>
  )
}

export default Home
