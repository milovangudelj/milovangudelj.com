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
  options: FilteredResponseQueryOptions = {}
): Promise<R> => {
  const isDraftMode = draftMode().isEnabled

  if (isDraftMode && !token && !options.token) {
    throw new Error('The `SANITY_PREVIEW_TOKEN` environment variable is required.')
  }

  const isDevelopment = process.env.NODE_ENV === 'development'

  return rawClient.withConfig({ useCdn: isDraftMode ? false : true }).fetch<R>(query, params, {
    cache: isDevelopment || isDraftMode ? 'no-store' : 'default',
    ...(isDraftMode
      ? {
          token: token ?? options.token,
          perspective: 'previewDrafts',
        }
      : {
          perspective: 'published',
        }),
    next: {
      revalidate: isDraftMode ? 0 : undefined,
      tags: (options.next as any)?.tags ?? DEFAULT_TAGS,
    } as any,
  })
}

const client = {
  ...rawClient,
  preview,
  fetch: rawClient.fetch.bind(rawClient),
}

// Query helpers

export const getData = async <T>(query: string, params: QueryParams = {}, tags: string[] = []) => {
  const fetcher = draftMode().isEnabled ? client.preview : (client.fetch as typeof rawClient.fetch)

  const data = await fetcher<T>(query, params, {
    next: {
      tags,
    } as any,
  })

  return data
}