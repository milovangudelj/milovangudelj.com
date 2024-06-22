import { Desktop } from '@phosphor-icons/react'
import { defineField, defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: Desktop,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localisedString',
      validation: (rule) =>
        rule.fields({
          en: (rule) => rule.required().max(160),
          it: (rule) => rule.required().max(160),
        }),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localisedString',
      validation: (rule) =>
        rule.fields({
          en: (rule) => rule.required().max(160),
          it: (rule) => rule.required().max(160),
        }),
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
      title: 'title.en',
      slug: 'slug.current',
    },
    prepare(selection) {
      const { media, title, slug } = selection
      return {
        media,
        title,
        subtitle: slug ? `/${slug}` : '',
      }
    },
  },
})
