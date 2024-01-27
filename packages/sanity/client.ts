import { type SanityClient, createClient } from 'next-sanity'

export const client: SanityClient = createClient({
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  perspective: 'published',
})
