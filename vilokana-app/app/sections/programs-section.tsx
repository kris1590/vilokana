import { ProgramsSection } from "@/sanity.types";
import SectionContainer from "../components/section-container";
import PortableTextComponent from "../components/portable-text";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type ProgramsSectionProps = {
  data: ProgramsSection & {
    programs?: Array<{
      _id: string;
      title: string;
      description?: unknown;
      image?: SanityImageSource;
      category?: string;
      highlights?: string[];
    }>;
  };
};

const ProgramsSectionComponent = ({ data }: ProgramsSectionProps) => {
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
    <SectionContainer as="section" spacing="lg" className="bg-base-100">
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
          {programs.map((program) => (
            <div
              key={program._id}
              className="card bg-base-100 card-hover card-bordered"
            >
              {program.image && (
                <figure>
                  <img
                    src={urlFor(program.image).width(600).height(400).url()}
                    alt={program.title}
                    className="w-full h-48 object-cover"
                  />
                </figure>
              )}
              <div className="card-body">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="card-title font-serif text-lg">{program.title}</h3>
                  {program.category && (
                    <span className={`badge ${getCategoryBadgeColor(program.category)} badge-sm`}>
                      {program.category}
                    </span>
                  )}
                </div>

                {program.description && (
                  <PortableTextComponent
                    value={program.description as any}
                    className="prose prose-sm line-clamp-3"
                  />
                )}

                {program.highlights && program.highlights.length > 0 && (
                  <ul className="mt-4 space-y-1">
                    {program.highlights.slice(0, 3).map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted">
                        <span className="text-primary mt-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionContainer>
  );
};

export default ProgramsSectionComponent;
