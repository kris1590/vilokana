import { defineField, defineType } from "sanity";

export const footerType = defineType({
  name: "footer",
  title: "Footer",
  type: "object",
  fields: [
    defineField({
      name: "links",
      title: "Footer Links",
      type: "array",
      of: [{ type: "internalLink" }],
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "socialLinks",
    //   title: "Social Media Links",
    //   type: "array",
    //   of: [{ type: "externalLink" }],
    //   validation: (Rule) => Rule.required(),
    // }),
  ],
});
