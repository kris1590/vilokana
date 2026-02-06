import { TeamSection } from "@/sanity.types";
import SectionContainer from "../components/section-container";
import PortableTextComponent from "../components/portable-text";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type TeamSectionProps = {
  data: TeamSection & {
    members?: Array<{
      _id: string;
      name: string;
      role?: string;
      image?: SanityImageSource;
      bio?: unknown;
    }>;
  };
};

const TeamSectionComponent = ({ data }: TeamSectionProps) => {
  const { title, description, members, layout = "grid" } = data;

  return (
    <SectionContainer as="section" spacing="lg" className="bg-base-200">
      <div className="text-center mb-12">
        {title && (
          <div className="mb-4">
            <PortableTextComponent
              value={title}
              className="prose prose-lg max-w-none mx-auto"
            />
          </div>
        )}

        {description && (
          <PortableTextComponent
            value={description}
            className="prose max-w-2xl mx-auto text-base-content/70"
          />
        )}
      </div>

      {members && members.length > 0 && (
        <div
          className={
            layout === "list"
              ? "flex flex-col gap-8"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          }
        >
          {members.map((member) => (
            <div
              key={member._id}
              className={`card bg-base-100 shadow-md hover:shadow-lg transition-shadow ${layout === "list" ? "card-side" : ""
                }`}
            >
              {member.image && (
                <figure
                  className={
                    layout === "list" ? "w-48 shrink-0" : "px-6 pt-6"
                  }
                >
                  <img
                    src={urlFor(member.image).width(400).height(400).url()}
                    alt={member.name}
                    className={`${layout === "list"
                        ? "w-full h-full object-cover"
                        : "rounded-full w-32 h-32 object-cover mx-auto"
                      }`}
                  />
                </figure>
              )}
              <div className="card-body items-center text-center">
                <h3 className="card-title font-serif">{member.name}</h3>
                {member.role && (
                  <p className="text-primary text-sm font-medium">
                    {member.role}
                  </p>
                )}
                {member.bio && (
                  <PortableTextComponent
                    value={member.bio as any}
                    className="prose prose-sm text-base-content/70 mt-2"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionContainer>
  );
};

export default TeamSectionComponent;
