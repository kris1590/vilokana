import { defineType, defineField } from 'sanity'

export const imageType = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative Text',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      imageUrl: 'asset',
      title: 'alt',
    },
  },
})
