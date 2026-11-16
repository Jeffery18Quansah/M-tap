import React from "react";
import { Lock, Radio } from "lucide-react";
import { formatTagUid } from "@/lib/utils/mask-phone";

export interface TagUidFieldProps {
  uid: string;
}

export const TagUidField: React.FC<TagUidFieldProps> = ({ uid }) => {
  const formattedUid = formatTagUid(uid);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between">
        <label className="text-[13px] font-semibold text-neutral-800 tracking-tight">
          Tag ID
        </label>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
          <Lock className="w-2.5 h-2.5 text-neutral-500" aria-hidden="true" />
          Locked
        </span>
      </div>

      <div className="relative flex items-center w-full h-[52px] px-3.5 bg-neutral-50 border border-neutral-200 rounded-[12px]">
        {/* Contactless Radio Icon */}
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-neutral-200/80 shadow-xs mr-3 text-brand-ink shrink-0">
          <Radio className="w-4 h-4 text-brand-ink" aria-hidden="true" />
        </div>

        {/* Monospace Formatted UID */}
        <span className="flex-1 font-mono text-[15px] sm:text-[16px] font-semibold text-brand-ink tracking-widest tabular-nums truncate">
          {formattedUid || "04A3 8CF2 1968 80"}
        </span>

      </div>
    </div>
  );
};
