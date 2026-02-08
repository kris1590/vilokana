import { StatsSection } from "@/sanity.types";
import SectionContainer from "../components/section-container";
import PortableTextComponent from "../components/portable-text";

const StatsSectionComponent = ({ data }: { data: StatsSection }) => {
  const { title, stats } = data;

  return (
    <SectionContainer as="section" spacing="lg" className="bg-base-200" disablePadding={data.theme?.disablePadding}>
      {title && (
        <div className="section-header">
          <PortableTextComponent value={title} className="prose prose-lg max-w-none" />
        </div>
      )}

      {stats && stats.length > 0 && (
        <div className="grid-stats">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="stat-value">
                {stat.value}
                {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
              </div>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      )}
    </SectionContainer>
  );
};

export default StatsSectionComponent;
