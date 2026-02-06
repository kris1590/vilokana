import { defineField, defineType } from "sanity";

export const internalLinkType = defineType({
  name: "internalLink",
  title: "Internal Link",
  type: "object",
  fields: [
    defineField({
      name: "reference",
      title: "Reference",
      type: "reference",
      to: [{ type: "page" }, { type: "home" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Override the default title from the referenced document",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title,
      };
    },
  },
});
