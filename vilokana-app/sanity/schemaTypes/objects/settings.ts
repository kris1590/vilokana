import { defineField, defineType } from "sanity";

export const settingsType = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "object",
      fields: [
        {
          name: "links",
          title: "Navigation Links",
          type: "array",
          of: [{ type: "link" }],
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        {
          name: "links",
          title: "Footer Links",
          type: "array",
          of: [{ type: "link" }],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "socialLinks",
          title: "Social Media Links",
          type: "array",
          of: [{ type: "externalLink" }],
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
});
