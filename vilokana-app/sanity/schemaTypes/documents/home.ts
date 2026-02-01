import { defineField, defineType } from "sanity";

// Singleton Home document schema
export const homeType = defineType({
  name: "home",
  title: "Home",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "sections",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      options: {
        collapsed: true,
        collapsible: true,
      },
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "theme",
      options: {
        collapsed: true,
        collapsible: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Home Page",
      };
    },
  },
});
