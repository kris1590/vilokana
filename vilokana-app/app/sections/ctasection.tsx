import { Cta } from "@/sanity.types";
import SectionContainer from "../components/section-container";
import PortableTextComponent from "../components/portable-text";
import AppLink from "../components/link";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type CTASectionProps = { data: Cta };

const CTASection = ({ data }: CTASectionProps) => {
  const { overline, title, description, cta1, media } = data;
  const hasMedia = media?.type === "image" && media.image;

  return (
    <SectionContainer as="section" spacing="lg" className="bg-primary text-primary-content">
      <div className={hasMedia ? "split-content" : "split-content-centered"}>
        {/* Text Content */}
        <div className={`flex-1 ${hasMedia ? "lg:w-1/2" : "w-full"}`}>
          {overline && (
            <p className=" text-primary-content/80">{overline}</p>
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
              className="prose prose-lg max-w-none prose-invert mb-8 **:text-primary-content/90"
            />
          )}

          {cta1 && cta1.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {cta1.map((link, index) => (
                <AppLink
                  key={link._key || index}
                  href={link.reference?._ref || "#"}
                  className={
                    index === 0
                      ? "btn btn-lg bg-white text-primary hover:bg-white/90 border-none"
                      : "btn btn-lg btn-outline border-white text-white hover:bg-white/10"
                  }
                >
                  {link.title}
                </AppLink>
              ))}
            </div>
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

export default CTASection;
