import { Sections } from "@/sanity.types";
import HeroSection from "./sections/herosection";


const SectionsMapper = ({ data }: { data?: Sections }) => {
  return data?.map((section, index) => {
    switch (section._type) {
      case "hero":
        return <HeroSection key={index} data={section} />;

      default:
        return null;
    }
  });
};

export default SectionsMapper;
