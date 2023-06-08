/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import {
	dashboardTool,
	sanityTutorialsWidget,
	projectUsersWidget,
	projectInfoWidget,
} from "@sanity/dashboard";

import { languageFilter } from "@sanity/language-filter";
import { colorInput } from "@sanity/color-input";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { vercelWidget } from "sanity-plugin-dashboard-widget-vercel";
import { media, mediaAssetSource } from "sanity-plugin-media";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId, projectTitle } from "~/sanity/env";
import { schema } from "~/sanity/schema";

export default defineConfig({
	basePath: "/studio",
	title: projectTitle,
	projectId,
	dataset,
	// Add and edit the content schema in the './sanity/schema' folder
	schema,
	plugins: [
		deskTool(),
		colorInput(),
		// Add an image asset source for Unsplash
		unsplashImageAsset(),
		// Vision lets you query your content with GROQ in the studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
		dashboardTool({
			widgets: [
				sanityTutorialsWidget(),
				projectInfoWidget(),
				projectUsersWidget(),
				vercelWidget(),
			],
		}),
		languageFilter({
			supportedLanguages: [
				{ id: "en", title: "English" },
				{ id: "it", title: "Italian" },
			],
			// Select English by default
			defaultLanguages: ["en"],
			// Only show language filter for document type `page` (schemaType.name)
			// documentTypes: ['page'],
			filterField: (enclosingType, field, selectedLanguageIds) =>
				!enclosingType.name.startsWith("locale") ||
				selectedLanguageIds.includes(field.name),
		}),
	],
});
