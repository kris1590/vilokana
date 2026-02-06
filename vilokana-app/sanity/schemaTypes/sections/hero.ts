import { defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "hero",
  title: "Hero Section",
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
      title: "Call to Actions",
      type: "internalLink",
      validation: (Rule) => Rule.required(),
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
          title: "Video",
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
        title: title?.[0]?.children?.[0]?.text || "Hero Section",
        media,
      };
    },
  },
});
