import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "md" | "lg" | "xl" | "none";
  background?: "default" | "accent" | "transparent";
}

const spacingMap = {
  none: "py-0",
  sm: "py-8 md:py-12",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-40",
};

const bgMap = {
  default: "bg-background",
  accent: "bg-accent/20 border-y border-border/40",
  transparent: "bg-transparent",
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = "md", background = "default", ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full",
          spacingMap[spacing],
          bgMap[background],
          className
        )}
        {...props}
      />
    );
  }
);
Section.displayName = "Section";
