import Image from 'next/image'

import { urlForImage } from '@repo/sanity/image'
import { SlimProjectPayload, slimProjectBySlugQuery } from '@repo/sanity/queries'
import { getData } from '@repo/sanity/fetch'

type ProjectCardProps = {
  slug: string
}

export const ProjectCard = async ({ slug }: ProjectCardProps) => {
  const { title, site, cover } = await getData<SlimProjectPayload>(
    slimProjectBySlugQuery,
    { slug },
    ['project']
  )

  return (
    <div className="w-[calc(150px*16/9)] space-y-8 md:w-[calc(300px*16/9)] md:space-y-[26px]">
      <a
        target="_blank"
        rel="noreferrer noopener"
        href={site}
        className="relative inline-block aspect-video h-[150px] cursor-pointer overflow-hidden rounded-lg md:h-[300px] md:rounded-2xl"
      >
        <Image
          src={urlForImage(cover.image).url()}
          alt={cover.image.alt ?? cover.image.caption ?? title}
          title={cover.image.alt ?? cover.image.caption ?? title}
          width={Math.floor((300 * 16) / 9)}
          height={300}
          placeholder="blur"
          blurDataURL={cover.lqip}
          className="h-full w-full object-cover"
        />
      </a>
      <div className="flex w-full flex-col">
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={site}
          className="text-sub-heading-mobile md:text-sub-heading group w-fit font-medium"
        >
          {title}{' '}
          <span className="group-hover:text-yellow inline-block text-white transition will-change-transform group-hover:translate-x-1">
            →
          </span>
        </a>
        <span className="text-label-md text-light-me inline-block max-w-full truncate">{site}</span>
      </div>
    </div>
  )
}
