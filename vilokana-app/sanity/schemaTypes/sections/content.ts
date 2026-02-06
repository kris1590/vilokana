import { defineField, defineType } from "sanity";

export const contentSectionType = defineType({
  name: "contentSection",
  title: "Content Section",
  type: "object",
  fields: [
    defineField({
      name: "overline",
      title: "Overline",
      type: "string",
      description: "Small text above the title",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
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
              { title: "None", value: "none" },
              { title: "Image", value: "image" },
              { title: "Video", value: "video" },
            ],
          },
          initialValue: "none",
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
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Text Left, Media Right", value: "text-left" },
          { title: "Text Right, Media Left", value: "text-right" },
          { title: "Centered (No Media)", value: "centered" },
        ],
      },
      initialValue: "text-left",
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
        title: title?.[0]?.children?.[0]?.text || "Content Section",
        media,
      };
    },
  },
});
