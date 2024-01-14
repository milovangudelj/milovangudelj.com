import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import localFont from 'next/font/local'
import { GeistSans } from 'geist/font/sans'
import { Navbar } from '@repo/ui'
import { Locale } from '@repo/types/i18n'

import { getSiteNavigation } from '~/sanity/client'
import { i18n } from '~/i18n.config'

import '~styles/globals.css'
import '@repo/ui/styles.css'

import { Footer } from '~components/Footer'
import { Metadata, Viewport } from 'next'

const spaceGrotesk = localFont({
  src: '../../public/fonts/SpaceGrotesk-Var.woff2',
  display: 'swap',
  preload: true,
  weight: '300 700',
  style: 'normal',
  variable: '--font-space',
})

export const viewport: Viewport = {
  themeColor: '#000000',
}

export const metadata: Metadata = {
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
  manifest: '/images/favicon/site.webmanifest',
  other: {
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/images/favicon/browserconfig.xml',
  },
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
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
  const { links } = await getSiteNavigation({ lang: params.lang })

  return (
    <html lang={params.lang} className={`${GeistSans.variable} ${spaceGrotesk.variable}`}>
      <body className="before:bg-noise relative min-h-screen scroll-smooth bg-black font-sans text-white before:pointer-events-none before:absolute before:inset-0 before:block before:bg-repeat before:[background-size:100px]">
        <Navbar lang={params.lang} links={links} />
        <div className="relative before:pointer-events-none before:absolute before:inset-0 before:z-10 before:mx-auto before:w-[calc(100%-64px)] before:border-x before:border-white/[0.06] before:md:max-w-7xl">
          {children}
        </div>
        <Footer lang={params.lang} />
        {process.env.NODE_ENV === 'production' && <SpeedInsights />}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
