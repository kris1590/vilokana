import { Cta, Link } from "@/sanity.types";
import React from "react";
import SectionContainer from "../components/section-container";
import Button from "../components/button";
import PortableTextComponent from "../components/portable-text";
import AppLink from "../components/link";

type CTASectionProps = { data: Cta };

type ResolvedLink = Link & { _key?: string; href?: string; label?: string };

const CTASection = ({ data }: CTASectionProps) => {
  return (
    <SectionContainer as="section" spacing="lg" className="bg-primary text-primary-content">
      <>
        A</>
    </SectionContainer>
  );
};

export default CTASection;
