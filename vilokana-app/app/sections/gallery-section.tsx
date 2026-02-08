"use client";

import { useState } from "react";
import { GallerySection } from "@/sanity.types";
import SectionContainer from "../components/section-container";
import PortableTextComponent from "../components/portable-text";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const GallerySectionComponent = ({ data }: { data: GallerySection }) => {
  const { title, description, images, layout = "grid" } = data;
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const getImageUrl = (item: any) => {
    if (item.image) {
      return urlFor(item.image as SanityImageSource).width(800).height(600).url();
    }
    // Handle case where asset is already a URL string
    if (typeof item.asset === "string") {
      return item.asset;
    }
    // Handle case where asset is a Sanity reference object
    if (item.asset?._ref) {
      return urlFor(item as SanityImageSource).width(800).height(600).url();
    }
    return "";
  };

  const getLayoutClass = () => {
    switch (layout) {
      case "masonry":
        return "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4";
      default:
        return "grid-gallery";
    }
  };

  // Custom navigation button component
  const NavButton = ({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`group/btn absolute top-1/2 -translate-y-1/2 z-10 
        w-11 h-11 md:w-12 md:h-12 
        flex items-center justify-center
        bg-white/90 hover:bg-primary hover:text-primary-content
        border-2 border-primary/20 hover:border-primary
        rounded-full shadow-lg hover:shadow-xl
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${direction === "prev" ? "left-2 md:left-4" : "right-2 md:right-4"}`}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
    >
      <svg
        className={`w-5 h-5 md:w-6 md:h-6 text-primary group-hover/btn:text-primary-content transition-colors duration-300 ${direction === "prev" ? "" : "rotate-180"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
  );

  const renderCarousel = () => (
    <div className="gallery-carousel-wrapper relative">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={16}
        slidesPerView={1}
        loop={true}
        onSwiper={setSwiperInstance}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1280: { slidesPerView: 4, spaceBetween: 24 },
        }}
        className="gallery-swiper pb-12!"
      >
        {images?.map((item, index) => {
          const imageUrl = getImageUrl(item);
          if (!imageUrl) return null;

          return (
            <SwiperSlide key={item._key || index}>
              <figure className="group relative img-rounded card-hover overflow-hidden">
                <img
                  src={imageUrl}
                  alt={item.alt || ""}
                  className="w-full h-64 object-cover img-hover-zoom"
                />
                {item.caption && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.caption || ""}
                  </figcaption>
                )}
              </figure>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <NavButton direction="prev" onClick={() => swiperInstance?.slidePrev()} />
      <NavButton direction="next" onClick={() => swiperInstance?.slideNext()} />
    </div>
  );

  const renderGridOrMasonry = () => (
    <div className={getLayoutClass()}>
      {images?.map((item, index) => {
        const imageUrl = getImageUrl(item);
        if (!imageUrl) return null;

        return (
          <div
            key={item._key || index}
            className={layout === "masonry" ? "break-inside-avoid mb-4" : ""}
          >
            <figure className="group relative img-rounded card-hover">
              <img
                src={imageUrl}
                alt={item.alt || ""}
                className={`w-full object-cover img-hover-zoom ${layout === "masonry" ? "w-full" : "aspect-square"
                  }`}
              />
              {item.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.caption || ""}
                </figcaption>
              )}
            </figure>
          </div>
        );
      })}
    </div>
  );

  return (
    <SectionContainer as="section" spacing="lg" width="wide" className="bg-base-100" disablePadding={data.theme?.disablePadding}>
      <div className="section-header">
        {title && (
          <PortableTextComponent value={title} className="prose prose-lg max-w-none mb-4" />
        )}
        {description && (
          <PortableTextComponent value={description} className="prose max-w-2xl mx-auto text-muted" />
        )}
      </div>

      {images && images.length > 0 && (
        layout === "carousel" ? renderCarousel() : renderGridOrMasonry()
      )}
    </SectionContainer>
  );
};

export default GallerySectionComponent;
