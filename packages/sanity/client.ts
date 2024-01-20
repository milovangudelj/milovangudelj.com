import { QueryParams, SanityClient, createClient } from 'next-sanity'
import { draftMode } from 'next/headers'

const DEFAULT_PARAMS = {} as QueryParams
const DEFAULT_TAGS = [] as string[]

export const rawClient: SanityClient = createClient({
  apiVersion: '2023-05-28',
  projectId: 'b92e2bev',
  dataset: 'production',
  useCdn: process.env.NODE_ENV === 'production',
})

// Alternative to `client.fetch` that uses the preview token
const preview = <QueryResponse>(
  query: string,
  {
    params = DEFAULT_PARAMS,
    tags = DEFAULT_TAGS,
  }: {
    params?: QueryParams
    tags?: string[]
  },
  token?: string
): Promise<QueryResponse> => {
  const isDraftMode = draftMode().isEnabled

  if (isDraftMode && !token) {
    throw new Error('The `NEXT_PUBLIC_PREVIEW_TOKEN` environment variable is required.')
  }

  const isDevelopment = process.env.NODE_ENV === 'development'

  return rawClient
    .withConfig({ useCdn: isDraftMode ? false : true })
    .fetch<QueryResponse>(query, params, {
      cache: isDevelopment || isDraftMode ? undefined : 'force-cache',
      ...(isDraftMode && {
        token: token,
        perspective: 'previewDrafts',
      }),
      next: {
        revalidate: isDraftMode ? 0 : undefined,
        tags,
      },
    })
}

// Client object extended with the preview function
const client = Object.assign(rawClient, { preview })
export { client }
