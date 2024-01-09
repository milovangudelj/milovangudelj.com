'use client'

import Image from 'next/image'
import { ComponentProps } from 'react'
import { useScrollContainer } from 'react-indiana-drag-scroll'

import { urlForImage } from '~/sanity/image'
import { PosterPayload } from '~/sanity/types'

interface GalleryProps extends ComponentProps<'div'> {
  posters: PosterPayload[]
  dragText?: string
}

export const PosterGallery = ({ posters, dragText = 'Drag or scroll', ...porps }: GalleryProps) => {
  const scrollContainer = useScrollContainer({
    mouseScroll: {
      rubberBand: false,
      inertia: false,
    },
  })

  return (
    <div className="relative w-full overflow-visible">
      <ul
        ref={scrollContainer.ref}
        className="scrollbar-hidden -mx-8 flex gap-16 overflow-y-hidden overflow-x-scroll px-8 pb-8 xl:-mx-[var(--side-width)] xl:px-[var(--side-width)]"
      >
        {posters.map((poster) => (
          <li
            key={`postereveryday_${poster.day}`}
            className="relative h-[300px] w-[225px] flex-none overflow-hidden rounded-lg lg:h-[400px] lg:w-[300px] xl:h-[500px] xl:w-[375px] xl:rounded-2xl"
          >
            <span
              aria-hidden
              className="text-sub-heading-mobile absolute inset-0 flex items-center justify-center bg-white/20 text-black"
            >
              Loading...
            </span>
            <Image
              src={urlForImage(poster.image.image).url()}
              alt={`${poster.title} - ${poster.image.image.alt}`}
              title={`${poster.title} - ${poster.image.image.caption}`}
              quality={100}
              width={375}
              height={500}
              placeholder="blur"
              blurDataURL={poster.image.lqip}
              className="relative h-full w-full object-cover"
            />
          </li>
        ))}
      </ul>
      <span className="absolute -left-8 -top-2 bottom-[calc(23.4px+32px-8px)] w-8 backdrop-blur-sm xl:-left-[var(--side-width)] xl:block xl:w-[var(--side-width)]"></span>
      <span className="absolute -right-8 -top-2 bottom-[calc(23.4px+32px-8px)] w-8 backdrop-blur-sm xl:-right-[var(--side-width)] xl:block xl:w-[var(--side-width)]"></span>
      <span className="text-button mt-8 inline-block">
        {dragText} <span className="text-yellow">→</span>
      </span>
    </div>
  )
}
