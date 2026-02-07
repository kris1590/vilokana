import { fetchSanityData } from "@/sanity/lib/live";
import { HOME_QUERY } from "@/sanity/lib/queries";
import { HOME_QUERYResult, Sections } from "@/sanity.types";
import SectionsMapper, { type SectionItem } from "../sectionsmapper";

export default async function Home() {
  const result = await fetchSanityData<HOME_QUERYResult>({
    query: HOME_QUERY,
  });

  if (!result) {
    return (
      <>
        <div>No data found</div>
      </>
    );
  }
  return (
    <>
      <main>
        <SectionsMapper
          data={result.sections as Sections}
        />
      </main>
    </>
  );
}
