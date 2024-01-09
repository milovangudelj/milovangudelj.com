'use client'

import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'

import { Locale } from '~/i18n.config'

import { NavLink } from '~components/NavLink'

export const MobileNav = ({
  links,
  lang,
}: {
  links: {
    label: string
    url: string
    _key: string
  }[]
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
    <div className="md:pointer-events-none md:invisible md:hidden md:select-none">
      <div onClick={toggleMenu} className="relative z-10 space-y-1.5 p-4 md:hidden">
        <span
          className={`block h-0.5 w-8 origin-center bg-current transition-all will-change-transform ${
            menuOpen ? 'translate-y-2 rotate-45' : 'transform'
          }`}
        ></span>
        <span className={`block h-0.5 w-8 bg-current transition ${menuOpen && 'opacity-0'}`}></span>
        <span
          className={`block h-0.5 w-8 origin-center bg-current transition-all will-change-transform ${
            menuOpen ? '-translate-y-2 -rotate-45' : 'transform'
          }`}
        ></span>
      </div>
      <motion.ul
        initial={'closed'}
        animate={menuOpen ? 'open' : 'closed'}
        variants={list}
        className="bg-noise absolute left-0 right-0 top-full h-[var(--mobile-nav-height)] flex-col items-end justify-center gap-4 border-t border-white/[0.06] bg-black px-8 py-2"
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
