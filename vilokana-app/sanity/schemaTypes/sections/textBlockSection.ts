import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const textBlockSectionType = defineType({
  name: 'textBlockSection',
  title: 'Text Block',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'content',
      type: 'richText',
      title: 'Content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'imageWithAlt',
      title: 'Image',
    }),
    defineField({
      name: 'imagePosition',
      type: 'string',
      title: 'Image Position',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
      hidden: ({ parent }) => !parent?.image,
    }),
  ],
  preview: {
    select: {
      content: 'content',
      media: 'image',
    },
    prepare({ content }) {
      const block = content?.[0]
      const title = block?.children?.[0]?.text || 'Text Block'
      return {
        title,
        subtitle: 'Text Block Section',
      }
    },
  },
})
