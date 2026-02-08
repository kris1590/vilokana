import { TeamSection } from "@/sanity.types";
import SectionContainer from "../components/section-container";
import PortableTextComponent from "../components/portable-text";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { resolveReference } from "@/sanity/lib/helper";

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

const TeamSectionComponent = ({ data }: { data: TeamSection }) => {
  const { title, description, members = [], layout = "grid" } = data;

  return (
    <SectionContainer as="section" spacing="lg" width="wide" className="bg-base-200" disablePadding={data.theme?.disablePadding}>
      <div className="section-header">
        {title && (
          <PortableTextComponent value={title} className="prose prose-lg max-w-none mb-4" />
        )}
        {description && (
          <PortableTextComponent value={description} className="prose max-w-2xl mx-auto text-muted" />
        )}
      </div>

      {members && members.length > 0 && (
        <div className={layout === "list" ? "flex flex-col gap-8" : "grid-cards-4"}>
          {members.map((member) => {
            let member1 = resolveReference(member);
            return (
              <div
                key={member1._id}
                className={`card bg-base-100 card-hover ${layout === "list" ? "card-side" : ""}`}
              >
                {member1.image && (
                  <figure className={layout === "list" ? "w-48 shrink-0" : "px-6 pt-6"}>
                    <img
                      src={urlFor(member1.image).width(400).height(400).url()}
                      alt={member1.name}
                      className={
                        layout === "list"
                          ? "img-cover"
                          : "rounded-full w-32 h-32 object-cover mx-auto"
                      }
                    />
                  </figure>
                )}
                <div className="card-body items-center text-center">
                  <h3 className="card-title font-serif text-base md:text-lg">{member1.name}</h3>
                  {member1.role && (
                    <p className="text-primary text-sm font-medium">{member1.role}</p>
                  )}
                  {member1.bio && (
                    <PortableTextComponent
                      value={member1.bio as any}
                      className="prose prose-sm mt-2"
                    />
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

export default TeamSectionComponent;
