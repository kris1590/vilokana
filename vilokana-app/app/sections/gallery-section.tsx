import { GallerySection } from "@/sanity.types";
import SectionContainer from "../components/section-container";
import PortableTextComponent from "../components/portable-text";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";



const GallerySectionComponent = ({ data }: { data: GallerySection }) => {
  const { title, description, images, layout = "grid" } = data;

  const getImageUrl = (item: any) => {
    if (item.image) {
      return urlFor(item.image as SanityImageSource).width(800).height(600).url();
    }
    if (item.asset) {
      return urlFor(item as SanityImageSource).width(800).height(600).url();
    }
    return "";
  };



  const getLayoutClass = () => {
    switch (layout) {
      case "masonry":
        return "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4";
      case "carousel":
        return "carousel carousel-center max-w-full space-x-4 p-4";
      default:
        return "grid-gallery";
    }
  };

  return (
    <SectionContainer as="section" spacing="lg" className="bg-base-200">
      <div className="section-header">
        {title && (
          <PortableTextComponent value={title} className="prose prose-lg max-w-none mb-4" />
        )}
        {description && (
          <PortableTextComponent value={description} className="prose max-w-2xl mx-auto text-muted" />
        )}
      </div>

      {images && images.length > 0 && (
        <div className={getLayoutClass()}>
          {images.map((item, index) => {
            const imageUrl = getImageUrl(item);
            if (!imageUrl) return null;

            return (
              <div
                key={item._key || index}
                className={
                  layout === "carousel"
                    ? "carousel-item"
                    : layout === "masonry"
                      ? "break-inside-avoid mb-4"
                      : ""
                }
              >
                <figure className="group relative img-rounded card-hover">
                  <img
                    src={imageUrl}
                    alt={item.alt || ""}
                    className={`w-full object-cover img-hover-zoom ${layout === "carousel"
                      ? "h-64 w-80"
                      : layout === "masonry"
                        ? "w-full"
                        : "aspect-square"
                      }`}
                  />
                  {item.caption && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.caption}
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
