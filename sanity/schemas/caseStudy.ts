import { DocumentIcon, ImageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	name: "caseStudy",
	title: "Case Study",
	type: "document",
	icon: DocumentIcon,
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
			name: "subtitle",
			title: "Subtitle",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "intro",
			description:
				"Used both for the <meta> description tag for SEO, and project subheader.",
			title: "Intro",
			type: "array",
			of: [
				// Paragraphs
				defineArrayMember({
					marks: {
						decorators: [
							{
								title: "Italic",
								value: "em",
							},
							{
								title: "Strong",
								value: "strong",
							},
						],
					},
					type: "block",
				}),
			],
			validation: (rule) => rule.max(155).required(),
		}),
		defineField({
			name: "content",
			title: "CS content",
			type: "array",
			of: [
				defineArrayMember({
					type: "block",
					marks: {
						annotations: [
							{
								name: "link",
								type: "object",
								title: "Link",
								fields: [
									{
										name: "href",
										type: "url",
										title: "Url",
									},
								],
							},
						],
					},
				}),
				defineField({
					type: "image",
					icon: ImageIcon,
					name: "image",
					title: "Image",
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
							description:
								"Alternative text for screenreaders. Falls back on caption if not set",
						}),
					],
				}),
			],
		}),
		defineField({
			name: "color",
			title: "Color",
			type: "color",
			options: {
				colorList: [
					"#FFC700",
					"#F14E1C",
					"#0FAA58",
					"#5552FE",
					"#C6B9FF",
					"#A25AFF",
					"#FF8575",
					"#689BF9",
					"#B1EBD3",
				],
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "project",
			title: "Project",
			type: "reference",
			to: [{ type: "project" }],
			validation: (rule) => rule.required(),
		}),
	],
});
