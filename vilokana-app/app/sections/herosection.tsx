import { Hero, Link } from "@/sanity.types";
import React from "react";
import SectionContainer from "../components/section-container";
import Button from "../components/button";
import PortableTextComponent from "../components/portable-text";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import AppLink from "../components/link";

type HeroSectionProps = { data: Hero };


const HeroSection = ({ data }: HeroSectionProps) => {

  console.log("data", urlFor(data.media?.image as SanityImageSource).url());
  return (
    <section className="w-screen min-h-screen">
      <div
        className="hero min-h-screen w-full relative bg-cover bg-center"
        style={{
          backgroundImage: urlFor(data.media?.image as SanityImageSource).url() ? `url(${urlFor(data.media?.image as SanityImageSource).url()})` : undefined,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        {/* Content */}
        <div className="hero-content relative z-10 text-center text-neutral-content px-6">
          <div className="max-w-2xl mx-auto">
            <div>{data.title && <PortableTextComponent value={data.title} />}</div>
            <div>{data.description && <PortableTextComponent value={data.description} />}</div>

            {data.cta && (
              <AppLink
                href={data.cta.reference?._ref || ""}
                className="btn btn-primary px-8"
              >
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
