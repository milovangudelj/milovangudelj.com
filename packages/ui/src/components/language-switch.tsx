'use client'

import { useCallback } from 'react'
import { usePathname, useSearchParams, useSelectedLayoutSegments } from 'next/navigation'
import Link from 'next/link'
import { GlobeSimple } from '@phosphor-icons/react'

import { type Locale } from '@repo/i18n'

interface LocaleMap {
  value: Locale
  label: string
}

const locales: LocaleMap[] = [
  { value: 'en', label: 'en' },
  { value: 'it', label: 'it' },
]

export const LanguageSwitch = () => {
  const pathname = usePathname()!
  const searchParams = useSearchParams()!
  const segments = useSelectedLayoutSegments()

  const getQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    const res = '?' + params.toString()

    return res.length === 1 ? '' : res
  }, [searchParams])

  const getCurrentLocale = useCallback(() => {
    const locale = pathname?.substring(1, 3)
    const res =
      locale.length === 0 ||
      locale !== 'it' ||
      (locale === 'it' && pathname.charAt(3) !== '/' && pathname.length > 3)
        ? 'en'
        : 'it'

    return res
  }, [pathname])

  const cleanPathname = (pathname: string): string => {
    const locale = pathname.substring(1, 3)

    const res =
      locale.length === 0 ||
      locale !== 'it' ||
      (locale === 'it' && pathname.charAt(3) !== '/' && pathname.length > 3)
        ? pathname
        : pathname.substring(3)

    return res
  }

  return (
    <>
      {locales.map((locale) =>
        getCurrentLocale() !== locale.value ? (
          <Link
            key={locale.value}
            href={`/${locale.value}` + cleanPathname(pathname) + getQueryString()}
            title={locale.value === 'it' ? "Passa all'Italiano" : 'Switch to English'}
            className={`ui-text-button ui-relative ui-inline-flex ui-items-center ui-gap-1 ui-px-4 ui-py-2 ui-opacity-60 ui-transition hover:ui-opacity-100`}
          >
            <span>{locale.label}</span>
            <span>
              <GlobeSimple weight="bold" />
            </span>
          </Link>
        ) : null
      )}
    </>
  )
}
