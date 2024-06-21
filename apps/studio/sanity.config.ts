import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'

import {
  DeleteTranslationAction,
  documentInternationalization,
} from '@sanity/document-internationalization'
import { languageFilter } from '@sanity/language-filter'
import { colorInput } from '@sanity/color-input'
import { codeInput } from '@sanity/code-input'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { mediaAssetSource } from 'sanity-plugin-media'

import { defaultDocumentNode, structure } from '~/sanity/desk'
import { apiVersion, dataset, projectId } from '~/sanity/env'
import { schema } from '~/sanity/schema'
import { singletonTypes, singletonActions, i18nActions, i18nTypes } from '~/sanity/lib/singletons'
import { createExtendedPublishAction } from '~/sanity/lib/actions'
import { csSession } from '~/sanity/plugins/cross-site-session'

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
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: `${process.env.NEXT_PUBLIC_SANITY_FRONTEND_URL}/api/preview`,
        },
      },
    }),
    colorInput(),
    codeInput(),
    unsplashImageAsset(),
    // media(),
    visionTool({ defaultApiVersion: apiVersion }),
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
