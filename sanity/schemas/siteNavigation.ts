import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	name: "siteNavigation",
	title: "Site Navigation",
	type: "document",
	fields: [
		defineField({
			name: "links",
			title: "Navigation Links",
			type: "array",
			of: [
				defineArrayMember({
					name: "link",
					title: "Nav Link",
					type: "string",
				}),
			],
		}),
	],
});
