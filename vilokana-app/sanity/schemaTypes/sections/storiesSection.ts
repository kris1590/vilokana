import { defineType, defineField, defineArrayMember } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const storiesSectionType = defineType({
  name: 'storiesSection',
  title: 'Stories Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
    }),
    defineField({
      name: 'stories',
      type: 'array',
      title: 'Stories',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              type: 'text',
              title: 'Quote',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'author',
              type: 'string',
              title: 'Author',
            }),
            defineField({
              name: 'role',
              type: 'string',
              title: 'Role',
            }),
            defineField({
              name: 'image',
              type: 'imageWithAlt',
              title: 'Image',
            }),
          ],
          preview: {
            select: {
              title: 'quote',
              subtitle: 'author',
              media: 'image',
            },
            prepare({ title, subtitle }) {
              const quote = title?.substring(0, 50) || ''
              return {
                title: quote + (title?.length > 50 ? '...' : ''),
                subtitle: subtitle || 'Anonymous',
              }
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
      subtitle: 'stories',
    },
    prepare({ title, subtitle }) {
      const count = Array.isArray(subtitle) ? subtitle.length : 0
      return {
        title: title || 'Stories',
        subtitle: `${count} story${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
