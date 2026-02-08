import { ImageIcon, PlayIcon } from "@sanity/icons";
import { defineArrayMember, defineType } from "sanity";

export const blockContentType = defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Display1", value: "display1" },
        { title: "Display2", value: "display2" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "H5", value: "h5" },
        { title: "H6", value: "h6" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      title: "Separator",
      name: "separator",
      type: "object",
      fields: [
        {
          name: "style",
          title: "Style",
          type: "string",
          options: {
            list: [
              { title: "Line", value: "line" },
              { title: "Space", value: "space" },
            ],
          },
        },
      ],
    }),
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
    }),
    defineArrayMember({
      title: "Video",
      name: "video",
      type: "file",
      icon: PlayIcon,
      options: {
        accept: "video/mp4,video/webm,video/quicktime",
      },
      fields: [
        {
          name: "title",
          type: "string",
          title: "Video Title",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
    }),
  ],
});
