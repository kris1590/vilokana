import { EventsSection } from "@/sanity.types";
import SectionContainer from "../components/section-container";
import PortableTextComponent from "../components/portable-text";
import { urlFor } from "@/sanity/lib/image";
import { resolveReference } from "@/sanity/lib/helper";



const EventsSectionComponent = ({ data }: { data: EventsSection }) => {
  const { title, description, events } = data;

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      year: date.getFullYear(),
      time: date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };
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

      {events && events.length > 0 && (
        <div className="space-y-6">
          {events.map((event) => {
            let event1 = resolveReference(event);
            const dateInfo = formatDate(event1.date);

            return (
              <div
                key={event1._id}
                className="card card-side bg-base-100 card-hover card-bordered overflow-hidden"
              >
                {/* Date Badge */}
                {dateInfo && (
                  <div className="shrink-0 w-24 bg-primary text-primary-content flex flex-col items-center justify-center p-4">
                    <span className="text-3xl font-bold">{dateInfo.day}</span>
                    <span className="text-sm uppercase">{dateInfo.month}</span>
                    <span className="text-xs opacity-80">{dateInfo.year}</span>
                  </div>
                )}

                {/* Image */}
                {event1.image && (
                  <figure className="w-48 shrink-0 hidden md:block">
                    <img
                      src={urlFor(event1.image).width(400).height(300).url()}
                      alt={event1.title}
                      className="img-cover"
                    />
                  </figure>
                )}

                {/* Content */}
                <div className="card-body">
                  <h3 className="card-title font-serif">{event1.title}</h3>

                  <div className="flex flex-wrap gap-4 text-sm text-subtle">
                    {dateInfo && (
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {dateInfo.time}
                      </span>
                    )}
                    {event1.location && (
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event1.location}
                      </span>
                    )}
                  </div>

                  {event1.description && (
                    <PortableTextComponent
                      value={event1.description as any}
                      className="prose prose-sm line-clamp-2 mt-2"
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

export default EventsSectionComponent;
