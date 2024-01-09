'use client'

import useSWR from 'swr'
import { Eye } from '@phosphor-icons/react'

import fetcher from '~/lib/fetcher'

import { ViewCountSkeleton } from '~components/ViewCount/ViewCountSkeleton'

export const ViewCount = ({ message }: { message: string }) => {
  const { data, isLoading } = useSWR<{ count: number; error?: string }>('/api/viewCount', fetcher)

  if (isLoading) return <ViewCountSkeleton />

  if (!data) return null

  return (
    <div className="ml-auto inline-flex items-center gap-1 self-stretch overflow-hidden">
      <div className="text-yellow/70 relative inline max-w-full truncate">
        {data.count}
        <span className="absolute h-px w-px whitespace-pre border-none opacity-0 [clip:rect(0,_0,_0,_0)]">
          {` ${message}`}
        </span>
      </div>
      <Eye size={16} className="flex-none" />
    </div>
  )
}
