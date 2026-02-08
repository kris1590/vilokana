import { defineField, defineType } from "sanity";

export const themeType = defineType({
  name: "theme",
  title: "Theme",
  type: "object",
  fields: [

    defineField({
      name: "disablePadding",
      title: "Disable Padding",
      type: "boolean",
      description: "Disable padding for the section/page",
      initialValue: false,
    }),
    defineField({
      name: "backgroundColor",
      title: "Background Color",
      type: "color",
      description: "Background color in hex format (e.g. #000000)",

    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      description: "Background image for the section/page",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.backgroundType !== "image",
    }),
    defineField({
      name: "backgroundVideo",
      title: "Background Video",
      type: "file",
      description: "Background video for the section/page",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) => parent?.backgroundType !== "video",
    }),
    defineField({
      name: "padding",
      title: "Padding",
      type: "object",
      fields: [
        defineField({
          name: "top",
          title: "Top",
          type: "number",
          description: "Top padding in pixels",
        }),
        defineField({
          name: "bottom",
          title: "Bottom",
          type: "number",
          description: "Bottom padding in pixels",
        }),
        defineField({
          name: "left",
          title: "Left",
          type: "number",
          description: "Left padding in pixels",
        }),
        defineField({
          name: "right",
          title: "Right",
          type: "number",
          description: "Right padding in pixels",
        }),
      ],
    }),
    defineField({
      name: "maxWidth",
      title: "Max Width",
      type: "string",
      description: "Maximum width of the section/page",
      options: {
        list: [
          { title: "Full Width", value: "full" },
          { title: "Container", value: "container" },
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
        ],
      },
    }),

  ],
  preview: {
    select: {
      colorMode: "colorMode",
      backgroundType: "backgroundType",
      backgroundColor: "backgroundColor",
      backgroundImage: "backgroundImage",
      backgroundVideo: "backgroundVideo",
    },
    prepare({
      colorMode,
      backgroundType,
      backgroundColor,
      backgroundImage,
      backgroundVideo,
    }) {
      let title = `Theme (${colorMode || "system"}): `;
      if (backgroundType === "color") {
        title += backgroundColor || "Default Color";
      } else if (backgroundType === "image") {
        title += backgroundImage ? "Image Background" : "No Image";
      } else if (backgroundType === "video") {
        title += backgroundVideo ? "Video Background" : "No Video";
      }
      return { title };
    },
  },
});
