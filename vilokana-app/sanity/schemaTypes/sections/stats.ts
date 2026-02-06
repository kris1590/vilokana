import { defineField, defineType } from "sanity";

export const statsSectionType = defineType({
  name: "statsSection",
  title: "Stats Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "blockContent",
    }),
    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "suffix",
              title: "Suffix",
              type: "string",
              description: 'e.g., "+", "%", "K"',
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Stat",
                subtitle: subtitle || "",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "theme",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title?.[0]?.children?.[0]?.text || "Stats Section",
      };
    },
  },
});
