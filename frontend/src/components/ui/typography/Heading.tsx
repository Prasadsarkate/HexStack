import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const headingVariants = cva(
  "font-bold tracking-tight text-foreground",
  {
    variants: {
      size: {
        h1: "text-4xl md:text-6xl lg:text-7xl",
        h2: "text-3xl md:text-5xl lg:text-6xl",
        h3: "text-2xl md:text-4xl",
        h4: "text-xl md:text-2xl",
        h5: "text-lg md:text-xl",
        h6: "text-base md:text-lg",
      },
      gradient: {
        true: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary",
        false: "",
      }
    },
    defaultVariants: {
      size: "h2",
      gradient: false,
    },
  }
);

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, gradient, as, ...props }, ref) => {
    const Component = as || (size ? size : "h2");
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ size, gradient }), className)}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";
