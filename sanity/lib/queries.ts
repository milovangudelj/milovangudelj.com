import { groq } from "next-sanity";

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    title,
  }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0].caseStudy->{
    title,
    subtitle,
    intro,
    content,
    "color": color.hex,
    "coverImage": project->coverImage
  }
`;

export const projectPaths = groq`
  *[_type == "project" && slug.current != null].slug.current
`;

export const caseStudyPaths = groq`
  *[_type == "caseStudy"].project->slug.current
`;
