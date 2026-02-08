import { ProgramsSection } from "@/sanity.types";
import SectionContainer from "../components/section-container";
import PortableTextComponent from "../components/portable-text";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { resolveReference } from "@/sanity/lib/helper";


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
          {programs.map((program) => {
            let program1 = resolveReference(program);
            return (
              <div
                key={program1._id}
                className="card bg-base-100 card-hover card-bordered"
              >
                {program1.image && (
                  <figure>
                    <img
                      src={urlFor(program1.image).width(600).height(400).url()}
                      alt={program1.title}
                      className="w-full h-48 object-cover"
                    />
                  </figure>
                )}
                <div className="card-body">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="card-title font-serif text-base md:text-lg">{program1.title}</h3>
                    {program1.category && (
                      <span className={`badge ${getCategoryBadgeColor(program1.category)} badge-sm`}>
                        {program1.category}
                      </span>
                    )}
                  </div>

                  {program1.description && (
                    <PortableTextComponent
                      value={program1.description as any}
                      className="prose prose-sm line-clamp-3"
                    />
                  )}

                  {program1.highlights && program1.highlights.length > 0 && (
                    <ul className="mt-4 space-y-1">
                      {program1.highlights.slice(0, 3).map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted">
                          <span className="text-primary mt-1">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SectionContainer>
  );
};

export default ProgramsSectionComponent;
