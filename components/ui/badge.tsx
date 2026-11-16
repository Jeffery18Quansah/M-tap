import React, { HTMLAttributes } from "react";

export type BadgeVariant =
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "brand";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "info",
  dot = true,
  className = "",
  ...props
}) => {
  const styles = {
    info: {
      bg: "bg-state-info-soft text-[#275EB0] border-state-info/20",
      dot: "bg-state-info",
    },
    success: {
      bg: "bg-state-success-soft text-state-success border-state-success/20",
      dot: "bg-state-success",
    },
    warning: {
      bg: "bg-state-warning-soft text-[#B36E0D] border-state-warning/20",
      dot: "bg-state-warning",
    },
    danger: {
      bg: "bg-state-danger-soft text-state-danger border-state-danger/20",
      dot: "bg-state-danger",
    },
    neutral: {
      bg: "bg-neutral-100 text-neutral-700 border-neutral-200",
      dot: "bg-neutral-500",
    },
    brand: {
      bg: "bg-brand-sky text-brand-ink border-brand-ink/10",
      dot: "bg-brand-yellow",
    },
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-semibold uppercase tracking-wider rounded-full border ${styles.bg} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${styles.dot}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
