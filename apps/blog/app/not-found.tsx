import localFont from 'next/font/local'
import Image from 'next/image'
import { headers } from 'next/headers'

import { Navbar } from '~/components'

import confusedTravolta from '~images/johntravolta.webp'

import '~styles/globals.css'
import { Locale } from '~/i18n.config'
import { getDictionary } from '~/utils/getDictionary'

const inter = localFont({
  src: '../public/fonts/Inter-Var.woff2',
  display: 'swap',
  preload: true,
  weight: '100 900',
  style: 'oblique -10deg 0deg',
  variable: '--font-inter',
})
const spaceGrotesk = localFont({
  src: '../public/fonts/SpaceGrotesk-Var.woff2',
  display: 'swap',
  preload: true,
  weight: '300 700',
  style: 'normal',
  variable: '--font-space',
})

const links = {
  en: [
    { url: '/posts', label: 'posts', _key: 'posts' },
    { url: '/guestbook', label: 'guestbook', _key: 'guestbook' },
  ],
  it: [
    { url: '/posts', label: 'post', _key: 'posts' },
    { url: '/guestbook', label: 'guestbook', _key: 'guestbook' },
  ],
}

export default async function NotFound() {
  const lang = (headers().get('x-mg-locale') ?? 'en') as Locale

  const dictionary = await getDictionary(lang)

  return (
    <html lang={lang} className={`${inter.variable} ${spaceGrotesk.variable} bg-black text-white`}>
      <body>
        <div className="bg-noise min-h-[100dvh] bg-black">
          <Navbar lang={lang} links={links[lang]} />

          <div className="flex h-[var(--mobile-nav-height)] flex-col items-center justify-center gap-16 px-8">
            <Image
              src={confusedTravolta}
              quality={100}
              alt="Confused John Travolta from the movie Pulp Fiction"
              className="aspect-[293/300] w-[293px] object-cover opacity-50 grayscale"
            />
            <h1 className="text-sub-heading-mobile text-white xl:text-sub-heading">
              {dictionary.NotFound.content}
            </h1>
          </div>
        </div>
      </body>
    </html>
  )
}
