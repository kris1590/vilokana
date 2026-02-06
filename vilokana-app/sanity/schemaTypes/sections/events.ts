import { defineField, defineType } from "sanity";

export const eventsSectionType = defineType({
  name: "eventsSection",
  title: "Events Section",
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
      name: "events",
      title: "Events",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "event" }],
        },
      ],
    }),
    defineField({
      name: "showUpcoming",
      title: "Show Only Upcoming Events",
      type: "boolean",
      description: "If enabled, only shows events with dates in the future",
      initialValue: true,
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
        title: title?.[0]?.children?.[0]?.text || "Events Section",
      };
    },
  },
});
