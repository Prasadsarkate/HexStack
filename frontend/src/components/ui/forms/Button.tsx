import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export const buttonVariants = ({ variant = "primary", size = "md", className }: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) => {
  return cn(
    "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 text-center",
    {
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]":
        variant === "primary",
      "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]":
        variant === "secondary",
      "border border-border/50 bg-transparent hover:bg-accent/50 text-foreground":
        variant === "outline",
      "hover:bg-accent/50 text-foreground": variant === "ghost",
      "h-9 px-4 text-sm": size === "sm",
      "h-11 px-6 text-base": size === "md",
      "h-14 px-8 text-lg": size === "lg",
    },
    className
  );
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
    if (asChild) {
      if (!React.isValidElement(children)) {
        return null;
      }
      return React.cloneElement(children, {
        className: cn(buttonVariants({ variant, size, className }), (children.props as any).className),
        ref: ref as any
      } as any);
    }
    
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
