import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const Section = ({ children, className = '' }: ComponentProps<'section'>) => {
  return (
    <section className={twMerge(`ui-border-t ui-border-white/[0.06] ui-px-8 ui-py-32`, className)}>
      {children}
    </section>
  )
}
