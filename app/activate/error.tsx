"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Activation route error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-page p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-[18px] border border-neutral-200 shadow-card text-center">
        <div className="w-14 h-14 rounded-full bg-state-danger-soft text-state-danger flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-brand-ink mb-2">
          Unable to load activation
        </h2>
        <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
          An unexpected error occurred while initializing the activation session.
        </p>
        <Button variant="primary" fullWidth onClick={() => reset()}>
          <RotateCcw className="w-4 h-4" />
          <span>Reload session</span>
        </Button>
      </div>
    </div>
  );
}

