'use client'

import { ComponentProps, RefCallback, Suspense, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

import { Locale } from '~/i18n.config'

import { MobileNav } from '~components/MobileNav'
import { NavLinks } from '~components/NavLinks'
import { LanguageSwitch, LanguageSwitchFallback } from '~components/LanguageSwitch'

export const Navbar = ({
  links,
  lang,
}: ComponentProps<'div'> & {
  links: {
    label: string
    url: string
    _key: string
  }[]
  lang: Locale
}) => {
  const [rect, navRef] = useClientRect()

  useEffect(() => {
    if (!rect || !rect.height) return

    document.documentElement.style.setProperty('--nav-height', `${rect.height}px`)
  }, [rect])

  return (
    <div
      ref={navRef}
      className="bg-noise sticky top-0 z-20 border-b border-white/[0.06] bg-black px-8 shadow-2xl backdrop-blur-sm transition duration-300 [background-size:100px]"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between py-4">
        <span className="text-sub-heading relative">
          <a href={`https://www.milovangudelj.com/${lang}`}>Milo</a>{' '}
          <Link href={`/${lang}`} className="text-yellow">
            ~ blog
          </Link>
        </span>
        <div className="flex items-center">
          <NavLinks
            links={links}
            lang={lang}
            className="max-md:pointer-events-none max-md:invisible max-md:hidden max-md:select-none"
          />
          <span className="bg-yellow inline-block h-6 w-px max-md:invisible max-md:hidden"></span>
          <Suspense fallback={<LanguageSwitchFallback lang={lang} />}>
            <LanguageSwitch />
          </Suspense>
          <MobileNav lang={lang} links={links} />
        </div>
      </div>
    </div>
  )
}

function useClientRect(): [DOMRect | undefined, (instance: HTMLElement | null) => void] {
  const [rect, setRect] = useState<DOMRect>()

  const ref: RefCallback<HTMLElement> = useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect())
    }
  }, [])

  return [rect, ref]
}
