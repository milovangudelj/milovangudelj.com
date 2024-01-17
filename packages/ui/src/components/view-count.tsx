'use client'

import useSWR from 'swr'
import { Eye } from '@phosphor-icons/react'

import fetcher from '../lib/fetcher'

import { ViewCountSkeleton } from '.'

export const ViewCount = ({ message }: { message: string }) => {
  const { data, isLoading } = useSWR<{ count: number; error?: string }>('/api/viewCount', fetcher)

  if (isLoading) return <ViewCountSkeleton />

  if (!data) return null

  return (
    <div className="ui-ml-auto ui-inline-flex ui-items-center ui-gap-1 ui-self-stretch ui-overflow-hidden">
      <div className="ui-text-yellow/70 ui-relative ui-inline ui-max-w-full ui-truncate">
        {data.count}
        <span className="ui-absolute ui-h-px ui-w-px ui-whitespace-pre ui-border-none ui-opacity-0 [clip:rect(0,_0,_0,_0)]">
          {` ${message}`}
        </span>
      </div>
      <Eye size={16} className="ui-flex-none" />
    </div>
  )
}
