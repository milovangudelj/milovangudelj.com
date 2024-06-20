import 'server-only'

import { draftMode } from 'next/headers'
import { FilteredResponseQueryOptions, type QueryParams } from 'next-sanity'

import { client as rawClient } from './client'

const DEFAULT_PARAMS = {} as QueryParams
const DEFAULT_TAGS = [] as string[]

export const token = process.env.SANITY_PREVIEW_TOKEN

// Alternative to `client.fetch` that uses the preview token
const preview = <R = any>(
  query: string,
  params: QueryParams | undefined = DEFAULT_PARAMS,
  options: FilteredResponseQueryOptions | undefined = {}
): Promise<R> => {
  if (!token && !options.token) {
    throw new Error('The `SANITY_PREVIEW_TOKEN` environment variable is required.')
  }

  return rawClient
    .withConfig({
      useCdn: false,
      perspective: 'previewDrafts',
      token: options.token ?? token,
      stega: true,
    })
    .fetch<R>(query, params, {
      cache: 'no-store',
      next: {
        tags: options.next?.tags ?? DEFAULT_TAGS,
      },
    })
}

const client = {
  ...rawClient,
  preview,
  fetch: rawClient.fetch.bind(rawClient),
}

// Query helpers

export const getData = async <T>(
  query: string,
  params: QueryParams = {},
  tags: string[] = []
): Promise<T> => {
  const isDraftMode = draftMode().isEnabled
  const isProduction = process.env.NODE_ENV === 'production'

  const fetcher = !isProduction || isDraftMode ? client.preview : client.fetch

  const data = await fetcher<T>(query, params, {
    cache: 'default',
    next: {
      tags,
    },
  })

  return data
}