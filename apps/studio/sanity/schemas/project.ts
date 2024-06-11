import { File } from '@phosphor-icons/react'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { isUniqueOtherThanLanguage } from '~/sanity/utils/isUniqueOtherThanLanguage'
import { LANGUAGES } from '~/sanity/utils/languages'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: File as any,
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
      description: 'This field is the title of your project.',
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
      name: 'showcase',
      title: 'Showcase',
      type: 'boolean',
      description:
        'This will determine if the project is shown in the showcase section of the homepage.',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case Study',
      type: 'reference',
      to: [{ type: 'caseStudy' }],
    }),
    defineField({
      name: 'overview',
      description: 'Used both for the <meta> description tag for SEO, and project subheader.',
      title: 'Overview',
      type: 'array',
      of: [
        // Paragraphs
        defineArrayMember({
          marks: {
            decorators: [
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Strong',
                value: 'strong',
              },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: 'cover',
      title: 'Cover Image',
      description: 'This image will be used as the cover image for the project.',
      type: 'image',
      options: {
        hotspot: true,
      },
      preview: {
        select: {
          imageUrl: 'asset.url',
          title: 'caption',
        },
      },
      fields: [
        defineField({
          title: 'Caption',
          name: 'caption',
          type: 'string',
        }),
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Alternative text for screenreaders. Falls back on caption if not set',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: { type: 'projectTag' },
        }),
      ],
      options: {
        layout: 'tags',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'color',
      options: {
        colorList: [
          '#FFC700',
          '#F14E1C',
          '#0FAA58',
          '#5552FE',
          '#C6B9FF',
          '#A25AFF',
          '#FF8575',
          '#689BF9',
          '#B1EBD3',
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'cover.asset',
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
