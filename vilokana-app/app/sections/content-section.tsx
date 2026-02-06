import { ContentSection } from "@/sanity.types";
import SectionContainer from "../components/section-container";
import PortableTextComponent from "../components/portable-text";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type ContentSectionProps = { data: ContentSection };

const ContentSectionComponent = ({ data }: ContentSectionProps) => {
  const { overline, title, content, media, layout = "text-left" } = data;
  const hasMedia = media?.type && media.type !== "none" && media.image;
  const isCentered = layout === "centered" || !hasMedia;

  return (
    <SectionContainer as="section" spacing="lg" className="bg-base-100">
      <div
        className={`flex flex-col gap-8 ${isCentered
            ? "items-center text-center max-w-3xl mx-auto"
            : layout === "text-right"
              ? "lg:flex-row-reverse lg:items-center"
              : "lg:flex-row lg:items-center"
          }`}
      >
        {/* Text Content */}
        <div className={`flex-1 ${hasMedia ? "lg:w-1/2" : "w-full"}`}>
          {overline && (
            <p className="mb-4 text-sm uppercase tracking-widest text-primary font-semibold">
              {overline}
            </p>
          )}

          {title && (
            <div className="mb-6">
              <PortableTextComponent
                value={title}
                className="prose prose-lg max-w-none"
              />
            </div>
          )}

          {content && (
            <PortableTextComponent
              value={content}
              className="prose prose-lg max-w-none text-base-content/80"
            />
          )}
        </div>

        {/* Media */}
        {hasMedia && media.image && (
          <div className="flex-1 lg:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={urlFor(media.image as SanityImageSource).url()}
                alt=""
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default ContentSectionComponent;
