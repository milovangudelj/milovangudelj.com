import { type SchemaTypeDefinition } from 'sanity'

import { project } from "~/sanity/schemas";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [project],
};
