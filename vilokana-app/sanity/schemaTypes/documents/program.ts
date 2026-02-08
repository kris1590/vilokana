import { defineField, defineType } from "sanity";

export const programType = defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
      description: "Brief description for card display (1-2 lines)",
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      description: "Image displayed on program cards",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for accessibility",
        }),
      ],
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "Program date",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
      description: "Full content with embedded images and videos",
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
      description: "Key highlights or bullet points about the program",
    }),
    defineField({
      name: "outcomes",
      title: "Expected Outcomes",
      type: "array",
      of: [{ type: "string" }],
      description: "Expected outcomes from the program",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Workshop", value: "workshop" },
          { title: "Camp", value: "camp" },
          { title: "Initiative", value: "initiative" },
        ],
      },
    }),
    defineField({
      name: "organization",
      title: "Organization",
      type: "string",
      options: {
        list: [
          { title: "Vilokana Foundation", value: "vilokana" },
          { title: "Anvaya Public School", value: "anvaya" },
        ],
      },
      initialValue: "vilokana",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "thumbnail",
    },
  },
});
