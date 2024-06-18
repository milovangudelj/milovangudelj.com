import { Desktop } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

import { isUniqueOtherThanLanguage } from '~/sanity/utils/isUniqueOtherThanLanguage'
import { LANGUAGES } from '~/sanity/utils/languages'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: Desktop,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: isUniqueOtherThanLanguage,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (rule) => rule.required().max(65),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'ogImage.asset',
      title: 'title',
      language: 'language',
    },
    prepare(selection) {
      const { media, title, language } = selection
      return {
        media,
        title,
        subtitle: LANGUAGES.find((lang) => lang.id === language)?.id.toLocaleUpperCase(),
      }
    },
  },
})
