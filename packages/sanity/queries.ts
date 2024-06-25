import { groq } from 'next-sanity'
import { type Image, type ImageAsset, type Reference } from 'sanity'
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

// Page metadata

export const pageMetadataQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    description,
    'ogImage': ogImage.asset->
  }
`
export interface PageMetadataPayload {
  title: {
    en: string
    it: string
  }
  description: {
    en: string
    it: string
  }
  ogImage: ImageAsset
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
  *[_type == "project" && showcase == true && (language == $lang || count(*[_type == "translation.metadata" && references(^._id)]) == 0)] | order(year desc) {
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
    "caseStudy": select(
      caseStudy->showcase == true => caseStudy,
      null
    ),
  }
`

export const slimProjectsQuery = groq`
  *[_type == "project" && showcase == true && (language == $lang || count(*[_type == "translation.metadata" && references(^._id)]) == 0)] | order(year desc) {
    _id,
    title,
    "slug": slug.current,
    site,
    year,
    "cover": {
      "image": cover,
      "lqip": cover.asset->metadata.lqip,
      "width": cover.asset->metadata.dimensions.width,
      "height": cover.asset->metadata.dimensions.height,
    },
  }
`

export interface SlimProjectPayload {
  _id: string
  title: string
  slug: string
  site: string
  year: number
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
  *[_type == "project" && showcase == true && slug.current == $slug][showcase == true][language == $lang || count(*[_type == "translation.metadata" && references(^._id)]) == 0][0].caseStudy->{
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

// Posts

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][language == $lang || count(*[_type == "translation.metadata" && references(^._id)]) == 0][0] {
    title,
    "slug": slug.current,
    "cover": {
      "image": cover,
      "lqip": cover.asset->metadata.lqip,
      "width": cover.asset->metadata.dimensions.width,
      "height": cover.asset->metadata.dimensions.height,
    },
    intro,
    "body": body[]{
      _type == 'image' => @{
        _key,
        _type,
        alt,
        hotspot,
        crop,
        asset->,
      },
      _type != 'image' => @,
    },
    "tags": tags[]->value,
  }
`

export const postsQuery = groq`
  *[_type == "post" && (language == $lang || count(*[_type == "translation.metadata" && references(^._id)]) == 0)] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    "cover": {
      "image": cover,
      "lqip": cover.asset->metadata.lqip,
      "width": cover.asset->metadata.dimensions.width,
      "height": cover.asset->metadata.dimensions.height,
    },
    intro,
    "body": body[]{
      _type == 'image' => @{
        _key,
        _type,
        alt,
        hotspot,
        crop,
        asset->,
      },
      _type != 'image' => @,
    },
    "tags": tags[]->value,
  }
`

export interface PostPayload {
  title: string
  slug: string
  cover: {
    image: Image & {
      alt: string
      caption: string
    }
    lqip: string
    width: number
    height: number
  }
  intro: PortableTextBlock[]
  body: PortableTextBlock[]
  tags: string[]
}

export const slimPostsQuery = groq`
*[_type == "post" && (language == $lang || count(*[_type == "translation.metadata" && references(^._id)]) == 0)] | order(publishedAt desc)[0..2] {
  title,
  "slug": slug.current,
  "cover": {
    "image": cover,
    "lqip": cover.asset->metadata.lqip,
    "width": cover.asset->metadata.dimensions.width,
    "height": cover.asset->metadata.dimensions.height,
  },
}
`

export interface SlimPostPayload {
  title: string
  slug: string
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

// Paths

export const projectPaths = groq`
  *[_type == "project" && showcase == true && language == "en" && slug.current != null].slug.current
`

export const caseStudyPaths = groq`
*[_type == "caseStudy" && language == "en" && project->showcase == true && showcase == true].project->slug.current
`

export const caseStudyExistsAndIsPublished = groq`
*[_type == "caseStudy" && language == "en" && project->slug.current == $slug && showcase == true][0]._id
`

export const postPaths = groq`
  *[_type == "post" && language == "en" && slug.current != null] | order(publishedAt desc).slug.current
`
