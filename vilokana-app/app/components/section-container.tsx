import React from "react";

type SectionSpacing = "default" | "sm" | "lg";
type ContainerWidth = "default" | "narrow";

export interface SectionContainerProps
  extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: SectionSpacing;
  width?: ContainerWidth;
  as?: "section" | "div";
  className?: string;
}

const spacingClasses: Record<SectionSpacing, string> = {
  default: "section-spacing",
  sm: "section-spacing-sm",
  lg: "section-spacing-lg",
};

const widthClasses: Record<ContainerWidth, string> = {
  default: "container-content",
  narrow: "container-content container-narrow",
};

const SectionContainer = React.forwardRef<HTMLElement, SectionContainerProps>(
  (
    {
      children,
      spacing = "default",
      width = "default",
      as: Component = "section",
      className = "",
      ...props
    },
    ref
  ) => (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      className={`${spacingClasses[spacing]} ${className}`.trim()}
      {...props}
    >
      <div className={`w-full ${widthClasses[width]}`}>{children}</div>
    </Component>
  )
);

SectionContainer.displayName = "SectionContainer";

export default SectionContainer;
