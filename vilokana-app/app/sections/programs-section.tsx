import { ProgramsSection } from "@/sanity.types";
import SectionContainer from "../components/section-container";
import PortableTextComponent from "../components/portable-text";
import AppLink from "../components/link";

type ProgramCard = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  shortDescription?: string;
  category?: string;
  organization?: string;
  thumbnail?: {
    url?: string;
    alt?: string;
  };
};

const ProgramsSectionComponent = ({ data }: { data: ProgramsSection }) => {
  const { title, description, programs } = data;

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
    <SectionContainer as="section" spacing="lg" className="bg-base-100" disablePadding={data.theme?.disablePadding}>
      <div className="section-header">
        {title && (
          <PortableTextComponent value={title} className="prose prose-lg max-w-none mb-4" />
        )}
        {description && (
          <PortableTextComponent value={description} className="prose max-w-2xl mx-auto text-muted" />
        )}
      </div>

      {programs && programs.length > 0 && (
        <div className="grid-cards">
          {(programs as unknown as ProgramCard[]).map((program) => {
            const programSlug = program.slug?.current;
            const programUrl = programSlug
              ? `/vilokana-foundation/${programSlug}`
              : "#";

            return (
              <AppLink
                key={program._id}
                href={programUrl}
                className="card bg-base-100 card-hover card-bordered cursor-pointer transition-transform hover:scale-[1.02] block no-underline"
              >
                {program.thumbnail?.url && (
                  <figure>
                    <img
                      src={program.thumbnail.url}
                      alt={program.thumbnail.alt || program.title || "Program image"}
                      className="w-full h-48 object-cover"
                    />
                  </figure>
                )}
                <div className="card-body">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="card-title font-serif text-base md:text-lg">
                      {program.title}
                    </h3>
                    {program.category && (
                      <span
                        className={`badge ${getCategoryBadgeColor(program.category)} badge-sm`}
                      >
                        {program.category}
                      </span>
                    )}
                  </div>

                  {program.shortDescription && (
                    <p className="text-sm text-muted line-clamp-2">
                      {program.shortDescription}
                    </p>
                  )}
                </div>
              </AppLink>
            );
          })}
        </div>
      )}
    </SectionContainer>
  );
};

export default ProgramsSectionComponent;
