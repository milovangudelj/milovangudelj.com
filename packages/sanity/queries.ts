import { groq } from 'next-sanity'
import { type Image, type Reference } from 'sanity'
import { type PortableTextBlock } from '@portabletext/types'

// Site Navigation

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

// Projects

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][language == $lang || count(*[_type == "translation.metadata" && references(^._id)]) == 0][0] {
    title,
  }
`
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

export const projectsQuery = groq`
  *[_type == "project" && (language == $lang || count(*[_type == "translation.metadata" && references(^._id)]) == 0)] {
    title,
    "slug": slug.current,
    year,
    site,
    "cover": {
      "image": cover,
      "lqip": cover.asset->metadata.lqip,
      "width": cover.asset->metadata.dimensions.width,
      "height": cover.asset->metadata.dimensions.height,
    },
    overview,
    "color": color.hex,
    client,
    "tags": tags[]->value,
    caseStudy,
  }
`

export const slimProjectsQuery = groq`
  *[_type == "project" && (language == $lang || count(*[_type == "translation.metadata" && references(^._id)]) == 0)] {
    title,
    "slug": slug.current,
    site,
    "cover": {
      "image": cover,
      "lqip": cover.asset->metadata.lqip,
      "width": cover.asset->metadata.dimensions.width,
      "height": cover.asset->metadata.dimensions.height,
    },
  }
`

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

// Case Studies

export const caseStudyBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][language == $lang || count(*[_type == "translation.metadata" && references(^._id)]) == 0][0].caseStudy->{
    title,
    subtitle,
    intro,
    "body": content[]{
      _type == 'image' => @{
        _key,
        _type,
        caption,
        alt,
        hotspot,
        crop,
        asset->,
      },
      _type != 'image' => @,
    },
    "color": project->color.hex,
    "cover": {
      "image": cover,
      "lqip": cover.asset->metadata.lqip,
      "width": cover.asset->metadata.dimensions.width,
      "height": cover.asset->metadata.dimensions.height,
    }
  }
`

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

// Posters

export const postersQuery = groq`
  *[_type == "poster"] | order(_createdAt asc)[0..7] {
    title,
    day,
    "image": {
      "image": image,
      "lqip": image.asset->metadata.lqip,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
    },
  }
`

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

// Paths

export const projectPaths = groq`
  *[_type == "project" && language == "en" && slug.current != null].slug.current
`

export const caseStudyPaths = groq`
*[_type == "caseStudy" && language == "en"].project->slug.current
`
