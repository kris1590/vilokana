import { defineField, defineType } from "sanity";

export const settingsType = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
    defineField({
      name: "header",
      title: "Header",
      type: "header",
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "footer",
    }),
  ],
});
