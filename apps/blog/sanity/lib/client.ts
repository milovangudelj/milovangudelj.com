import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '~/sanity/env'
import { PostPayload, SlimPostPayload } from '~/sanity/types'

import { postBySlugQuery, postPaths, postsQuery, slimPostsQuery } from './queries'

import { Locale } from '~/i18n.config'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})

export async function getPostBySlug({
  slug,
  lang = 'en',
}: {
  slug: string
  lang?: Locale
}): Promise<PostPayload> {
  return await client.fetch(postBySlugQuery, { slug, lang })
}

export async function getPosts(lang: Locale = 'en'): Promise<PostPayload[]> {
  return await client.fetch(postsQuery, { lang })
}

export async function getSlimPosts(lang: Locale = 'en'): Promise<SlimPostPayload[]> {
  return await client.fetch(slimPostsQuery, { lang })
}

export async function getPostPaths(): Promise<string[]> {
  return (await client.fetch(postPaths)) || []
}
