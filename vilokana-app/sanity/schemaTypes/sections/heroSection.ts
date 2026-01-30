import { defineType, defineField, defineArrayMember } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'headline',
      type: 'string',
      title: 'Headline',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheadline',
      type: 'text',
      title: 'Subheadline',
    }),
    defineField({
      name: 'image',
      type: 'imageWithAlt',
      title: 'Image',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheadline',
      media: 'image',
    },
  },
})
