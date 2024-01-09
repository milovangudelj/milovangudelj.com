import localFont from 'next/font/local'

import { i18n, Locale } from '~/i18n.config'

import '~styles/globals.css'

import { Navbar } from '~components/Navbar'
import { Footer } from '~components/Footer'

const inter = localFont({
  src: '../../public/fonts/Inter-Var.woff2',
  display: 'swap',
  preload: true,
  weight: '100 900',
  style: 'oblique -10deg 0deg',
  variable: '--font-inter',
})
const spaceGrotesk = localFont({
  src: '../../public/fonts/SpaceGrotesk-Var.woff2',
  display: 'swap',
  preload: true,
  weight: '300 700',
  style: 'normal',
  variable: '--font-space',
})

export const metadata = {
  title: 'Milovan Gudelj - Web developer / UI designer',
  description: 'I design and develop engaging websites and delightful digital experiences.',
  metadataBase: new URL('https://www.milovangudelj.com'),
  alternates: {
    canonical: '/en',
    languages: { 'it-IT': '/it' },
  },
  openGraph: {
    images: {
      url: '/images/og-image.png',
      width: 1280,
      height: 800,
    },
  },
  icons: {
    icon: {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/images/favicon/favicon-32x32.png',
    },
    shortcut: '/images/favicon/favicon.ico',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/images/favicon/favicon-16x16.png',
      },
      {
        rel: 'mask-icon',
        url: '/images/favicon/safari-pinned-tab.svg',
      },
    ],
    apple: {
      url: '/images/favicon/apple-touch-icon.png',
      rel: 'apple-touch-icon',
      sizes: '180x180',
      type: 'image/png',
    },
  },
  themeColor: '#000000',
  manifest: '/images/favicon/site.webmanifest',
  other: {
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/images/favicon/browserconfig.xml',
  },
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    lang: Locale
  }
}) {
  return (
    <html lang={params.lang} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-noise min-h-screen scroll-smooth bg-black font-sans text-white">
        <Navbar lang={params.lang} links={links[params.lang]} />
        <div className="relative">{children}</div>
        <Footer lang={params.lang} />
      </body>
    </html>
  )
}
