import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import {
	dashboardTool,
	sanityTutorialsWidget,
	projectUsersWidget,
	projectInfoWidget,
} from "@sanity/dashboard";

import { documentInternationalization } from "@sanity/document-internationalization";
import { languageFilter } from "@sanity/language-filter";
import { colorInput } from "@sanity/color-input";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { vercelWidget } from "sanity-plugin-dashboard-widget-vercel";
import { media, mediaAssetSource } from "sanity-plugin-media";

import { structure } from "~/sanity/desk";
import { apiVersion, dataset, projectId, projectTitle } from "~/sanity/env";
import { schema } from "~/sanity/schema";
import { singletonTypes, singletonActions } from "~/sanity/lib/singletons";

export default defineConfig({
	basePath: "/studio",
	title: projectTitle,
	projectId,
	dataset,
	schema,
	document: {
		// For singleton types, filter out actions that are not explicitly included
		// in the `singletonActions` list defined above
		actions: (input, context) =>
			singletonTypes.has(context.schemaType)
				? input.filter(
						({ action }) => action && singletonActions.has(action)
				  )
				: input,
	},
	plugins: [
		deskTool({
			structure,
		}),
		colorInput(),
		unsplashImageAsset(),
		media(),
		visionTool({ defaultApiVersion: apiVersion }),
		dashboardTool({
			widgets: [
				sanityTutorialsWidget(),
				projectInfoWidget(),
				projectUsersWidget(),
				vercelWidget(),
			],
		}),
		documentInternationalization({
			// Required configuration
			supportedLanguages: [
				{ id: "en", title: "English" },
				{ id: "it", title: "Italian" },
			],
			schemaTypes: ["project", "caseStudy"],
		}),
		languageFilter({
			supportedLanguages: [
				{ id: "en", title: "English" },
				{ id: "it", title: "Italian" },
			],
			defaultLanguages: ["en"],
			// Only show language filter for document type `page` (schemaType.name)
			// documentTypes: ['page'],
			filterField: (enclosingType, field, selectedLanguageIds) =>
				!enclosingType.name.startsWith("localisedString") ||
				selectedLanguageIds.includes(field.name),
		}),
	],
	form: {
		file: {
			assetSources: (previousAssetSources) => {
				return previousAssetSources.filter(
					(assetSource) => assetSource !== mediaAssetSource
				);
			},
		},
	},
});
