import { defineField, defineType } from "sanity";

export const donateSectionType = defineType({
  name: "donateSection",
  title: "Donate Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "cta",
      title: "Call to Action",
      type: "internalLink",
    }),
    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "highlightText",
      title: "Highlight Text",
      type: "string",
      description: 'e.g., "100% of donations go to children"',
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
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title?.[0]?.children?.[0]?.text || "Donate Section",
        media,
      };
    },
  },
});
