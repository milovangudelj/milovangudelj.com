import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteNavigation = defineType({
  name: 'siteNavigation',
  title: 'Site Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'links',
      title: 'Navigation Links',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'link',
          title: 'Nav Link',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'localisedString',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              options: {
                list: ['/about', '/work', '/portfolio', '/contact'],
              },
            }),
          ],
        }),
      ],
    }),
  ],
})
