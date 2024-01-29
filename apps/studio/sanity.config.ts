import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import {
  dashboardTool,
  sanityTutorialsWidget,
  projectUsersWidget,
  projectInfoWidget,
} from '@sanity/dashboard'

import {
  DeleteTranslationAction,
  documentInternationalization,
} from '@sanity/document-internationalization'
import { languageFilter } from '@sanity/language-filter'
import { colorInput } from '@sanity/color-input'
import { codeInput } from '@sanity/code-input'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { vercelWidget } from 'sanity-plugin-dashboard-widget-vercel'
import { media, mediaAssetSource } from 'sanity-plugin-media'

import { defaultDocumentNode, structure } from './desk'
import { apiVersion, dataset, projectId } from './env'
import { schema } from './schema'
import { singletonTypes, singletonActions, i18nActions, i18nTypes } from './lib/singletons'
import { createExtendedPublishAction } from './lib/actions'
import { csSession } from './plugins/cross-site-session'

export default defineConfig({
  name: 'default',
  title: 'milovangudelj.com',
  auth: {
    loginMethod: 'token',
  },

  projectId: projectId,
  dataset: dataset,

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

      // For posts modify the publish action to set the publishedAt field
      if (schemaType === 'post') {
        return input.map((originalAction) =>
          originalAction.action === 'publish'
            ? createExtendedPublishAction(originalAction)
            : originalAction
        )
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
    csSession(),
  ],
  form: {
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
  },
})
