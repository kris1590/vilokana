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
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
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
      media: "image",
    },
  },
});
