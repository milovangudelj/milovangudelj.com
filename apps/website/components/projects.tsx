'use client'

import { ReactNode } from 'react'
import { useScrollContainer } from 'react-indiana-drag-scroll'

export const Projects = ({ children }: { children: ReactNode }) => {
  const scrollContainer = useScrollContainer({
    mouseScroll: {
      rubberBand: false,
      inertia: false,
    },
  })

  return (
    <div className="relative w-full pt-16">
      <ul
        ref={scrollContainer.ref}
        className="scrollbar-hidden -mx-8 flex gap-8 overflow-y-hidden overflow-x-scroll px-8 xl:-mx-[var(--side-width)] xl:gap-16 xl:px-[var(--side-width)]"
      >
        {children}
      </ul>
      <span className="absolute -left-8 bottom-0 top-0 w-8 bg-transparent backdrop-blur-sm xl:-left-[var(--side-width)] xl:w-[var(--side-width)]"></span>
      <span className="absolute bottom-0 left-full top-0 w-8 bg-transparent backdrop-blur-sm xl:w-[var(--side-width)]"></span>
    </div>
  )
}
