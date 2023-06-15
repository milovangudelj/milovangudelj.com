import { type SchemaTypeDefinition } from "sanity";

import { project, caseStudy, projectTag, poster } from "~/sanity/schemas";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [project, caseStudy, projectTag, poster],
};
