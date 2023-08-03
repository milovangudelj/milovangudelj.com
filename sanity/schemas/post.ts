import { PencilLine, Image } from '@phosphor-icons/react'
import { defineArrayMember, defineField, defineType } from 'sanity'

import { isUniqueOtherThanLanguage } from '~/sanity/utils/isUniqueOtherThanLanguage'
import { LANGUAGES } from '~/sanity/utils/languages'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: PencilLine,
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
      description: 'This field is the title of your post.',
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
      name: 'intro',
      description: 'Used both for the <meta> description tag for SEO, and post subheader.',
      title: 'Intro',
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
      description: 'This image will be used as the cover image for the post.',
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
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: { type: 'postTag' },
        }),
      ],
      options: {
        layout: 'tags',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Post body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          icon: Image,
          name: 'image',
          title: 'Image',
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
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Alternative text for screenreaders. Falls back on caption if not set',
            }),
          ],
        }),
        defineArrayMember({
          type: 'code',
          name: 'codeBlock',
          title: 'Code Block',
          options: {
            language: 'typescript',
            languageAlternatives: [
              { title: 'ts', value: 'typescript' },
              { title: 'tsx', value: 'tsx' },
              { title: 'js', value: 'javascript' },
              { title: 'jsx', value: 'jsx' },
              { title: 'md', value: 'markdown' },
              { title: 'html', value: 'html' },
              { title: 'css', value: 'css' },
            ],
            withFilename: true,
          },
        }),
      ],
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
