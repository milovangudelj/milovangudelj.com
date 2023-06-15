import { ImageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	name: "poster",
	title: "Poster",
	type: "document",
	icon: ImageIcon as any,
	// Uncomment below to have edits publish automatically as you type
	// liveEdit: true,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "image",
			title: "Poster Image",
			type: "image",
			options: {
				hotspot: true,
			},
			preview: {
				select: {
					imageUrl: "asset.url",
					title: "caption",
				},
			},
			fields: [
				defineField({
					title: "Caption",
					name: "caption",
					type: "string",
				}),
				defineField({
					name: "alt",
					type: "string",
					title: "Alt text",
					description: "Alternative text for screenreaders.",
				}),
			],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "day",
			title: "Day",
			type: "number",
		}),
	],
});
