import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import {
	dashboardTool,
	sanityTutorialsWidget,
	projectUsersWidget,
	projectInfoWidget,
} from "@sanity/dashboard";

import {
	DeleteTranslationAction,
	documentInternationalization,
} from "@sanity/document-internationalization";
import { languageFilter } from "@sanity/language-filter";
import { colorInput } from "@sanity/color-input";
import { codeInput } from '@sanity/code-input'
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { vercelWidget } from "sanity-plugin-dashboard-widget-vercel";
import { media, mediaAssetSource } from "sanity-plugin-media";

import { defaultDocumentNode, structure } from "~/sanity/desk";
import { apiVersion, dataset, projectId, projectTitle } from "~/sanity/env";
import { schema } from "~/sanity/schema";
import {
	singletonTypes,
	singletonActions,
	i18nActions,
	i18nTypes,
} from "~/sanity/lib/singletons";

export default defineConfig({
  basePath: '/studio',
  title: projectTitle,
  projectId,
  dataset,
  schema,
  document: {
    actions: (input, { schemaType }) => {
      // For singleton types, filter out actions that are not explicitly included
      // in the `singletonActions`
      if (singletonTypes.has(schemaType)) {
        return input.filter(({ action }) => action && singletonActions.has(action))
      }

      // For i18n types, filter out actions that are not explicitly included
      // in the `i18nActions`
      if (i18nTypes.has(schemaType)) {
        return [
          ...input.filter(({ action }) => action && i18nActions.has(action)),
          DeleteTranslationAction,
        ]
      }

      return input
    },
  },
  plugins: [
    deskTool({
      structure,
      defaultDocumentNode,
    }),
    colorInput(),
    codeInput(),
    unsplashImageAsset(),
    media(),
    visionTool({ defaultApiVersion: apiVersion }),
    dashboardTool({
      widgets: [sanityTutorialsWidget(), projectInfoWidget(), projectUsersWidget(), vercelWidget()],
    }),
    documentInternationalization({
      // Required configuration
      supportedLanguages: [
        { id: 'en', title: '🇬🇧' },
        { id: 'it', title: '🇮🇹' },
      ],
      schemaTypes: ['project', 'caseStudy', 'post'],
    }),
    languageFilter({
      supportedLanguages: [
        { id: 'en', title: '🇬🇧' },
        { id: 'it', title: '🇮🇹' },
      ],
      defaultLanguages: ['en'],
      // Only show language filter for document type `page` (schemaType.name)
      // documentTypes: ['page'],
      filterField: (enclosingType, field, selectedLanguageIds) =>
        !enclosingType.name.startsWith('localisedString') ||
        selectedLanguageIds.includes(field.name),
    }),
  ],
  form: {
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
  },
})
