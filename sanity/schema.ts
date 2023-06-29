import { SchemaPluginOptions, type SchemaTypeDefinition } from "sanity";

import { singletonTypes } from "~/sanity/lib/singletons";

import {
	localeString,
	siteSettings,
	siteNavigation,
	siteColors,
	project,
	caseStudy,
	projectTag,
	poster,
} from "~/sanity/schemas";

export const schema: SchemaPluginOptions = {
	types: [
		localeString,
		siteSettings,
		siteNavigation,
		siteColors,
		project,
		caseStudy,
		projectTag,
		poster,
	],
	// Filter out singleton types from the global “New document” menu options
	templates: (templates) =>
		templates.filter(
			({ schemaType, id }) =>
				!singletonTypes.has(schemaType) &&
				!["project", "caseStudy"].includes(schemaType)
		),
};
