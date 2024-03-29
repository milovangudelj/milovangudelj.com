import { assertValue } from '~/sanity/utils/assertValue'

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-28'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const useCdn = process.env.NODE_ENV === 'production'

export const projectTitle = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_TITLE'
)

export const frontendUrl = assertValue(
  process.env.NEXT_PUBLIC_SANITY_FRONTEND_URL,
  'Missing environment variable: NEXT_PUBLIC_SANITY_FRONTEND_URL'
)
