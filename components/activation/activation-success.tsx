import React from "react";
import { ArrowRight, Check, Radio, RotateCcw, Smartphone } from "lucide-react";
import { Button } from "../ui/button";
import { formatTagUid } from "@/lib/utils/mask-phone";
import { detectMno } from "@/lib/utils/phone";

export interface ActivationSuccessProps {
  tagUid: string;
  maskedPhoneNumber: string;
  onReset: () => void;
  onDone: () => void;
}

export const ActivationSuccess: React.FC<ActivationSuccessProps> = ({
  tagUid,
  maskedPhoneNumber,
  onReset,
  onDone,
}) => {
  const formattedUid = formatTagUid(tagUid);
  const mno = detectMno(maskedPhoneNumber);

  return (
    <div className="activation-stage-enter mx-auto flex w-full max-w-[500px] flex-col items-center text-center">
      <div className="activation-success-mark relative mb-4 flex h-[68px] w-[68px] items-center justify-center rounded-full bg-state-success text-white">
        <span
          className="activation-success-ring absolute inset-0 rounded-full border-2 border-state-success/40"
          aria-hidden="true"
        />
        <Check
          className="activation-success-check h-8 w-8 stroke-[3]"
          aria-hidden="true"
        />
        <span className="sr-only" role="status">
          Demo setup complete.
        </span>
      </div>

      <h2 className="text-[27px] font-semibold leading-tight tracking-[-0.035em] text-black sm:text-[30px]">
        Demo setup complete
      </h2>
      <p className="mt-2 max-w-[380px] text-sm leading-6 text-neutral-600 sm:text-[15px]">
        Your tag is linked to the mobile money number below.
      </p>

      <section
        aria-label="Demo details"
        className="mt-6 w-full rounded-2xl border border-neutral-200 bg-white p-4 text-left shadow-sm sm:p-5"
      >
        <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
          Demo details
        </h3>
        <dl className="divide-y divide-neutral-100">
          <div className="flex items-center justify-between gap-4 py-3">
            <dt className="flex items-center gap-2 text-sm text-neutral-600">
              <Radio className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
              Tag ID
            </dt>
            <dd className="text-right text-sm font-semibold tabular-nums text-neutral-900">
              {formattedUid}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-3">
            <dt className="flex items-center gap-2 text-sm text-neutral-600">
              <Smartphone className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
              Mobile money
            </dt>
            <dd className="text-right text-sm font-semibold tabular-nums text-neutral-900">
              <span className="block">{maskedPhoneNumber}</span>
              {mno.code !== "UNKNOWN" && (
                <span className="mt-0.5 block text-xs font-medium text-neutral-500">
                  {mno.name}
                </span>
              )}
            </dd>
          </div>
        </dl>
      </section>

      <p className="mt-4 max-w-[430px] text-xs leading-5 text-neutral-500">
        This is a simulation. No wallet was connected and no payment was made.
      </p>

      <div className="mt-5 flex w-full flex-col gap-2 sm:flex-row">
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={onReset}
          className="flex-1"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          <span>Link another tag</span>
        </Button>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onDone}
          className="flex-1"
        >
          <span>Done</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};
