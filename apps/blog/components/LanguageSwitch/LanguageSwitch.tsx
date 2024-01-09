'use client'

import { useCallback } from 'react'
import { usePathname, useSearchParams, useSelectedLayoutSegments } from 'next/navigation'
import Link from 'next/link'
import { GlobeSimple } from '@phosphor-icons/react'

interface Locale {
  value: 'en' | 'it'
  label: string
}

const locales: Locale[] = [
  { value: 'en', label: 'en' },
  { value: 'it', label: 'it' },
]

export const LanguageSwitch = () => {
  const pathname = usePathname()!
  const searchParams = useSearchParams()!
  const segments = useSelectedLayoutSegments()

  const getQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
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
            className={`text-button relative inline-flex items-center gap-1 px-4 py-2 opacity-60 transition hover:opacity-100`}
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
