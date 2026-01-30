import { ReactNode } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { headerQuery, footerQuery } from "@/sanity/lib/queries";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [{ data: header }, { data: footer }] = await Promise.all([
    sanityFetch({
      query: headerQuery,
      stega: false,
    }),
    sanityFetch({
      query: footerQuery,
      stega: false,
    }),
  ]);

  return (
    <>
      {header && <Header {...header} />}
      {children}
      {footer && <Footer {...footer} />}
    </>
  );
}

