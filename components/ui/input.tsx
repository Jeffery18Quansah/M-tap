import React, { InputHTMLAttributes, forwardRef, useId } from "react";
import { AlertCircle } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      startAdornment,
      endAdornment,
      id,
      className = "",
      containerClassName = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const hasError = Boolean(error);
    const hasCustomPl = /\bpl-/.test(className);
    const hasCustomPr = /\bpr-/.test(className);

    const defaultPl = startAdornment ? (hasCustomPl ? "" : "pl-11") : "pl-4";
    const defaultPr = endAdornment ? (hasCustomPr ? "" : "pr-11") : "pr-4";

    return (
      <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-[13px] font-semibold text-neutral-800 select-none flex items-center justify-between tracking-tight"
          >
            <span>{label}</span>
          </label>
        )}

        <div className="relative flex items-center w-full">
          {startAdornment && (
            <div className="absolute left-3.5 flex items-center text-neutral-500 z-10 pointer-events-none select-none">
              {startAdornment}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError ? "true" : undefined}
            aria-describedby={
              hasError ? errorId : helperText ? helperId : undefined
            }
            className={`w-full h-[52px] bg-white rounded-[12px] text-[15px] font-medium text-neutral-900 placeholder:text-neutral-400 placeholder:font-normal transition-all duration-180 border focus:outline-none disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed ${defaultPl} ${defaultPr} ${
              hasError
                ? "border-state-danger text-state-danger focus:border-state-danger focus:ring-3 focus:ring-state-danger/15"
                : "border-neutral-200 hover:border-neutral-300 focus:border-brand-ink focus:ring-3 focus:ring-brand-ink/10"
            } ${className}`}
            {...props}
          />

          {endAdornment && (
            <div className="absolute right-3.5 flex items-center text-neutral-500 select-none">
              {endAdornment}
            </div>
          )}
        </div>

        {hasError ? (
          <p
            id={errorId}
            className="text-[13px] text-state-danger flex items-center gap-1.5 mt-0.5"
            role="alert"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-[12px] text-neutral-500 mt-0.5">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
