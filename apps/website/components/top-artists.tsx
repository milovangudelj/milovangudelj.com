import { ComponentProps } from 'react'
import Image from 'next/image'

import { _Artist } from '~lib/types'
import { getTopArtists } from '~/lib/spotify'

interface TopArtistsProps extends ComponentProps<'div'> {
  title: string
  itemAltText?: string
  itemOpenText?: string
}

export const TopArtists = async ({ title, ...props }: TopArtistsProps) => {
  const artists = await getTopArtists({ limit: 5, range: 'medium' })

  return (
    <div {...props}>
      <h3 className="text-label-md mb-4">{title}</h3>
      <ul className="w-full justify-between max-xl:space-y-4 xl:flex">
        {!artists &&
          [...Array(5)].map((item, idx) => (
            <ArtistSkeleton key={`skeleton_${idx}`} rank={idx + 1} />
          ))}
        {artists &&
          artists.map((item, idx) => <Artist key={item.url} item={item} rank={idx + 1} />)}
      </ul>
    </div>
  )
}

const Artist = ({ item, rank }: { item: _Artist; rank: number }) => {
  return (
    <li className="flex items-center">
      <Image
        className="pointer-events-none aspect-square h-16 w-16 flex-none select-none rounded-lg bg-white/20 object-cover"
        sizes={`64px`}
        quality={100}
        src={item.image.url}
        alt={`${item.name}'s profile picture`}
        width={64}
        height={64}
        loading={'lazy'}
      />
      <a
        href={item.url}
        rel="noreferrer noopener"
        target="_blank"
        className="underline-none text-sub-heading-mobile group inline-flex min-w-0 flex-1 items-center px-4 py-2"
        title={item.name}
      >
        <span className="flex-none text-white/70">{rank}.</span>
        <span className="mx-2 inline-block truncate">{item.name}</span>
        <span className="text-yellow pointer-events-none flex-none select-none opacity-0 transition group-hover:pointer-events-auto group-hover:select-auto group-hover:opacity-100">
          ↗
        </span>
      </a>
    </li>
  )
}

const ArtistSkeleton = ({ rank }: { rank: number }) => {
  return (
    <li className="flex flex-1 items-center">
      <div className="h-16 w-16 animate-pulse rounded-lg bg-white/20"></div>
      <div className="text-sub-heading-mobile group flex items-center px-4 py-2">
        <span className="text-white/70">{rank}.</span>
        <span className="mx-2 inline-block h-[19.2px] w-[100px] animate-pulse rounded bg-white/20"></span>
        <span className="pointer-events-none select-none opacity-0 transition group-hover:pointer-events-auto group-hover:select-auto group-hover:opacity-100">
          ↗
        </span>
      </div>
    </li>
  )
}
