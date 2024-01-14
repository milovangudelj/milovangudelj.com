import { twMerge } from 'tailwind-merge'

import { NavLink } from './'
import { Locale } from '@repo/types/i18n'
import { SiteNavigationPayload } from '@repo/types/studio'

export const NavLinks = ({
  links,
  className,
  lang,
}: {
  links: SiteNavigationPayload['links']
  className?: string
  lang: Locale
}) => {
  return (
    <ul className={twMerge('ui-flex ui-text-white', className)}>
      {links.map((link) => (
        <li key={link._key}>
          <NavLink href={`/${lang}${link.url}`} label={link.label} />
        </li>
      ))}
    </ul>
  )
}
