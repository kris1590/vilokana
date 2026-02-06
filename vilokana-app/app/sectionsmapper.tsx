import {
  Hero,
  Cta,
  ContentSection,
  TeamSection,
  ProgramsSection,
  GallerySection,
  EventsSection,
  DonateSection,
  StatsSection,
} from "@/sanity.types";
import HeroSection from "./sections/herosection";
import CTASection from "./sections/ctasection";
import ContentSectionComponent from "./sections/content-section";
import TeamSectionComponent from "./sections/team-section";
import ProgramsSectionComponent from "./sections/programs-section";
import GallerySectionComponent from "./sections/gallery-section";
import EventsSectionComponent from "./sections/events-section";
import DonateSectionComponent from "./sections/donate-section";
import StatsSectionComponent from "./sections/stats-section";

/** Section item union type for all available sections */
export type SectionItem =
  | ({ _key: string } & Hero)
  | ({ _key: string } & Cta)
  | ({ _key: string } & ContentSection)
  | ({ _key: string } & TeamSection)
  | ({ _key: string } & ProgramsSection)
  | ({ _key: string } & GallerySection)
  | ({ _key: string } & EventsSection)
  | ({ _key: string } & DonateSection)
  | ({ _key: string } & StatsSection);

const SectionsMapper = ({ data }: { data?: SectionItem[] }) => {
  return data?.map((section, index) => {
    switch (section._type) {
      case "hero":
        return <HeroSection key={index} data={section} />;
      case "cta":
        return <CTASection key={index} data={section} />;
      case "contentSection":
        return <ContentSectionComponent key={index} data={section} />;
      case "teamSection":
        return <TeamSectionComponent key={index} data={section as any} />;
      case "programsSection":
        return <ProgramsSectionComponent key={index} data={section as any} />;
      case "gallerySection":
        return <GallerySectionComponent key={index} data={section as any} />;
      case "eventsSection":
        return <EventsSectionComponent key={index} data={section as any} />;
      case "donateSection":
        return <DonateSectionComponent key={index} data={section as any} />;
      case "statsSection":
        return <StatsSectionComponent key={index} data={section} />;
      default:
        return null;
    }
  });
};

export default SectionsMapper;
