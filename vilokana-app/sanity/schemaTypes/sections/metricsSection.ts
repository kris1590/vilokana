import { defineType, defineField, defineArrayMember } from 'sanity'

export const metricsSectionType = defineType({
  name: 'metricsSection',
  title: 'Metrics Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
    }),
    defineField({
      name: 'metrics',
      type: 'array',
      title: 'Metrics',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              type: 'string',
              title: 'Value',
              description: 'The number or main value (e.g., "500", "95%")',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
              description: 'What this metric represents (e.g., "Students", "Success Rate")',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(4),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'metrics',
    },
    prepare({ title, subtitle }) {
      const count = Array.isArray(subtitle) ? subtitle.length : 0
      return {
        title: title || 'Metrics',
        subtitle: `${count} metric${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
