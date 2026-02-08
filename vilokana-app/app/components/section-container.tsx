import React from "react";

type SectionSpacing = "default" | "sm" | "lg";
type ContainerWidth = "narrow" | "default" | "wide" | "full";

export interface SectionContainerProps
  extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: SectionSpacing;
  width?: ContainerWidth;
  as?: "section" | "div";
  className?: string;
  disablePadding?: boolean;
}

const spacingClasses: Record<SectionSpacing, string> = {
  default: "section-spacing",
  sm: "section-spacing-sm",
  lg: "section-spacing-lg",
};

const widthClasses: Record<ContainerWidth, string> = {
  narrow: "container-base container-narrow",
  default: "container-base container-default",
  wide: "container-base container-wide",
  full: "container-full",
};

const SectionContainer = React.forwardRef<HTMLElement, SectionContainerProps>(
  (
    {
      children,
      spacing = "default",
      width = "default",
      as: Component = "section",
      className = "",
      disablePadding = false,
      ...props
    },
    ref
  ) => (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      className={`${disablePadding ? "" : spacingClasses[spacing]} ${className}`.trim()}
      {...props}
    >
      <div className={widthClasses[width]}>{children}</div>
    </Component>
  )
);

SectionContainer.displayName = "SectionContainer";

export default SectionContainer;
