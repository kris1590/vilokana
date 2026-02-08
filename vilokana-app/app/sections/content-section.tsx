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

  const layoutClass = isCentered
    ? "split-content-centered"
    : layout === "text-right"
      ? "split-content-reverse"
      : "split-content";

  return (
    <SectionContainer as="section" spacing="lg" className="bg-base-100 " disablePadding={data.theme?.disablePadding}>
      <div className={layoutClass}>
        {/* Text Content */}
        <div className={`flex-1 ${hasMedia ? "lg:w-1/2" : "w-full"}`}>

          {overline ? <PortableTextComponent value={overline} className=" prose prose-lg max-w-none mb-6" /> : null}

          {title && (
            <PortableTextComponent value={title} className="prose prose-lg max-w-none mb-6" />
          )}

          {content && (
            <PortableTextComponent value={content} className="prose prose-lg max-w-none" />
          )}
        </div>

        {/* Media */}
        {hasMedia && media.image && (
          <div className="flex-1 lg:w-1/2">
            <div className="img-rounded shadow-lg">
              <img
                src={urlFor(media.image as SanityImageSource).url()}
                alt=""
                className="img-cover"
              />
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default ContentSectionComponent;
