"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/forms/Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 m-4 rounded-xl border border-red-500/20 bg-red-500/5 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold mb-2 text-foreground">Something went wrong.</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm">
            {this.state.error?.message || "An unexpected error occurred in this component."}
          </p>
          <Button 
            variant="outline" 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="border-red-500/20 hover:bg-red-500/10"
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
