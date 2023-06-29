import { File } from "@phosphor-icons/react";
import {
	SlugValidationContext,
	defineArrayMember,
	defineField,
	defineType,
} from "sanity";

const LANGUAGES = { en: "🇬🇧", it: "🇮🇹" };

export const project = defineType({
	name: "project",
	title: "Project",
	type: "document",
	icon: File as any,
	// Uncomment below to have edits publish automatically as you type
	// liveEdit: true,
	fields: [
		defineField({
			name: "language",
			type: "string",
			readOnly: true,
			hidden: true,
		}),
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
				isUnique: isUniqueOtherThanLanguage,
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "year",
			title: "Year",
			type: "number",
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
	],
	preview: {
		select: {
			imageUrl: "cover.asset.url",
			title: "title",
			language: "language",
		},
		prepare(selection) {
			const { imageUrl, title, language } = selection;
			return {
				imageUrl,
				title: `${LANGUAGES[language as "en" | "it"]} ${title}`,
			};
		},
	},
});

export async function isUniqueOtherThanLanguage(
	slug: string,
	context: SlugValidationContext
) {
	const { document, getClient } = context;

	if (!document?.language) return true;

	const client = getClient({ apiVersion: "2023-04-24" });
	const id = document._id.replace(/^drafts\./, "");
	const params = {
		draft: `drafts.${id}`,
		published: id,
		language: document.language,
		slug,
	};
	const query = `!defined(*[
	  !(_id in [$draft, $published]) &&
	  slug.current == $slug &&
	  language == $language
	][0]._id)`;
	const result = await client.fetch(query, params);
	return result;
}
