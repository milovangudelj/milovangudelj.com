import Image from 'next/image'

import { Container, Section } from '@repo/ui'
import { type Locale, getDictionary } from '@repo/i18n'
import { getData } from '@repo/sanity/fetch'
import {
  projectsQuery,
  ProjectPayload,
  pageMetadataQuery,
  PageMetadataPayload,
} from '@repo/sanity/queries'

import { ProjectShowcase } from '~/components/project-showcase'
import { CTA } from '~/components/cta'

import heroImage from '~images/work-hero-image.webp'
import { Metadata } from 'next'
import { urlForImage } from '@repo/sanity/image'

export async function generateMetadata({
  params: { lang = 'en' },
}: {
  params: { lang: Locale }
}): Promise<Metadata> {
  const metadata = await getData<PageMetadataPayload | null>(pageMetadataQuery, { slug: 'work' }, [
    'page',
  ])
  if (!metadata) return {}

  const { title, description, ogImage } = metadata

  return {
    title: title[lang],
    description: description[lang],
    alternates: {
      canonical: 'https://www.milovangudelj.com/en/work',
      languages: { 'it-IT': 'https://www.milovangudelj.com/it/work' },
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

const WorkPage = async ({ params: { lang = 'en' } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang, 'website')

  const projects = await getData<ProjectPayload[]>(projectsQuery, { lang }, ['project'])

  return (
    <>
      <Section className="relative xl:min-h-[var(--mobile-nav-height)]">
        <Container as="main">
          <h1 className="text-h1-mobile md:text-d1-mobile 2xl:text-d1">{dictionary.Work.title}</h1>
          <div className="space-y-8">
            <p className="text-sub-heading-mobile 2xl:text-sub-heading">
              {dictionary.Work.description}
            </p>
            <p className="text-body text-white/70">{dictionary.Work.subtitle}</p>
          </div>
          <span aria-hidden className="text-sub-heading text-yellow inline-block">
            ↓
          </span>
        </Container>
        <Image
          src={heroImage}
          alt="Isometric screenshot of DoYourThing's homepage"
          quality={100}
          sizes={'1280px'}
          width={1280}
          height={485}
          placeholder="blur"
          className="pointer-events-none absolute bottom-0 right-[var(--side-width)] w-[calc(100%-calc(var(--side-width)*2))] select-none object-cover"
        />
      </Section>
      {projects.map((project) => (
        <Section key={project.slug}>
          <Container>
            <ProjectShowcase
              messages={{
                visit: dictionary.ProjectShowcase.visit,
                read: dictionary.ProjectShowcase.readCS,
              }}
              project={project}
              lang={lang}
            />
          </Container>
        </Section>
      ))}
      <CTA lang={lang} />
    </>
  )
}

export default WorkPage
