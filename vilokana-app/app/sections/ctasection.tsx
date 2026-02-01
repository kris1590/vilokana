import { Cta, Link } from "@/sanity.types";
import React from "react";
import SectionContainer from "../components/section-container";
import Button from "../components/button";
import PortableTextComponent from "../components/portable-text";

type CTASectionProps = { data: Cta };

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

const CTASection = ({ data }: CTASectionProps) => {
  const firstCta = data.ctas?.[0] as ResolvedLink | undefined;
  const variant =
    firstCta?.color === "secondary" ? "secondary" : firstCta?.color === "accent" ? "accent" : "primary";

  return (
    <SectionContainer as="section" spacing="lg" className="bg-primary text-primary-content">
      <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
        {data.overline ? (
          <p className="text-primary-content/80 text-sm uppercase tracking-wider">
            {data.overline}
          </p>
        ) : null}
        {data.title && data.title.length > 0 ? (
          <div className="text-primary-content">
            <PortableTextComponent value={data.title} />
          </div>
        ) : null}
        {data.description && data.description.length > 0 ? (
          <div className="text-primary-content/90">
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
                  <Button
                    variant="ghost"
                    size="md"
                    type="button"
                    className="btn-primary-content border border-primary-content/30 hover:bg-primary-content/10"
                  >
                    {label}
                  </Button>
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
    </SectionContainer>
  );
};

export default CTASection;
