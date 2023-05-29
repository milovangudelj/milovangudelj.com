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

import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { vercelWidget } from "sanity-plugin-dashboard-widget-vercel";
import { media, mediaAssetSource } from "sanity-plugin-media";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schema } from "@/sanity/schema";

export default defineConfig({
	basePath: "/studio",
	projectId,
	dataset,
	// Add and edit the content schema in the './sanity/schema' folder
	schema,
	plugins: [
		deskTool(),
		// Add an image asset source for Unsplash
		unsplashImageAsset(),
		// Vision lets you query your content with GROQ in the studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
		media(),
		dashboardTool({
			widgets: [
				sanityTutorialsWidget(),
				projectInfoWidget(),
				projectUsersWidget(),
				vercelWidget(),
			],
		}),
	],
	form: {
		// Don't use this plugin when selecting files only (but allow all other enabled asset sources)
		file: {
			assetSources: (previousAssetSources) => {
				return previousAssetSources.filter(
					(assetSource) => assetSource !== mediaAssetSource
				);
			},
		},
	},
});
