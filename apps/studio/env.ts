import { assertValue } from '../website/utils/assertValue'

export const apiVersion = process.env.SANITY_STUDIO_API_VERSION || '2023-05-28'

export const dataset = assertValue(
  process.env.SANITY_STUDIO_DATASET,
  'Missing environment variable: SANITY_STUDIO_DATASET'
)

export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  'Missing environment variable: SANITY_STUDIO_PROJECT_ID'
)

export const useCdn = process.env.NODE_ENV === 'production'

export const projectTitle = assertValue(
  process.env.SANITY_STUDIO_PROJECT_TITLE,
  'Missing environment variable: SANITY_STUDIO_PROJECT_TITLE'
)

export const frontendUrl = assertValue(
  process.env.SANITY_STUDIO_FRONTEND_URL,
  'Missing environment variable: SANITY_STUDIO_FRONTEND_URL'
)
