import { fetchSanityData } from "@/sanity/lib/live";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { PAGE_QUERYResult } from "@/sanity.types";
import SectionsMapper, { type SectionItem } from "@/app/sectionsmapper";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const result = await fetchSanityData<PAGE_QUERYResult>({
        query: PAGE_QUERY,
        params: { slug: slug },
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
                    data={result.sections as unknown as SectionItem[] | undefined}
                />
            </main>
        </>
    );
}
