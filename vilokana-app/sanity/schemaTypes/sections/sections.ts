import { defineType } from "sanity";

export const sectionsType = defineType({
  name: "sections",
  title: "Sections",
  type: "array",
  of: [
    { type: "hero" },
    { type: "cta" },
  ],
  validation: (Rule) => Rule.unique(),
});
