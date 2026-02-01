import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO Title",
      type: "string",
      description:
        "The title of the page for SEO purposes. If left empty, the page title will be used.",
      validation: (Rule) =>
        Rule.max(60).warning("SEO titles should be under 60 characters"),
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
      description: "A brief description of the page for SEO purposes.",
      validation: (Rule) =>
        Rule.max(160).warning(
          "Meta descriptions should be under 160 characters",
        ),
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "Keywords for SEO purposes.",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Image used when sharing on social media platforms.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "ogTitle",
      title: "Open Graph Title",
      type: "string",
      description: "Title used when sharing on social media platforms.",
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph Description",
      type: "text",
      description: "Description used when sharing on social media platforms.",
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      description: "If enabled, search engines will not index this page.",
      initialValue: false,
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description:
        "The canonical URL of the page. Leave empty to use the current URL.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});
