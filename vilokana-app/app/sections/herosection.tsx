import { Hero, Link } from "@/sanity.types";
import React from "react";
import SectionContainer from "../components/section-container";
import Button from "../components/button";
import PortableTextComponent from "../components/portable-text";

type HeroSectionProps = { data: Hero };

/** Link with optional GROQ-resolved href/label */
type ResolvedLink = Link & { _key?: string; href?: string; label?: string };

function getCtaHref(cta: ResolvedLink | undefined): string | undefined {
  if (!cta) return undefined;
  if ("href" in cta && cta.href) return cta.href;
  if (cta.linkType === "external" && cta.externalLink?.url) return cta.externalLink.url;
  return undefined;
}
function getCtaLabel(cta: ResolvedLink | undefined): string {
  if (!cta) return "";
  if ("label" in cta && cta.label) return cta.label;
  if (cta.linkType === "external" && cta.externalLink?.title) return cta.externalLink.title;
  if (cta.linkType === "internal" && cta.internalLink?.title) return cta.internalLink.title;
  return "Learn more";
}

const HeroSection = ({ data }: HeroSectionProps) => {
  const firstCta = data.ctas?.[0] as ResolvedLink | undefined;
  const variant =
    firstCta?.color === "secondary" ? "secondary" : firstCta?.color === "accent" ? "accent" : "primary";
  const size =
    firstCta?.size === "large" ? "lg" : firstCta?.size === "small" ? "sm" : "md";

  return (
    <SectionContainer as="section" spacing="lg" className="bg-base-200">
      <div className="hero min-h-[60vh]">
        <div className="hero-content text-center flex flex-col gap-6 max-w-3xl">
          {data.title ? (
            <div className="text-base-content">
              <PortableTextComponent value={data.title} />
            </div>
          ) : null}
          {data.description ? (
            <div className="text-base-content/90 text-lg">
              <PortableTextComponent value={data.description} />
            </div>
          ) : null}
          {data.ctas && data.ctas.length > 0 ? (
            <div className="flex flex-wrap gap-3 justify-center">
              {data.ctas.map((cta, i) => {
                const href = getCtaHref(cta as ResolvedLink);
                const label = getCtaLabel(cta as ResolvedLink);
                if (!href) return null;
                return (
                  <a key={i} href={href} className="contents">
                    <Button variant={variant} size={size} type="button">
                      {label}
                    </Button>
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </SectionContainer>
  );
};

export default HeroSection;
