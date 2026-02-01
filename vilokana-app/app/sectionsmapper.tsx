import { Sections, Hero, Cta } from "@/sanity.types";
import HeroSection from "./sections/herosection";
import CTASection from "./sections/ctasection";

/** Section item: Hero or Cta (Sections type may lag schema until typegen is re-run) */
export type SectionItem = ({ _key: string } & Hero) | ({ _key: string } & Cta);

const SectionsMapper = ({ data }: { data?: SectionItem[] }) => {
  return data?.map((section, index) => {
    switch (section._type) {
      case "hero":
        return <HeroSection key={index} data={section} />;
      case "cta":
        return <CTASection key={index} data={section} />;
      default:
        return null;
    }
  });
};

export default SectionsMapper;
