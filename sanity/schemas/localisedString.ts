import { defineType, defineField } from "sanity";

// Since schemas are code, we can programmatically build
// fields to hold translated values. We'll use this array
// of languages to determine which fields to define.
const supportedLanguages = [
	{ id: "en", title: "English", isDefault: true },
	{ id: "it", title: "Italian" },
];

export const baseLanguage = supportedLanguages.find((l) => l.isDefault);

export const localeString = defineType({
	title: "Localised string",
	name: "localisedString",
	type: "object",
	fieldsets: [
		{
			title: "Translations",
			name: "translations",
			options: { collapsible: true },
		},
	],
	fields: supportedLanguages.map((lang) =>
		defineField({
			title: lang.title,
			name: lang.id,
			type: "string",
			fieldset: lang.isDefault ? undefined : "translations",
		})
	),
});
