import { defineArrayMember, defineField, defineType } from "sanity";

export const siteColors = defineType({
	name: "siteColors",
	title: "Site Colors",
	type: "document",
	fields: [
		defineField({
			name: "colors",
			title: "Site colors",
			type: "array",
			of: [
				defineArrayMember({
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
		}),
	],
});
