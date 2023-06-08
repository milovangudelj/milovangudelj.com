import { type SchemaTypeDefinition } from "sanity";

import { project, caseStudy, projectTag } from "~/sanity/schemas";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [project, caseStudy, projectTag],
};
