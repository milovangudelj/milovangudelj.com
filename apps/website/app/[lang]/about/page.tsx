import { Container, Section } from '@repo/ui'
import { type Locale, getDictionary } from '@repo/i18n'

import { CTA } from '~components/cta'
import { TopArtists } from '~/components/top-artists'
import { NowPlaying } from '~/components/now-playing'

export const metadata = {
  title: 'Milovan Gudelj - About me',
  alternates: {
    canonical: 'https://www.milovangudelj.com/en/about',
    languages: { 'it-IT': 'https://www.milovangudelj.com/it/about' },
  },
}

const AboutPage = async ({ params: { lang = 'en' } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang, 'website')

  return (
    <>
      <Section className="relative lg:h-[var(--mobile-nav-height)]">
        <Container>
          <h1 className="text-h1-mobile md:text-d1-mobile 2xl:text-d1">
            {dictionary.About.main.title}
          </h1>
          <div className="space-y-8">
            <p className="text-sub-heading-mobile 2xl:text-sub-heading max-w-[680px] text-white">
              {dictionary.About.main.p1}
            </p>
            <p className="text-body max-w-[680px] text-white/70">{dictionary.About.main.p2}</p>
          </div>
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
      </Section>
      <Section className="relative">
        <Container>
          <h2 className="text-h2-mobile md:text-h2">Music</h2>
          <div className="flex flex-col gap-16 xl:flex-row">
            <div className="flex-1 space-y-8 text-white/70">
              <p>
                Music has been, and still is, a huge part of my life. I grew up listening to 70s,
                80s and 90s music mixed with a healthy dose of Italian songwriters like Francesco
                Guccini and Fiorella Mannoia.
              </p>
              <p>
                Just imagine an Italian nine-year-old listening to Joe Cocker&apos;s “Unchain My
                Heart”, or maybe Cat Stevens&apos; “Father and Son”. Pretty cool I&apos;d say.
              </p>
              <p>
                As time went by my taste expanded and ventured off in the Hip-Hop land. There I
                discovered artists like The Notorious Big, The Game, Kendrick Lamar, J. Cole, Lil
                Wayne and Eminem just to name a few.
              </p>
              <p>
                Below you can see what I&apos;m listening to right now, and my top artists in the
                past year according to Spotify.
              </p>
            </div>
            <NowPlaying notPlayingMessage="Not playing" title="I'm listening to:" />
          </div>
          <TopArtists
            className="mt-16"
            title={dictionary.About.topArtists.title}
            itemAltText={dictionary.WrappedList.artist}
            itemOpenText={dictionary.WrappedList.open}
          />
        </Container>
      </Section>
      <CTA lang={lang} />
    </>
  )
}

export default AboutPage
