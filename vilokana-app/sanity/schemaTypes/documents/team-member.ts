import { defineField, defineType } from "sanity";

export const teamMemberType = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "e.g., President of Vilokana Foundation",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "blockContent",
    }),
    defineField({
      name: "organization",
      title: "Organization",
      type: "string",
      options: {
        list: [
          { title: "Vilokana Foundation", value: "vilokana" },
          { title: "Anvaya Public School", value: "anvaya" },
          { title: "Both", value: "both" },
        ],
      },
      initialValue: "vilokana",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
});
