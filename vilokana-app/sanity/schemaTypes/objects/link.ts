import { defineField, defineType } from "sanity";

export const linkType = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "linkType",
      title: "Link Type",
      type: "string",
      options: {
        list: [
          { title: "Internal Link", value: "internal" },
          { title: "External Link", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variant",
      type: "string",
      title: "Button Variant",
      options: {
        list: [
          { title: "Solid", value: "solid" },
          { title: "Outlined", value: "outlined" },
          { title: "Text", value: "text" },
        ],
        layout: "radio",
      },
      initialValue: "solid",
    }),
    defineField({
      name: "color",
      type: "string",
      title: "Button Color",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Accent", value: "accent" },
          { title: "Neutral", value: "neutral" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
    defineField({
      name: "size",
      type: "string",
      title: "Button Size",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
        ],
        layout: "radio",
      },
      initialValue: "medium",
    }),
    defineField({
      name: "internalLink",
      title: "Internal Link",
      type: "internalLink",
      hidden: ({ parent }) => parent?.linkType !== "internal",
    }),
    defineField({
      name: "externalLink",
      title: "External Link",
      type: "externalLink",
      hidden: ({ parent }) => parent?.linkType !== "external",
    }),
  ],
  // preview: {
  //   select: {
  //     linkType: "linkType",
  //     internalLink: "internalLink",
  //     externalLink: "externalLink",
  //   },
  //   prepare({ linkType, internalLink, externalLink }) {
  //     if (linkType === "internal") {
  //       return {
  //         title: `Internal: ${internalLink?.title || "No title"}`,
  //       };
  //     }
  //     if (linkType === "external") {
  //       return {
  //         title: `External: ${externalLink?.title || "No title"}`,
  //       };
  //     }
  //     return {
  //       title: "Unknown Link Type",
  //     };
  //   },
  // },
});
