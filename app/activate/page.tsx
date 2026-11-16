import { Suspense } from "react";
import { ActivationShell } from "@/components/activation/activation-shell";
import { Loader2 } from "lucide-react";

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-page">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
        <p className="text-sm font-medium text-neutral-500">
          Reading M-Tap token credentials...
        </p>
      </div>
    </div>
  );
}

export default function ActivatePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ActivationShell />
    </Suspense>
  );
}
