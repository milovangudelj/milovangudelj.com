import { groq } from "next-sanity";

export const siteNavigationQuery = groq`
  *[_type == "siteNavigation" && _id == "siteNavigation"][0]{
    "links": links[]{
      _key,
      url,
      "label": label[$lang],
    }
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][language == $lang || count(*[_type == "translation.metadata" && references(^._id)]) == 0][0] {
    title,
  }
`;

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
`;

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
`;

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
`;

export const projectPaths = groq`
  *[_type == "project" && language == "en" && slug.current != null].slug.current
`;

export const caseStudyPaths = groq`
  *[_type == "caseStudy" && language == "en"].project->slug.current
`;

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
`;
