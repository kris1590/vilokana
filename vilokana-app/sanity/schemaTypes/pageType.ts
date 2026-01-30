import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'site',
      type: 'string',
      title: 'Site',
      options: {
        list: [
          { title: 'Foundation', value: 'foundation' },
          { title: 'School', value: 'school' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sections',
      of: [
        defineArrayMember({ type: 'heroSection' }),
        defineArrayMember({ type: 'textBlockSection' }),
        defineArrayMember({ type: 'valuesSection' }),
        defineArrayMember({ type: 'featuresSection' }),
        defineArrayMember({ type: 'storiesSection' }),
        defineArrayMember({ type: 'metricsSection' }),
        defineArrayMember({ type: 'ctaSection' }),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'object',
      title: 'SEO',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          title: 'SEO Title',
        }),
        defineField({
          name: 'description',
          type: 'text',
          title: 'SEO Description',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      site: 'site',
    },
    prepare({ title, subtitle, site }) {
      return {
        title,
        subtitle: `/${subtitle || ''} (${site || 'unknown'})`,
      }
    },
  },
})
