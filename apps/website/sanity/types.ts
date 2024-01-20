import type { PortableTextBlock } from '@portabletext/types'
import type { Image, Reference } from 'sanity'

export interface SiteNavigationPayload {
  links: {
    label: string
    url: string
    _key: string
  }[]
}

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
}

export interface ProjectPayload {
  title: string
  slug: string
  year: number
  site: string
  cover: {
    image: Image & {
      alt: string
      caption: string
    }
    lqip: string
    width: number
    height: number
  }
  overview: PortableTextBlock[]
  color: string
  client: string
  tags: string[]
  caseStudy: Reference | null
}

export interface SlimProjectPayload {
  title: string
  slug: string
  site: string
  cover: {
    image: Image & {
      alt: string
      caption: string
    }
    lqip: string
    width: number
    height: number
  }
}

export interface CaseStudyPayload {
  title: string
  subtitle: string
  intro: PortableTextBlock[]
  body: PortableTextBlock[]
  color: string
  cover: {
    image: Image & {
      alt: string
      caption: string
    }
    lqip: string
    width: number
    height: number
  }
}

export interface PosterPayload {
  title: string
  day: number
  image: {
    image: Image & {
      alt: string
      caption: string
    }
    lqip: string
    width: number
    height: number
  }
}
