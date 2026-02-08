import { fetchSanityData } from "@/sanity/lib/live";
import { PROGRAM_DETAIL_QUERY } from "@/sanity/lib/queries";
import SectionContainer from "@/app/components/section-container";
import PortableTextComponent from "@/app/components/portable-text";
import { notFound } from "next/navigation";

type ProgramDetail = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  shortDescription?: string;
  date?: string;
  description?: any;
  highlights?: string[];
  outcomes?: string[];
  category?: string;
  organization?: string;
};

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const program = await fetchSanityData<ProgramDetail>({
    query: PROGRAM_DETAIL_QUERY,
    params: { slug },
  });

  if (!program) {
    notFound();
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryBadgeColor = (category?: string) => {
    switch (category) {
      case "workshop":
        return "badge-primary";
      case "camp":
        return "badge-secondary";
      case "initiative":
        return "badge-accent";
      default:
        return "badge-neutral";
    }
  };

  return (
    <main>
      {/* Header Section */}
      <SectionContainer as="section" spacing="lg" className="bg-base-200">
        <div className="max-w-3xl mx-auto text-center">
          {program.category && (
            <span
              className={`badge ${getCategoryBadgeColor(program.category)} mb-4`}
            >
              {program.category}
            </span>
          )}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
            {program.title}
          </h1>
          {program.date && (
            <p className="text-muted text-lg">{formatDate(program.date)}</p>
          )}
        </div>
      </SectionContainer>

      {/* Content Section - Description with embedded media */}
      {program.description && (
        <SectionContainer as="section" spacing="default" className="bg-base-100">
          <div className="max-w-3xl mx-auto">
            <PortableTextComponent
              value={program.description}
              className="prose prose-lg max-w-none"
            />
          </div>
        </SectionContainer>
      )}

      {/* Highlights & Outcomes Section */}
      {((program.highlights && program.highlights.length > 0) ||
        (program.outcomes && program.outcomes.length > 0)) && (
        <SectionContainer as="section" spacing="default" className="bg-base-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Highlights */}
            {program.highlights && program.highlights.length > 0 && (
              <div>
                <h2 className="font-serif text-xl md:text-2xl font-semibold mb-4">
                  Highlights
                </h2>
                <ul className="space-y-3">
                  {program.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-base"
                    >
                      <span className="text-primary mt-1 shrink-0">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Outcomes */}
            {program.outcomes && program.outcomes.length > 0 && (
              <div>
                <h2 className="font-serif text-xl md:text-2xl font-semibold mb-4">
                  Expected Outcomes
                </h2>
                <ul className="space-y-3">
                  {program.outcomes.map((outcome, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-base"
                    >
                      <span className="text-accent mt-1 shrink-0">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </SectionContainer>
      )}
    </main>
  );
}
