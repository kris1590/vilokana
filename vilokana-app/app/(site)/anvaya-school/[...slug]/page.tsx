import { fetchSanityData } from "@/sanity/lib/live";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { PAGE_QUERYResult, Theme } from "@/sanity.types";
import SectionsMapper, { type SectionItem } from "@/app/sectionsmapper";
import { ThemeProvider } from "styled-components";

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    console.log("here is the slug", slug);
    const result = await fetchSanityData<PAGE_QUERYResult>({
        query: PAGE_QUERY,
        params: { slug: slug.join('/') },
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
                <ThemeProvider theme={result.theme as Theme}>
                    <SectionsMapper
                        data={result.sections as unknown as SectionItem[] | undefined}
                    />
                </ThemeProvider>
            </main>
        </>
    );
}
