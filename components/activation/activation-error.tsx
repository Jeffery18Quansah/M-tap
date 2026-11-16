import React from "react";
import { AlertCircle, RotateCcw, RefreshCw, ShieldAlert } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export interface ActivationErrorDetails {
  code: string;
  title: string;
  message: string;
  actionLabel?: string;
  canRetry?: boolean;
}

export interface ActivationErrorProps {
  error: ActivationErrorDetails;
  onRetry?: () => void;
  onReset: () => void;
}

export const ActivationError: React.FC<ActivationErrorProps> = ({
  error,
  onRetry,
  onReset,
}) => {
  const isTagAlreadyActive = error.code === "TAG_ALREADY_ACTIVE";
  const isExpired = error.code === "OTP_EXPIRED";

  return (
    <div className="flex flex-col items-center text-center w-full animate-fade-in">
      {/* Visual Alert Icon */}
      <div className="relative flex items-center justify-center w-18 h-18 rounded-full bg-state-danger-soft text-state-danger mb-4 border border-state-danger/20 shadow-xs">
        {isTagAlreadyActive ? (
          <ShieldAlert className="w-9 h-9 stroke-[2]" aria-hidden="true" />
        ) : (
          <AlertCircle className="w-9 h-9 stroke-[2]" aria-hidden="true" />
        )}
      </div>

      {/* Badge */}
      <div className="mb-2">
        <Badge variant={isExpired ? "warning" : "danger"} dot={true}>
          {isExpired ? "Code Expired" : "Notice"}
        </Badge>
      </div>

      {/* Title */}
      <h2 className="text-[22px] sm:text-[26px] font-bold text-brand-ink tracking-tight">
        {error.title}
      </h2>

      {/* Message */}
      <p className="text-[14px] text-neutral-600 max-w-[380px] mt-2 mb-6 leading-relaxed">
        {error.message}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full">
        {error.canRetry && onRetry ? (
          <Button
            variant="primary"
            size="lg"
            fullWidth={true}
            onClick={onRetry}
            className="flex-1"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{error.actionLabel || "Try again"}</span>
          </Button>
        ) : null}

        <Button
          variant="secondary"
          size="lg"
          fullWidth={true}
          onClick={onReset}
          className="flex-1"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start over</span>
        </Button>
      </div>
    </div>
  );
};
