import { defineType } from "sanity";

export const sectionsType = defineType({
  name: "sections",
  title: "Sections",
  type: "array",
  of: [
    { type: "hero" },
    { type: "cta" },
    { type: "contentSection" },
    { type: "teamSection" },
    { type: "programsSection" },
    { type: "gallerySection" },
    { type: "eventsSection" },
    { type: "donateSection" },
    { type: "statsSection" },
  ],
  validation: (Rule) => Rule.unique(),
});
