import { Suspense } from 'react'

import { getDictionary, type Locale } from '@repo/i18n'

import { ViewCount, ViewCountSkeleton } from '.'

export const Footer = async ({ lang }: { lang: Locale }) => {
  const dictionary = await getDictionary(lang, 'website')

  return (
    <footer className="ui-border-white/[0.06] ui-px-8 ui-border-t">
      <div className="ui-text-label-md ui-mx-auto ui-flex ui-w-full ui-max-w-7xl ui-items-center ui-justify-between ui-py-4 ui-text-white/70">
        <div className="ui-items-baseline ui-gap-4 max-md:ui-flex-1 max-md:ui-justify-between md:ui-gap-2 ui-flex">
          <span className="ui-flex-none">Milovan Gudelj &copy; {new Date().getFullYear()}</span>
          <span className="ui-hidden md:ui-inline">-</span>
          <Suspense fallback={<ViewCountSkeleton />}>
            <ViewCount message={dictionary.Footer.views} />
          </Suspense>
        </div>
        <ul className="ui-hidden ui-space-x-4 md:ui-flex">
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://dribbble.com/milovangudelj"
              className="ui-transition hover:ui-text-white"
            >
              Dr
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/milovangudelj"
              className="ui-transition hover:ui-text-white"
            >
              Tw
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://instagram.com/milovangudelj"
              className="ui-transition hover:ui-text-white"
            >
              Ig
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer me"
              href="https://mastodon.social/@ilikemartians"
              className="ui-transition hover:ui-text-white"
            >
              Ma
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
