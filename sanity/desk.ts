import {
	File,
	Folder,
	Gear,
	Image,
	Link,
	Palette,
	Tag,
} from "@phosphor-icons/react";
import { StructureResolver } from "sanity/desk";

export const structure: StructureResolver = (S, context) => {
	console.log(context); // returns { currentUser, dataset, projectId, schema, getClient, documentStore }

	return S.list()
		.title("Content")
		.items([
			S.listItem()
				.title("Settings")
				.icon(Folder as any)
				.child(
					S.list()
						.title("Settings Documents")
						.items([
							S.listItem()
								.title("Site Settings")
								.child(
									S.document()
										.title("Site Settings")
										.schemaType("siteSettings")
										.documentId("siteSettings")
								)
								.icon(Gear as any),
							S.listItem()
								.title("Site Navigation")
								.child(
									S.document()
										.title("Site Navigation")
										.schemaType("siteNavigation")
										.documentId("siteNavigation")
								)
								.icon(Link as any),
							S.listItem()
								.title("Site Colors")
								.child(
									S.document()
										.title("Site Colors")
										.schemaType("siteColors")
										.documentId("siteColors")
								)
								.icon(Palette as any),
						])
				),
			S.divider(),
			S.listItem()
				.title("Projects")
				.schemaType("project")
				.child(S.documentTypeList("project").title("Projects"))
				.icon(File as any),
			S.listItem()
				.title("Case Studies")
				.schemaType("caseStudy")
				.child(S.documentTypeList("caseStudy").title("Case Studies"))
				.icon(File as any),
			S.divider(),
			S.listItem()
				.title("Project Tags")
				.schemaType("projectTag")
				.child(S.documentTypeList("projectTag").title("Project Tags"))
				.icon(Tag as any),
			S.listItem()
				.title("Media Tags")
				.schemaType("media.tag")
				.child(
					S.documentTypeList("media.tag")
						.title("Media Tags")
						.showIcons(false)
				)
				.icon(Tag as any),
			S.divider(),
			S.listItem()
				.title("Poster")
				.schemaType("poster")
				.child(S.documentTypeList("poster").title("Poster"))
				.icon(Image as any),
		])
		.showIcons(true);
};
