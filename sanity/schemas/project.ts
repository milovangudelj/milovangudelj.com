import { DocumentIcon, ImageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	name: "project",
	title: "Project",
	type: "document",
	icon: DocumentIcon,
	// Uncomment below to have edits publish automatically as you type
	// liveEdit: true,
	fields: [
		defineField({
			name: "title",
			description: "This field is the title of your project.",
			title: "Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
				isUnique: (value, context) =>
					context.defaultIsUnique(value, context),
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "caseStudy",
			title: "Case Study",
			type: "reference",
			to: [{ type: "caseStudy" }],
		}),
		defineField({
			name: "overview",
			description:
				"Used both for the <meta> description tag for SEO, and project subheader.",
			title: "Overview",
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
					styles: [],
					type: "block",
				}),
			],
			validation: (rule) => rule.max(155).required(),
		}),
		defineField({
			name: "cover",
			title: "Cover Image",
			description:
				"This image will be used as the cover image for the project.",
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
					description:
						"Alternative text for screenreaders. Falls back on caption if not set",
				}),
			],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "client",
			title: "Client",
			type: "string",
		}),
		defineField({
			name: "site",
			title: "Site",
			type: "url",
		}),
		defineField({
			name: "tags",
			title: "Tags",
			type: "array",
			of: [
				defineArrayMember({
					type: "reference",
					to: { type: "projectTag" },
				}),
			],
			options: {
				layout: "tags",
			},
			validation: (rule) => rule.required(),
		}),
	],
});
