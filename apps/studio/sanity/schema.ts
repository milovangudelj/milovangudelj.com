import { SchemaPluginOptions, type SchemaTypeDefinition } from 'sanity'

import { singletonTypes } from '~/sanity/lib/singletons'

import {
  localeString,
  siteSettings,
  siteNavigation,
  siteColors,
  project,
  post,
  caseStudy,
  projectTag,
  postTag,
  poster,
  page,
} from './schemas'

export const schema: SchemaPluginOptions = {
  types: [
    localeString,
    siteSettings,
    siteNavigation,
    siteColors,
    page,
    project,
    post,
    caseStudy,
    projectTag,
    postTag,
    poster,
  ],
  // Filter out singleton types from the global “New document” menu options
  templates: (prev) =>
    prev.filter(
      ({ schemaType, id }) =>
        !singletonTypes.has(schemaType) && !['project', 'caseStudy', 'post'].includes(id)
    ),
}
