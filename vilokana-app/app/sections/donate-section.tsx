import { DonateSection } from "@/sanity.types";
import SectionContainer from "../components/section-container";
import PortableTextComponent from "../components/portable-text";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import AppLink from "../components/link";


const DonateSectionComponent = ({ data }: { data: DonateSection }) => {
  const { title, description, cta, image, highlightText } = data;

  const getCtaHref = () => {
    if (!cta?.reference) return "#";
    return `/${cta.reference._ref || ""}`;
  };

  return (
    <SectionContainer as="section" spacing="lg" width="narrow" className="relative">
      <div className="relative z-10 text-center max-w-3xl mx-auto bg-primary text-primary-content rounded-2xl p-12">
        {highlightText && (
          <span className="overline inline-block px-4 py-2 bg-white/20 rounded-full !text-primary-content !mb-4">
            {highlightText}
          </span>
        )}

        {title && (
          <PortableTextComponent
            value={title}
            className="prose prose-lg max-w-none prose-invert mb-6 **:text-primary-content"
          />
        )}

        {description && (
          <PortableTextComponent
            value={description}
            className="prose max-w-2xl mx-auto prose-invert mb-8 **:text-primary-content/90"
          />
        )}

        {cta && (
          <AppLink
            href={getCtaHref()}
            className="btn btn-lg bg-white text-primary hover:bg-white/90 border-none"
          >
            {cta.title || "Donate Now"}
          </AppLink>
        )}
      </div>
    </SectionContainer>
  );
};

export default DonateSectionComponent;
