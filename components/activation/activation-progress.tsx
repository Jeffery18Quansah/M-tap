import React from "react";
import { Check } from "lucide-react";
import { ActivationStep } from "@/lib/services/activation-service";

interface StepConfig {
  id: number;
  label: string;
  steps: ActivationStep[];
}

const STEPS: StepConfig[] = [
  { id: 1, label: "Tag ID", steps: ["tag-check"] },
  { id: 2, label: "Phone", steps: ["phone-entry"] },
  { id: 3, label: "Verify", steps: ["otp-verification", "activating"] },
];

export interface ActivationProgressProps {
  currentStep: ActivationStep;
}

export const ActivationProgress: React.FC<ActivationProgressProps> = ({ currentStep }) => {
  const getStepStatus = (stepIndex: number): "completed" | "current" | "upcoming" => {
    if (currentStep === "success") return "completed";

    const currentIdx = STEPS.findIndex((s) => s.steps.includes(currentStep));
    const activeIndex = currentIdx === -1 ? 0 : currentIdx;

    if (stepIndex < activeIndex) return "completed";
    if (stepIndex === activeIndex) return "current";
    return "upcoming";
  };

  return (
    <nav aria-label="Progress" className="mb-3 w-full lg:mb-6">
      <ol className="mx-auto grid max-w-[320px] grid-cols-3">
        {STEPS.map((step, idx) => {
          const status = getStepStatus(idx);
          const isCompleted = status === "completed";
          const isCurrent = status === "current";

          return (
            <li key={step.id} className="relative flex flex-col items-center">
              {idx < STEPS.length - 1 && (
                <span
                  className="absolute left-1/2 top-3.5 z-0 h-px w-full bg-neutral-200"
                  aria-hidden="true"
                />
              )}
              <div
                className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-200 ${
                  isCompleted
                    ? "bg-state-success border-state-success text-white shadow-xs"
                    : isCurrent
                    ? "bg-brand-yellow border-brand-yellow text-black ring-4 ring-brand-yellow/20"
                    : "bg-white border-neutral-300 text-neutral-400"
                }`}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>

              <span
                className={`mt-1.5 text-[11px] font-medium tracking-tight text-center ${
                  isCurrent
                    ? "text-brand-ink font-semibold"
                    : isCompleted
                    ? "text-neutral-700"
                    : "text-neutral-400"
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
