import { defineField, defineType } from "sanity";

export const ctaType = defineType({
  name: "cta",
  title: "CTA Section",
  type: "object",
  fields: [
    defineField({
      name: "overline",
      title: "Overline",
      type: "string",
    }),
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
      name: "ctas",
      title: "Call to Actions",
      type: "array",
      of: [{ type: "link" }],
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: "media",
      title: "Media",
      type: "object",
      fields: [
        {
          name: "type",
          title: "Media Type",
          type: "string",
          options: {
            list: [
              { title: "Image", value: "image" },
              { title: "Video", value: "video" },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "image",
          title: "Image",
          type: "image",
          hidden: ({ parent }) => parent?.type !== "image",
          options: {
            hotspot: true,
          },
        },
        {
          name: "video",
          title: "Video ",
          type: "file",
          hidden: ({ parent }) => parent?.type !== "video",
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
      media: "media.image",
    },
    prepare({ title, media }) {
      return {
        title: title?.[0]?.children?.[0]?.text || "CTA Section",
        media,
      };
    },
  },
});
