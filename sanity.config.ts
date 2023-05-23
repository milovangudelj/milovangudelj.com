import { visionTool } from "@sanity/vision";

import {
	dashboardTool,
	sanityTutorialsWidget,
	projectUsersWidget,
	projectInfoWidget,
} from "@sanity/dashboard";

import { defineConfig, ObjectDefinition } from "sanity";
import { deskTool } from "sanity/desk";

import { previewDocumentNode } from "./sanity/plugins/previewPane";
import { productionUrl } from "./sanity/plugins/productionUrl";
import { pageStructure, singletonPlugin } from "./sanity/plugins/settings";

import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { vercelWidget } from "sanity-plugin-dashboard-widget-vercel";
import { media } from "sanity-plugin-media";

import {
	apiVersion,
	dataset,
	projectId,
	previewSecretId,
	projectTitle,
} from "./sanity/env";
import { schema } from "./sanity/schema";

import page from "./sanity/schemas/documents/page";
import project from "./sanity/schemas/documents/project";
import duration from "./sanity/schemas/objects/duration";
import milestone from "./sanity/schemas/objects/milestone";
import timeline from "./sanity/schemas/objects/timeline";
import home from "./sanity/schemas/singletons/home";
import settings from "./sanity/schemas/singletons/settings";

export const PREVIEWABLE_DOCUMENT_TYPES: string[] = [
	home.name,
	page.name,
	project.name,
];

export default defineConfig({
	basePath: "/studio",
	projectId,
	dataset,
	title: projectTitle,
	schema: {
		// If you want more content types, you can add them to this array
		types: [
			// Singletons
			home,
			settings,
			// Documents
			duration,
			page,
			project,
			// Objects
			milestone,
			timeline as ObjectDefinition,
		],
	},
	plugins: [
		deskTool({
			structure: pageStructure([home, settings]),
			// `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
			defaultDocumentNode: previewDocumentNode({
				apiVersion,
				previewSecretId,
			}),
		}),
		// Configures the global "new document" button, and document actions, to suit the Settings document singleton
		singletonPlugin([home.name, settings.name]),
		// Add the "Open preview" action
		productionUrl({
			apiVersion,
			previewSecretId,
			types: PREVIEWABLE_DOCUMENT_TYPES,
		}),
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
	],
});
