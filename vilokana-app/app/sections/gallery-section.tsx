import { GallerySection } from "@/sanity.types";
import SectionContainer from "../components/section-container";
import PortableTextComponent from "../components/portable-text";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type GalleryImage = {
  _key?: string;
  _id?: string;
  _type: string;
  image?: SanityImageSource;
  asset?: unknown;
  alt?: string;
  caption?: string;
  title?: string;
};

type GallerySectionProps = {
  data: GallerySection & {
    images?: GalleryImage[];
  };
};

const GallerySectionComponent = ({ data }: GallerySectionProps) => {
  const { title, description, images, layout = "grid" } = data;

  const getImageUrl = (item: GalleryImage) => {
    // Handle gallery item references (resolved)
    if (item.image) {
      return urlFor(item.image as SanityImageSource)
        .width(800)
        .height(600)
        .url();
    }
    // Handle inline images
    if (item.asset) {
      return urlFor(item as SanityImageSource)
        .width(800)
        .height(600)
        .url();
    }
    return "";
  };

  const getImageAlt = (item: GalleryImage) => {
    return item.alt || item.title || item.caption || "";
  };

  const getImageCaption = (item: GalleryImage) => {
    return item.caption || item.title || "";
  };

  return (
    <SectionContainer as="section" spacing="lg" className="bg-base-200">
      <div className="text-center mb-12">
        {title && (
          <div className="mb-4">
            <PortableTextComponent
              value={title}
              className="prose prose-lg max-w-none mx-auto"
            />
          </div>
        )}

        {description && (
          <PortableTextComponent
            value={description}
            className="prose max-w-2xl mx-auto text-base-content/70"
          />
        )}
      </div>

      {images && images.length > 0 && (
        <div
          className={
            layout === "masonry"
              ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
              : layout === "carousel"
                ? "carousel carousel-center max-w-full space-x-4 p-4"
                : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          }
        >
          {images.map((item, index) => {
            const imageUrl = getImageUrl(item);
            if (!imageUrl) return null;

            return (
              <div
                key={item._key || item._id || index}
                className={
                  layout === "carousel"
                    ? "carousel-item"
                    : layout === "masonry"
                      ? "break-inside-avoid mb-4"
                      : ""
                }
              >
                <figure className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <img
                    src={imageUrl}
                    alt={getImageAlt(item)}
                    className={`w-full object-cover transition-transform group-hover:scale-105 ${layout === "carousel"
                        ? "h-64 w-80"
                        : layout === "masonry"
                          ? "w-full"
                          : "aspect-square"
                      }`}
                  />
                  {getImageCaption(item) && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {getImageCaption(item)}
                    </figcaption>
                  )}
                </figure>
              </div>
            );
          })}
        </div>
      )}
    </SectionContainer>
  );
};

export default GallerySectionComponent;
