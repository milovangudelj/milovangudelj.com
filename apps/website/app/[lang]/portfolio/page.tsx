import Image from 'next/image'

import { Container, Section } from '@repo/ui'
import { type Locale, getDictionary } from '@repo/i18n'
import { getData } from '@repo/sanity/fetch'

import { CTA } from '~components/cta'
import { PosterGallery } from '~/components/poster-gallery'
import { SoftwarePlanets } from './SoftwarePlanets'

import squiggle from '~images/squiggly-line.svg'
import semicircle from '~images/semicircle.svg'
import { PosterPayload, postersQuery } from '@repo/sanity/queries'

export const metadata = {
  title: 'Milovan Gudelj - Portfolio',
  description: 'My portfolio! Feel free to reach out to me for any questions you might have.',
  alternates: {
    canonical: 'https://www.milovangudelj.com/en/portfolio',
    languages: { 'it-IT': 'https://www.milovangudelj.com/it/portfolio' },
  },
}

const PortfolioPage = async ({ params: { lang = 'en' } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang, 'website')
  const posters = await getData<PosterPayload[]>(postersQuery)

  const projects = [
    {
      id: 'pr_01',
      title: 'DoYourThing',
      year: 2022,
    },
    {
      id: 'pr_02',
      title: 'UniOrari',
      year: 2021,
    },
    {
      id: 'pr_03',
      title: 'Piscina di Agordo',
      year: 2019,
    },
  ]

  return (
    <>
      <Section className="relative xl:h-[var(--mobile-nav-height)]">
        <Container as="main" className="relative">
          <h1 className="text-h1-mobile md:text-d1-mobile 2xl:text-d1">
            {dictionary.Portfolio.title}
          </h1>
          <div className="space-y-8">
            <p className="text-sub-heading">{dictionary.Portfolio.description}</p>
            <p className="text-white/70">{dictionary.Portfolio.subtitle}</p>
          </div>
        </Container>
        <Image
          src={squiggle}
          alt="Decorative squiggly line"
          width={425}
          height={80}
          className="pointer-events-none absolute right-8 select-none object-cover max-xl:top-8 max-xl:h-10 max-xl:w-[212.5px] xl:bottom-[256px] xl:right-[calc((100%-1280px)/2)]"
        />
        <Image
          src={semicircle}
          alt="Decorative semicircle"
          width={182}
          height={91}
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 select-none object-cover max-xl:h-[45.5px] max-xl:w-[91px]"
        />
      </Section>
      <Section className="overflow-hidden">
        <Container className="relative space-y-0">
          <h2 className="text-h2-mobile md:text-h2">{dictionary.Portfolio.experience.title}</h2>
          <div className="space-y-8 pt-16 text-white/70 max-xl:pb-16">
            <p>{dictionary.Portfolio.experience.p1}</p>
            <p>{dictionary.Portfolio.experience.p2}</p>
            <p>{dictionary.Portfolio.experience.p3}</p>
            <p>{dictionary.Portfolio.experience.p4}</p>
          </div>
          <div className="relative lg:absolute lg:-bottom-[128px] lg:-top-[128px] lg:right-[64px] xl:right-[128px]">
            <span
              aria-hidden
              className="absolute -bottom-2 -left-8 -top-2 z-[5] inline-block w-8 backdrop-blur-sm lg:hidden"
            ></span>
            <span
              aria-hidden
              className="absolute -bottom-2 -right-8 -top-2 z-[5] inline-block w-8 backdrop-blur-sm lg:hidden"
            ></span>
            <div className="absolute bottom-0 right-0 flex max-lg:left-0 max-lg:items-center lg:top-0 lg:flex-col">
              <span className="repeat-none max-lg:bg-h-fading-dashes lg:bg-fading-dashes inline-block max-lg:-ml-16 max-lg:h-px max-lg:w-32 lg:h-32 lg:w-px"></span>
              <span className="flex-1 bg-white/40 max-lg:h-px lg:w-px"></span>
              <span className="repeat-none max-lg:bg-h-fading-dashes lg:bg-fading-dashes inline-block rotate-180 max-lg:-mr-16 max-lg:h-px max-lg:w-32 lg:h-32 lg:w-px"></span>
            </div>
            <div className="scrollbar-hidden flex flex-row-reverse flex-nowrap items-end gap-8 overflow-scroll max-lg:-mx-8 max-lg:h-min max-lg:px-16 max-lg:pb-px lg:h-full lg:flex-col lg:items-end lg:justify-center lg:gap-16 lg:pr-px">
              <div className="flex min-w-fit flex-col items-center lg:flex-row">
                <div className="border-yellow text-label-md text-yellow rounded-lg border border-dashed px-4 py-2">
                  <span>Your website?</span>
                  <span className="text-yellow/70 mx-2 inline-block">-</span>
                  <span className="text-yellow/70">2023</span>
                </div>
                <span className="inline-block from-white/0 to-white/40 max-lg:h-8 max-lg:w-px max-lg:bg-gradient-to-b lg:h-px lg:w-8 lg:bg-gradient-to-r"></span>
              </div>
              {projects.map((project) => (
                <div key={project.id} className="flex min-w-fit flex-col items-center lg:flex-row">
                  <div className="bg-yellow text-label-md rounded-lg px-4 py-2 text-black">
                    <span>{project.title}</span>
                    <span className="mx-2 inline-block text-black/70">-</span>
                    <span className="text-black/70">{project.year}</span>
                  </div>
                  <span className="inline-block from-white/0 to-white/40 max-lg:h-8 max-lg:w-px max-lg:bg-gradient-to-b lg:h-px lg:w-8 lg:bg-gradient-to-r"></span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <Section className="relative overflow-hidden max-xl:pb-[calc(182px+64px)]">
        <Container className="xl:relative">
          <h2 className="text-h2-mobile 2xl:text-h2">{dictionary.Portfolio.software.title}</h2>
          <p className="text-sub-heading-mobile 2xl:text-sub-heading">
            {dictionary.Portfolio.software.description}
          </p>
          <div className="space-y-8">
            <h3 className="text-sub-heading-mobile text-yellow">
              {dictionary.Portfolio.software.design.title}
            </h3>
            <p className="text-body text-white/70">{dictionary.Portfolio.software.design.p1}</p>
            <h3 className="text-sub-heading-mobile text-yellow">
              {dictionary.Portfolio.software.web.title}
            </h3>
            <p className="text-body text-white/70">{dictionary.Portfolio.software.web.p1}</p>
            <p className="text-body text-white/70">{dictionary.Portfolio.software.web.p2}</p>
          </div>
          <SoftwarePlanets />
        </Container>
      </Section>
      <Section className="overflow-hidden">
        <Container>
          <h2 className="text-h2-mobile md:text-h2">{dictionary.Portfolio.poster.title}</h2>
          <p className="text-sub-heading-mobile md:text-sub-heading mt-16">
            {dictionary.Portfolio.poster.description.pre}
            <span className="text-yellow">{dictionary.Portfolio.poster.description.hashtag}</span>
            {dictionary.Portfolio.poster.description.post}
          </p>
          <PosterGallery
            posters={posters.slice(0, 4)}
            dragText={dictionary.Portfolio.poster.drag}
          />
          <PosterGallery posters={posters.slice(4)} dragText={dictionary.Portfolio.poster.drag} />
        </Container>
      </Section>
      <CTA lang={lang} />
    </>
  )
}

export default PortfolioPage
