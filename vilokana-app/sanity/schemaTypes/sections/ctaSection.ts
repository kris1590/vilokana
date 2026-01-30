import { defineType, defineField } from 'sanity'


export const ctaSectionType = defineType({
  name: 'ctaSection',
  title: 'Call to Action Section',
  type: 'object',

  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      type: 'text',
      title: 'Text',
    }),
    defineField({
      name: 'button',
      type: 'link',
      title: 'Button',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'text',
    },
  },
})
