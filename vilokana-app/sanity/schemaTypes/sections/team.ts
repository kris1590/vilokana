import { defineField, defineType } from "sanity";

export const teamSectionType = defineType({
  name: "teamSection",
  title: "Team Section",
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
      name: "members",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "teamMember" }],
        },
      ],
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Grid", value: "grid" },
          { title: "List", value: "list" },
        ],
      },
      initialValue: "grid",
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
        title: title?.[0]?.children?.[0]?.text || "Team Section",
      };
    },
  },
});
