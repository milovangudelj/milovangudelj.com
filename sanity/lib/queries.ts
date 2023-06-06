import { groq } from "next-sanity";

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    title,
  }
`;

export const projectsQuery = groq`
  *[_type == "project"][0..2] {
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

export const caseStudyBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0].caseStudy->{
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
  *[_type == "project" && slug.current != null].slug.current
`;

export const caseStudyPaths = groq`
  *[_type == "caseStudy"].project->slug.current
`;
