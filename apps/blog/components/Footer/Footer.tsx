import { Suspense } from 'react'

import { Locale } from '~/i18n.config'
import { getDictionary } from '~/utils/getDictionary'

import { ViewCount } from '~components/ViewCount/ViewCount'
import { ViewCountSkeleton } from '~components/ViewCount/ViewCountSkeleton'

export const Footer = async ({ lang }: { lang: Locale }) => {
  const dictionary = await getDictionary(lang)

  return (
    <footer className="border-t border-white/[0.06] px-8">
      <div className="text-label-md mx-auto flex w-full max-w-7xl items-center justify-between py-4 text-white/70">
        <div className="flex items-baseline gap-4 max-md:flex-1 max-md:justify-between md:gap-2">
          <span className="flex-none">Milovan Gudelj &copy; 2023</span>
          <span className="hidden md:inline">-</span>
          <Suspense fallback={<ViewCountSkeleton />}>
            <ViewCount message={dictionary.Footer.views} />
          </Suspense>
        </div>
        <ul className="hidden space-x-4 md:flex">
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://dribbble.com/milovangudelj"
              className="transition hover:text-white"
            >
              Dr
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/milovangudelj"
              className="transition hover:text-white"
            >
              Tw
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://instagram.com/milovangudelj"
              className="transition hover:text-white"
            >
              Ig
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer me"
              href="https://mastodon.social/@ilikemartians"
              className="transition hover:text-white"
            >
              Ma
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
