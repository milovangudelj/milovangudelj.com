'use client'

import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'

type Locale = 'en' | 'it'

import { NavLink } from './'
import { SiteNavigationPayload } from '@repo/types/studio'

export const MobileNav = ({
  links,
  lang,
}: {
  links: SiteNavigationPayload['links']
  lang: Locale
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const toggleMenu = () => {
    setMenuOpen((s) => !s)
  }

  const list: Variants = {
    open: {
      display: 'flex',
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        type: 'tween',
        duration: 0.2,
        staggerChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
        type: 'tween',
        duration: 0.2,
      },
      transitionEnd: {
        display: 'none',
      },
    },
  }

  const item: Variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    closed: {
      x: -24,
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  }

  return (
    <div className="md:ui-pointer-events-none md:ui-invisible md:ui-hidden md:ui-select-none">
      <div onClick={toggleMenu} className="ui-relative ui-z-10 ui-space-y-1.5 ui-p-4 md:ui-hidden">
        <span
          className={`ui-block ui-h-0.5 ui-w-8 ui-origin-center ui-bg-current ui-transition-all ui-will-change-transform ${
            menuOpen ? 'ui-translate-y-2 ui-rotate-45' : 'ui-transform'
          }`}
        ></span>
        <span
          className={`ui-block ui-h-0.5 ui-w-8 ui-bg-current ui-transition ${
            menuOpen && 'ui-opacity-0'
          }`}
        ></span>
        <span
          className={`ui-block ui-h-0.5 ui-w-8 ui-origin-center ui-bg-current ui-transition-all ui-will-change-transform ${
            menuOpen ? '-ui-translate-y-2 -ui-rotate-45' : 'ui-transform'
          }`}
        ></span>
      </div>
      <motion.ul
        initial={'closed'}
        animate={menuOpen ? 'open' : 'closed'}
        variants={list}
        className="ui-bg-noise ui-absolute ui-left-0 ui-right-0 ui-top-full ui-h-[var(--mobile-nav-height)] ui-flex-col ui-items-end ui-justify-center ui-gap-4 ui-border-t ui-border-white/[0.06] ui-bg-black ui-bg-repeat ui-px-8 ui-py-2 [background-size:100px]"
      >
        {links.map((link) => (
          <motion.li variants={item} key={link._key}>
            <NavLink
              href={`/${lang}${link.url}`}
              label={link.label}
              onClick={() => {
                setMenuOpen(false)
              }}
            />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
