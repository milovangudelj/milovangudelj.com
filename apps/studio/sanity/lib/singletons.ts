// Define the actions that should be available for singleton documents
export const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
export const singletonTypes = new Set(['siteSettings', 'siteNavigation', 'siteColors'])

// Define the actions that should be available for internationalised documents
export const i18nActions = new Set([
  'discardChanges',
  'duplicate',
  'publish',
  'restore',
  'unpublish',
])

// Internationalised types
export const i18nTypes = new Set(['project', 'caseStudy', 'post'])
