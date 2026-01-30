import { defineType, defineField, defineArrayMember } from 'sanity'
import { HeartIcon } from '@sanity/icons'

export const valuesSectionType = defineType({
  name: 'valuesSection',
  title: 'Values Section',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'values',
      type: 'array',
      title: 'Values',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              title: 'Description',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
  },
})
