import { defineType } from "sanity";

export const sectionsType = defineType({
  name: "sections",
  title: "Sections",
  type: "array",
  of: [
    { type: "hero" },

  ],
  validation: (Rule) => Rule.unique(),
});
