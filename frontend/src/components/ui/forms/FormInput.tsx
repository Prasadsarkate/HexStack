"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-2 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-xl border border-border/50 bg-background/50 px-4 py-2 text-sm focus-visible:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors placeholder:text-muted-foreground",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

export const FormTextarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string, error?: string }>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-2 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          className={cn(
            "flex min-h-[120px] w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm focus-visible:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors placeholder:text-muted-foreground resize-y",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
FormTextarea.displayName = "FormTextarea";
