import 'server-only'

import { draftMode } from 'next/headers'
import { FilteredResponseQueryOptions, type QueryParams } from 'next-sanity'

import { client as rawClient } from './client'

import {
  type CaseStudyPayload,
  type PosterPayload,
  type ProjectPayload,
  type SiteNavigationPayload,
  type SlimProjectPayload,
  caseStudyBySlugQuery,
  caseStudyPaths,
  postersQuery,
  projectBySlugQuery,
  projectPaths,
  projectsQuery,
  siteNavigationQuery,
  slimProjectsQuery,
  postBySlugQuery,
  postsQuery,
  slimPostsQuery,
  postPaths,
  PostPayload,
  SlimPostPayload,
} from './queries'
import { Locale } from '@repo/i18n'

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
    cache: isDevelopment || isDraftMode ? undefined : 'force-cache',
    ...(isDraftMode && {
      token: token ?? options.token,
      perspective: 'previewDrafts',
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

export async function getSiteNavigation({ lang = 'en' }: { lang?: Locale }) {
  return await getData<SiteNavigationPayload>(siteNavigationQuery, { lang })
}

export async function getProjectBySlug({ slug, lang = 'en' }: { slug: string; lang?: Locale }) {
  return await getData<ProjectPayload>(projectBySlugQuery, { slug, lang })
}

export async function getProjects({ lang = 'en' }: { lang?: Locale }) {
  return await getData<ProjectPayload[]>(projectsQuery, { lang })
}

export async function getSlimProjects({ lang = 'en' }: { lang?: Locale }) {
  return await getData<SlimProjectPayload[]>(slimProjectsQuery, { lang })
}

export async function getCaseStudyBySlug({ slug, lang = 'en' }: { slug: string; lang?: Locale }) {
  return await getData<CaseStudyPayload>(caseStudyBySlugQuery, { slug, lang })
}

export async function getPosters() {
  return await getData<PosterPayload[]>(postersQuery)
}

export async function getPostBySlug({ slug, lang = 'en' }: { slug: string; lang?: Locale }) {
  return await getData<PostPayload>(postBySlugQuery, { slug, lang })
}

export async function getPosts({ lang = 'en' }: { lang?: Locale }) {
  return await getData<PostPayload[]>(postsQuery, { lang })
}

export async function getSlimPosts({ lang = 'en' }: { lang?: Locale }) {
  return await getData<SlimPostPayload[]>(slimPostsQuery, { lang })
}

// Paths

export async function getProjectPaths() {
  return (await rawClient.fetch<string[]>(projectPaths)) || []
}

export async function getCaseStudyPaths() {
  return (await rawClient.fetch<string[]>(caseStudyPaths)) || []
}

export async function getPostPaths() {
  return (await rawClient.fetch<string[]>(postPaths)) || []
}
