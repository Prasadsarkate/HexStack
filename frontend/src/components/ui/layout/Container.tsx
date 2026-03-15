import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "default" | "lg" | "xl" | "full";
}

const maxSizeMap = {
  sm: "max-w-3xl",
  default: "max-w-[1200px]",
  lg: "max-w-[1400px]",
  xl: "max-w-[1600px]",
  full: "max-w-full",
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full mx-auto px-4 md:px-6 lg:px-8", maxSizeMap[size], className)}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";
