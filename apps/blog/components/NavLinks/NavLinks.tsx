import { twMerge } from 'tailwind-merge'

import { NavLink } from '~components/NavLink/NavLink'
import { Locale } from '~/i18n.config'

export const NavLinks = ({
  links,
  className,
  lang,
}: {
  links: {
    label: string
    url: string
    _key: string
  }[]
  className?: string
  lang: Locale
}) => {
  return (
    <ul className={twMerge('flex text-white', className)}>
      {links.map((link) => (
        <li key={link._key}>
          <NavLink href={`/${lang}${link.url}`} label={link.label} />
        </li>
      ))}
    </ul>
  )
}
