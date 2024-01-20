import { SanityClient, createClient } from 'next-sanity'

import { type Locale } from '@repo/i18n'

import {
  ProjectPayload,
  CaseStudyPayload,
  SlimProjectPayload,
  PosterPayload,
  SiteNavigationPayload,
} from './types'

import {
  projectBySlugQuery,
  projectPaths,
  projectsQuery,
  caseStudyBySlugQuery,
  caseStudyPaths,
  slimProjectsQuery,
  postersQuery,
  siteNavigationQuery,
} from './queries'

export const client: SanityClient = createClient({
  apiVersion: '2023-05-28',
  projectId: 'b92e2bev',
  dataset: 'production',
  useCdn: process.env.NODE_ENV === 'production',
})

export async function getSiteNavigation({
  lang,
}: {
  lang: Locale
}): Promise<SiteNavigationPayload> {
  return await client.fetch(siteNavigationQuery, { lang })
}

export async function getProjectBySlug({
  slug,
  lang = 'en',
}: {
  slug: string
  lang?: Locale
}): Promise<ProjectPayload | undefined> {
  return await client.fetch(projectBySlugQuery, { slug, lang })
}

export async function getProjects(lang: Locale = 'en'): Promise<ProjectPayload[]> {
  return await client.fetch(projectsQuery, { lang })
}

export async function getSlimProjects(lang: Locale = 'en'): Promise<SlimProjectPayload[]> {
  return await client.fetch(slimProjectsQuery, { lang })
}

export async function getCaseStudyBySlug({
  slug,
  lang = 'en',
}: {
  slug: string
  lang?: Locale
}): Promise<CaseStudyPayload> {
  return await client.fetch(caseStudyBySlugQuery, { slug, lang })
}

export async function getProjectPaths(): Promise<string[]> {
  return (await client.fetch(projectPaths)) || []
}

export async function getCaseStudyPaths(): Promise<string[]> {
  return (await client.fetch(caseStudyPaths)) || []
}

export async function getPosters(): Promise<PosterPayload[]> {
  return await client.fetch(postersQuery)
}
