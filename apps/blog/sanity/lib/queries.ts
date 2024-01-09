import { groq } from 'next-sanity'

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

export const postPaths = groq`
  *[_type == "post" && language == "en" && slug.current != null] | order(publishedAt desc).slug.current
`