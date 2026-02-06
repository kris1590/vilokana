import { defineField, defineType } from "sanity";

export const programsSectionType = defineType({
  name: "programsSection",
  title: "Programs Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "blockContent",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "programs",
      title: "Programs",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "program" }],
        },
      ],
    }),
    defineField({
      name: "showAll",
      title: "Show All Programs",
      type: "boolean",
      description: "If enabled, shows all programs instead of selected ones",
      initialValue: false,
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
    },
    prepare({ title }) {
      return {
        title: title?.[0]?.children?.[0]?.text || "Programs Section",
      };
    },
  },
});
