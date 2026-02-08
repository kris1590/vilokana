import { fetchSanityData } from "@/sanity/lib/live";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { SETTINGS_QUERYResult } from "@/sanity.types";

export default async function VilokanaFoundationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await fetchSanityData<SETTINGS_QUERYResult>({
    query: SETTINGS_QUERY,
  });

  return (
    <>
      <Header items={settings?.header?.links ?? []} />
      {children}
      <Footer items={settings?.footer?.links ?? []} />
    </>
  );
}
