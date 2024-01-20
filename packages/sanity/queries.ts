import { groq } from 'next-sanity'
import { type Locale } from '@repo/i18n'

import { client } from './client'

export const siteNavigationQuery = groq`
  *[_type == "siteNavigation" && _id == "siteNavigation"][0]{
    "links": links[]{
      _key,
      url,
      "label": label[$lang],
    }
  }
`
export interface SiteNavigationPayload {
  links: {
    label: string
    url: string
    _key: string
  }[]
}
export async function getSiteNavigation({
  lang,
}: {
  lang: Locale
}): Promise<SiteNavigationPayload> {
  return await client.fetch(siteNavigationQuery, { lang })
}
