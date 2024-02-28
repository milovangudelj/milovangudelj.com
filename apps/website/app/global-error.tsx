'use client'

import { useEffect } from 'react'
import Error from 'next/error'
import * as Sentry from '@sentry/nextjs'
import localFont from 'next/font/local'
import { GeistSans } from 'geist/font/sans'

import '~styles/globals.css'
import '@repo/ui/styles.css'

const spaceGrotesk = localFont({
  src: '../public/fonts/SpaceGrotesk-Var.woff2',
  display: 'swap',
  preload: true,
  weight: '300 700',
  style: 'normal',
  variable: '--font-space',
})

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html
      lang={'en'}
      className={`${GeistSans.variable} ${spaceGrotesk.variable} bg-black text-white`}
    >
      <body>
        <div className="bg-noise min-h-[100dvh] bg-black bg-repeat [background-size:100px]">
          <div className="flex h-[var(--mobile-nav-height)] flex-col items-center justify-center gap-16 px-8">
            <h1 className="text-sub-heading-mobile xl:text-sub-heading text-white">
              Oh no! Something went wrong.
            </h1>
          </div>
        </div>
      </body>
    </html>
  )
}
