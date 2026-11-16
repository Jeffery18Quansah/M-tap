import React, { HTMLAttributes, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "flat" | "elevated" | "accent";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", variant = "default", ...props }, ref) => {
    const variantStyles = {
      default:
        "bg-white border border-neutral-100 shadow-[0_12px_36px_rgba(20,35,59,0.06)] rounded-[18px]",
      flat: "bg-white border border-neutral-200 rounded-[18px]",
      elevated:
        "bg-white border border-neutral-100 shadow-[0_16px_48px_rgba(20,35,59,0.09)] rounded-[20px]",
      accent:
        "bg-gradient-to-br from-white to-neutral-50/70 border border-neutral-100 shadow-[0_12px_36px_rgba(20,35,59,0.06)] rounded-[20px]",
    }[variant];

    return (
      <div
        ref={ref}
        className={`${variantStyles} transition-all duration-200 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

