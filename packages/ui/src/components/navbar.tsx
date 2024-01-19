'use client'

import { ComponentProps, RefCallback, Suspense, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

import { type Locale } from '@repo/i18n'

import { MobileNav, NavLinks, LanguageSwitch, LanguageSwitchFallback } from '.'

import { SiteNavigationPayload } from '@repo/types/studio'

type NavbarProps = ComponentProps<'div'> & {
  links: SiteNavigationPayload['links']
  lang: Locale
  label?: string
}

export const Navbar = ({ links, lang, label }: NavbarProps) => {
  const [rect, navRef] = useClientRect()

  useEffect(() => {
    if (!rect || !rect.height) return

    document.documentElement.style.setProperty('--nav-height', `${rect.height}px`)
  }, [rect])

  return (
    <div
      ref={navRef}
      className="ui-bg-noise ui-sticky ui-top-0 ui-z-20 ui-border-b ui-border-white/[0.06] ui-bg-black ui-bg-repeat ui-px-8 ui-shadow-2xl ui-backdrop-blur-sm ui-transition ui-duration-300 [background-size:100px]"
    >
      <div className="ui-mx-auto ui-flex ui-w-full ui-max-w-7xl ui-items-center ui-justify-between ui-py-4">
        {label ? (
          <span className="ui-text-sub-heading ui-relative">
            <a href={`https://www.milovangudelj.com/${lang}`}>Milo</a>{' '}
            <Link href={`/${lang}`} className="ui-text-yellow">
              {label}
            </Link>
          </span>
        ) : (
          <Link href={`/${lang}`} className="ui-text-sub-heading ui-relative">
            Milo
          </Link>
        )}
        <div className="ui-flex ui-items-center">
          <NavLinks
            links={links}
            lang={lang}
            className="max-md:ui-pointer-events-none max-md:ui-invisible max-md:ui-hidden max-md:ui-select-none"
          />
          <span className="ui-bg-yellow ui-inline-block ui-h-6 ui-w-px max-md:ui-invisible max-md:ui-hidden"></span>
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
