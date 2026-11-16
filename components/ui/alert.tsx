import React, { HTMLAttributes } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
} from "lucide-react";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  title,
  description,
  action,
  className = "",
  children,
  ...props
}) => {
  const configs = {
    info: {
      container: "bg-state-info-soft border-[#3977D5]/20 text-neutral-900",
      icon: <Info className="w-5 h-5 text-[#3977D5] shrink-0 mt-0.5" aria-hidden="true" />,
    },
    success: {
      container: "bg-state-success-soft border-state-success/25 text-neutral-900",
      icon: <CheckCircle2 className="w-5 h-5 text-state-success shrink-0 mt-0.5" aria-hidden="true" />,
    },
    warning: {
      container: "bg-state-warning-soft border-[#D98A16]/25 text-neutral-900",
      icon: <AlertTriangle className="w-5 h-5 text-[#D98A16] shrink-0 mt-0.5" aria-hidden="true" />,
    },
    danger: {
      container: "bg-state-danger-soft border-state-danger/25 text-neutral-900",
      icon: <AlertCircle className="w-5 h-5 text-state-danger shrink-0 mt-0.5" aria-hidden="true" />,
    },
  }[variant];

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 p-4 rounded-[14px] border ${configs.container} ${className}`}
      {...props}
    >
      {configs.icon}
      <div className="flex-1 min-w-0">
        <h4 className="text-[14px] font-semibold tracking-tight text-neutral-900 leading-snug">
          {title}
        </h4>
        {description && (
          <p className="text-[13px] text-neutral-700 mt-1 leading-relaxed">
            {description}
          </p>
        )}
        {children}
        {action && <div className="mt-2.5">{action}</div>}
      </div>
    </div>
  );
};

