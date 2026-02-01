import React from "react";

type BadgeVariant = "primary" | "secondary" | "accent" | "neutral" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "badge-primary",
  secondary: "badge-secondary",
  accent: "badge-accent",
  neutral: "badge-neutral",
  outline: "badge-outline",
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "primary", children, className = "", ...props }, ref) => (
    <span
      ref={ref}
      className={`badge badge-sm ${variantClasses[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = "Badge";

export default Badge;
