import { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import localFont from 'next/font/local'
import { GeistSans } from 'geist/font/sans'
import { Toaster } from 'sonner'
import { VisualEditing } from 'next-sanity'

import { Navbar, Footer } from '@repo/ui'
import { type Locale, config as i18n } from '@repo/i18n'
import { getData } from '@repo/sanity/fetch'

import '~styles/globals.css'
import '@repo/ui/styles.css'
import { SanityEditorToast } from './SanityEditorToast'
import { Suspense } from 'react'
import { SiteNavigationPayload, siteNavigationQuery } from '@repo/sanity/queries'

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
  title: {
    template: 'Milovan Gudelj - %s',
    default: 'Milovan Gudelj - Web developer / UI designer',
  },
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
  const { links } = await getData<SiteNavigationPayload>(
    siteNavigationQuery,
    { lang: params.lang },
    ['siteNavigation']
  )

  return (
    <html lang={params.lang} className={`${GeistSans.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-noise relative min-h-screen scroll-smooth bg-black bg-repeat font-sans text-white [background-size:100px]">
        <Navbar lang={params.lang} links={links} />
        {children}
        <Footer lang={params.lang} />
        <Toaster
          richColors={true}
          toastOptions={{
            style: {
              backgroundColor: 'black',
              backgroundImage: 'url(/images/noise.webp)',
              backgroundSize: '100px',
              borderRadius: '8px',
              userSelect: 'none',
              padding: '0',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              fontWeight: '400',
              color: 'white',
            },
          }}
        />
        <Suspense>
          <SanityEditorToast />
        </Suspense>
        {process.env.NODE_ENV === 'production' && <SpeedInsights />}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
