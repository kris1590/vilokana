import { DonateSection } from "@/sanity.types";
import SectionContainer from "../components/section-container";
import PortableTextComponent from "../components/portable-text";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import AppLink from "../components/link";

type DonateSectionProps = {
  data: DonateSection & {
    cta?: {
      title?: string;
      reference?: {
        slug?: { current: string };
        _type: string;
      };
    };
  };
};

const DonateSectionComponent = ({ data }: DonateSectionProps) => {
  const { title, description, cta, image, highlightText } = data;

  const getCtaHref = () => {
    if (!cta?.reference) return "#";
    if (cta.reference._type === "home") return "/";
    return `/${cta.reference.slug?.current || ""}`;
  };

  return (
    <SectionContainer as="section" spacing="lg" className="relative">
      {/* Background Image */}
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${urlFor(image as SanityImageSource).url()})`,
          }}
        >
          <div className="absolute inset-0 bg-primary/90" />
        </div>
      )}

      {/* Content */}
      <div
        className={`relative z-10 text-center max-w-3xl mx-auto ${image ? "text-primary-content" : "bg-primary text-primary-content rounded-2xl p-12"
          }`}
      >
        {highlightText && (
          <span className="inline-block mb-4 px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
            {highlightText}
          </span>
        )}

        {title && (
          <div className="mb-6">
            <PortableTextComponent
              value={title}
              className="prose prose-lg prose-invert max-w-none **:text-primary-content"
            />
          </div>
        )}

        {description && (
          <PortableTextComponent
            value={description}
            className="prose prose-invert max-w-2xl mx-auto mb-8 **:text-primary-content/90"
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
