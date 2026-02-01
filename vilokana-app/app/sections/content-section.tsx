import React from "react";
import SectionContainer from "../components/section-container";
import PortableTextComponent from "../components/portable-text";
import type { BlockContent } from "@/sanity.types";

export interface ContentSectionProps {
  title?: BlockContent | null;
  body?: BlockContent | null;
  className?: string;
}

/**
 * Example content section. Consumes props only; no data fetching.
 * Layout driven by design system. Use components from /components only.
 */
const ContentSection = ({ title, body, className = "" }: ContentSectionProps) => {
  return (
    <SectionContainer as="section" spacing="default" className={className}>
      <div className="prose prose-neutral max-w-none">
        {title && title.length > 0 ? (
          <div className="mb-4">
            <PortableTextComponent value={title} />
          </div>
        ) : null}
        {body && body.length > 0 ? (
          <div className="text-base-content/90">
            <PortableTextComponent value={body} />
          </div>
        ) : null}
      </div>
    </SectionContainer>
  );
};

export default ContentSection;
