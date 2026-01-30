import { defineType, defineField, defineArrayMember } from 'sanity'
import { MenuIcon } from '@sanity/icons'

export const headerType = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'logo',
      type: 'imageWithAlt',
      title: 'Logo',
    }),
    defineField({
      name: 'logoText',
      type: 'string',
      title: 'Logo Text',
      description: 'Text to display if no logo image',
      initialValue: 'Vilokana Foundation',
    }),
    defineField({
      name: 'navigation',
      type: 'array',
      title: 'Navigation Links',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'link',
              type: 'link',
              title: 'Link',
              description: 'Optional link for this top-level item (e.g. School overview page)',
            }),
            defineField({
              name: 'children',
              type: 'array',
              title: 'Sub Items',
              description: 'Optional sub-pages to show in a dropdown under this menu item',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      type: 'string',
                      title: 'Label',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'link',
                      type: 'link',
                      title: 'Link',
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'label',
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'label',
            },
          },
        }),
      ],
    }),
  ],
})
