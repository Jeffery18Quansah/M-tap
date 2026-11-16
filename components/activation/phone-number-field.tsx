import React from "react";
import { Phone } from "lucide-react";
import { Input } from "../ui/input";
import { detectMno, formatAsLocalGhana } from "@/lib/utils/phone";

export interface PhoneNumberFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export const PhoneNumberField: React.FC<PhoneNumberFieldProps> = ({
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const detectedMno = detectMno(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatAsLocalGhana(raw);
    onChange(formatted);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <Input
        label="Mobile money number"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="024 123 4567"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        error={error}
        className="pl-[84px] pr-[84px]"
        startAdornment={
          <div className="flex items-center gap-1.5 pr-2.5 border-r border-neutral-200">
            <span className="text-[13px] leading-none" aria-hidden="true">🇬🇭</span>
            <span className="text-[14px] font-semibold text-neutral-800 tabular-nums">
              +233
            </span>
          </div>
        }
        endAdornment={
          detectedMno.code !== "UNKNOWN" ? (
            <div className="flex items-center gap-1.5 bg-neutral-100 px-2 py-1 rounded-md text-[11px] font-medium text-neutral-700">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: detectedMno.brandColor }}
              />
              <span>{detectedMno.name.split(" ")[0]}</span>
            </div>
          ) : (
            <Phone className="w-4 h-4 text-neutral-400" aria-hidden="true" />
          )
        }
      />
    </div>
  );
};
