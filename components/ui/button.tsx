import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "md" | "lg" | "sm";
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      fullWidth = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Sizing
    const sizeClasses = {
      sm: "h-10 px-4 text-sm rounded-[10px]",
      md: "min-h-[48px] h-12 px-6 text-[15px] font-semibold rounded-[12px]",
      lg: "min-h-[52px] h-[52px] px-8 text-[15px] font-semibold rounded-[12px]",
    }[size];

    // Variants according to Section 7
    const variantClasses = {
      primary:
        "bg-brand-yellow text-black hover:bg-brand-yellow-hover active:bg-[#CCAA00] focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 shadow-sm disabled:bg-neutral-200 disabled:text-neutral-500 disabled:cursor-not-allowed",
      secondary:
        "bg-white border border-brand-ink/20 text-brand-ink hover:bg-neutral-50 hover:border-brand-ink/40 active:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-brand-ink/30 focus-visible:ring-offset-2 disabled:border-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed",
      tertiary:
        "bg-transparent text-neutral-700 hover:text-brand-ink hover:bg-neutral-100/60 active:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-brand-ink/20 p-2 min-h-0 h-auto rounded-[8px] disabled:text-neutral-400 disabled:cursor-not-allowed",
      danger:
        "bg-state-danger text-white hover:bg-[#C23C3C] active:bg-[#A93333] focus-visible:ring-2 focus-visible:ring-state-danger/40 focus-visible:ring-offset-2 disabled:bg-neutral-200 disabled:text-neutral-500 disabled:cursor-not-allowed",
    }[variant];

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-180 select-none cursor-pointer focus:outline-none ${sizeClasses} ${variantClasses} ${widthClass} ${className}`}
        {...props}
      >
        {isLoading && (
          <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" aria-hidden="true" />
        )}
        <span className="inline-flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
