import { Hero } from "@/sanity.types";
import SectionContainer from "../components/section-container";
import PortableTextComponent from "../components/portable-text";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import AppLink from "../components/link";

type HeroSectionProps = { data: Hero };

const HeroSection = ({ data }: HeroSectionProps) => {
  const backgroundUrl = data.media?.image
    ? urlFor(data.media.image as SanityImageSource).url()
    : undefined;

  return (
    <section className="w-screen min-h-screen">
      <div
        className="hero min-h-screen w-full relative bg-cover bg-center"
        style={{ backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        {/* Content */}
        <div className="hero-content relative z-10 text-center text-neutral-content px-6">
          <div className="max-w-2xl mx-auto">
            {data.title && (
              <PortableTextComponent value={data.title} className="prose prose-lg max-w-none mb-6 text-primary-content" />
            )}
            {data.description && (
              <PortableTextComponent value={data.description} className="prose prose-lg max-w-none mb-8 text-primary-content" />
            )}
            {data.cta && (
              <AppLink href={data.cta.reference?._ref || ""} className="btn btn-primary px-8">
                {data.cta.title}
              </AppLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
