import { Tag } from "@phosphor-icons/react";
import { defineField, defineType } from "sanity";

export const projectTag = defineType({
	name: "projectTag",
	title: "Project Tag",
	type: "document",
	icon: Tag as any,
	// Uncomment below to have edits publish automatically as you type
	// liveEdit: true,
	fields: [
		defineField({
			name: "value",
			title: "Value",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "string",
			validation: (rule) => rule.max(155).required(),
		}),
	],
});
