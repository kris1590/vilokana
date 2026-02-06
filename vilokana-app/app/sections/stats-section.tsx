import { StatsSection } from "@/sanity.types";
import SectionContainer from "../components/section-container";
import PortableTextComponent from "../components/portable-text";

type StatsSectionProps = { data: StatsSection };

const StatsSectionComponent = ({ data }: StatsSectionProps) => {
  const { title, stats } = data;

  return (
    <SectionContainer as="section" spacing="lg" className="bg-base-200">
      {title && (
        <div className="text-center mb-12">
          <PortableTextComponent
            value={title}
            className="prose prose-lg max-w-none mx-auto"
          />
        </div>
      )}

      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
                {stat.suffix && (
                  <span className="text-2xl md:text-3xl">{stat.suffix}</span>
                )}
              </div>
              <p className="text-base-content/70 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </SectionContainer>
  );
};

export default StatsSectionComponent;
