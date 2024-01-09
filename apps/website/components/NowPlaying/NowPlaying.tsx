'use client'

import { useState } from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import { SpotifyLogo } from '@phosphor-icons/react'

import fetcher from '~lib/fetcher'
import { _Song } from '~lib/types'
import { useIsomorphicLayoutEffect } from '~utils/useIsomorphicLayoutEffect'

export const NowPlaying = ({
  title,
  notPlayingMessage,
}: {
  title: string
  notPlayingMessage: string
}) => {
  const { data } = useSWR<_Song>('/api/nowPlaying', fetcher)
  const [titleWidth, setTitleWidth] = useState(0)
  const [artistWidth, setArtistWidth] = useState(0)

  useIsomorphicLayoutEffect(() => {
    if (!data) return

    setTitleWidth(data.title?.length ?? 0)
    setArtistWidth(data.artist?.length ?? 0)
  }, [data?.title, data?.artist])

  return (
    <div className="xl:mr-[128px]">
      <h3 className="text-label-md mb-4">{title}</h3>
      {!data && <NowPlayingSkeleton />}
      {data && (
        <div className="flex w-[240px] flex-col gap-4">
          <div
            className="h-[240px] w-[240px] overflow-hidden rounded-lg bg-white/20"
            title={data.album}
          >
            {data.isPlaying ? (
              <Image
                src={data.albumImageUrl}
                sizes={`480px`}
                quality={100}
                width={240}
                height={240}
                alt={data.album}
                className="pointer-events-none inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="bg-album-noise flex h-full w-full items-center justify-center bg-cover text-white">
                <SpotifyLogo size={40} />
              </div>
            )}
          </div>
          <div className="bg-yellow flex items-baseline overflow-hidden rounded-lg p-2 text-black">
            {data.isPlaying ? (
              <a
                className={`${
                  titleWidth < artistWidth ? 'w-fit max-w-[50%] flex-none' : 'flex-shrink'
                } text-sub-heading-mobile truncate`}
                href={data.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={data.title}
              >
                {data.title}
              </a>
            ) : (
              <p className="text-sub-heading-mobile">{notPlayingMessage}</p>
            )}
            <span className="text-label-md mx-2 text-black/60">{'-'}</span>
            {data.isPlaying ? (
              <a
                className={`${
                  artistWidth < titleWidth ? 'w-fit max-w-[50%] flex-none' : 'flex-shrink'
                } text-label-md truncate text-black/60`}
                href={`https://open.spotify.com/artist/${data.artistId}`}
                target="_blank"
                rel="noopener noreferrer"
                title={data.artist}
              >
                {data.artist}
              </a>
            ) : (
              <p className="text-label-md text-black/60">Spotify</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const NowPlayingSkeleton = () => {
  return (
    <div className="w-[240px] space-y-4">
      <div className="flex h-[240px] w-[240px] animate-pulse items-center justify-center rounded-lg bg-white/20">
        <SpotifyLogo size={40} />
      </div>
      <div className="bg-yellow flex items-center overflow-hidden rounded-lg p-2 text-black">
        <span className="inline-block h-[19.2px] flex-1 animate-pulse rounded bg-black/20"></span>
        <span className="text-label-md mx-2 text-black/60">{'-'}</span>
        <span className="inline-block h-[19.2px] flex-1 animate-pulse rounded bg-black/20"></span>
      </div>
    </div>
  )
}
