import { NextRequest, NextResponse } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

import { generateSiteMap } from '~lib/sitemap'

import { i18n } from '~/i18n.config'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales)

  const locale = matchLocale(languages, locales, i18n.defaultLocale)

  return locale
}

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname
  const reqHeaders = new Headers(request.headers)

  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // If you have one
  if (
    ['/fonts', '/images'].some(
      (value) => pathname.startsWith(value) || pathname.localeCompare(value) === 0
    )
  ) {
    return NextResponse.next()
  }

  // Refresh the session for every request
  const supabase = createMiddlewareClient({ req: request, res: NextResponse.next() })
  await supabase.auth.getSession()

  const locale = getLocale(request) ?? 'en'
  reqHeaders.set('x-mg-locale', locale)

  // Check if the default locale is in the pathname
  if (pathname.startsWith(`/${i18n.defaultLocale}/`) || pathname === `/${i18n.defaultLocale}`) {
    // e.g. incoming request is /en/products
    // The new URL is now /products
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${i18n.defaultLocale}`,
          pathname === `/${i18n.defaultLocale}` ? '/' : ''
        ),
        request.url
      ),
      {
        headers: reqHeaders,
      }
    )
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    if (locale === i18n.defaultLocale) {
      return NextResponse.rewrite(new URL(`/${locale}${pathname}`, request.url), {
        headers: reqHeaders,
      })
    }

    reqHeaders.set('x-mg-locale', 'it')
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url), {
      headers: reqHeaders,
    })
  }

  reqHeaders.set('x-mg-locale', 'it')
  return NextResponse.next({
    request: {
      headers: reqHeaders,
    },
  })
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|studio|auth|sitemap.xml|robots.txt|_next/static|_next/image|images|fonts).*)',
  ],
}
