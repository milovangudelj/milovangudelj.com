'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export const NavLink = ({
  href,
  label,
  onClick,
}: {
  href: string
  label: string
  onClick?: () => void
}) => {
  const segment = useSelectedLayoutSegment()

  return (
    <Link
      href={href}
      className={`ui-text-sub-heading md:ui-text-button ui-relative ui-inline-block ui-px-4 ui-py-2 ${
        href.slice(4) === segment ? 'ui-opacity-100' : 'ui-opacity-60'
      } ui-transition hover:ui-opacity-100`}
      onClick={onClick}
    >
      {href.slice(4) === segment && (
        <span className="ui-text-yellow motion-safe:ui-animate-spin-slow ui-absolute ui-bottom-0 ui-left-0 ui-top-0 -ui-ml-1 ui-mt-1 ui-flex ui-items-center md:-ui-ml-0.5">
          <svg
            className="ui-aspect-square ui-w-2.5 md:ui-w-3"
            viewBox="0 0 13 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.22514 11.63H6.85514C6.96014 10.985 7.24514 10.28 7.72514 9.51499C8.68514 7.99999 10.6201 6.51499 12.2851 6.16999V5.53999C11.4601 5.35999 10.6501 4.98499 9.87014 4.42999C8.28014 3.30499 7.11014 1.62499 6.85514 0.109985H6.22514C6.07514 0.904985 5.73014 1.66998 5.19014 2.44998C4.12514 3.99499 2.46014 5.13499 0.765137 5.53999V6.16999C1.62014 6.34999 2.49014 6.76999 3.34514 7.41499C5.08514 8.71999 6.00014 10.34 6.22514 11.63Z"
              fill="currentColor"
            />
          </svg>
        </span>
      )}
      {label}
    </Link>
  )
}
