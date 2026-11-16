import React, { useRef, useState, useEffect } from "react";
import { Clock, RefreshCw } from "lucide-react";

export interface OtpInputProps {
  value: string;
  onChange: (otp: string) => void;
  onComplete?: (otp: string) => void;
  onResend?: () => void;
  isResending?: boolean;
  disabled?: boolean;
  error?: string;
  expiresInSeconds?: number;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  onComplete,
  onResend,
  isResending = false,
  disabled = false,
  error,
  expiresInSeconds = 300,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(expiresInSeconds);
  const [canResend, setCanResend] = useState(false);

  // 6 cell refs
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Array of 6 digits from value string
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || "");

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Permit resend after 25 seconds
    const resendTimer = setTimeout(() => {
      setCanResend(true);
    }, 25000);

    return () => {
      clearInterval(timer);
      clearTimeout(resendTimer);
    };
  }, [expiresInSeconds]);

  // Handle individual digit input
  const handleDigitChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.replace(/\D/g, "");
    if (!char) {
      const newDigits = [...digits];
      newDigits[index] = "";
      const updated = newDigits.join("");
      onChange(updated);
      return;
    }

    const digit = char.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = digit;
    const updated = newDigits.join("");
    onChange(updated);

    if (index < 5 && digit) {
      inputRefs.current[index + 1]?.focus();
    }

    if (updated.length === 6 && onComplete) {
      onComplete(updated);
    }
  };

  // Handle key down (Backspace and Arrow navigation)
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pastedData) return;

    onChange(pastedData);

    const nextFocusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextFocusIndex]?.focus();

    if (pastedData.length === 6 && onComplete) {
      onComplete(pastedData);
    }
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isExpired = secondsRemaining === 0;

  return (
    <div className="flex flex-col items-center w-full gap-4">
      {/* 6 OTP Cells */}
      <div
        className="grid w-full max-w-[340px] grid-cols-6 gap-1.5 sm:gap-2.5"
        role="group"
        aria-label="6-digit verification code"
      >
        {Array.from({ length: 6 }).map((_, i) => {
          const isFilled = Boolean(digits[i]);
          return (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digits[i]}
              onChange={(e) => handleDigitChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              disabled={disabled || isExpired}
              aria-label={`Digit ${i + 1} of 6`}
              className={`h-13 min-w-0 w-full sm:h-14 text-center text-xl sm:text-2xl font-bold font-mono rounded-[12px] border transition-all duration-150 tabular-nums focus:outline-none select-all ${
                error
                  ? "border-state-danger bg-state-danger-soft/30 text-state-danger focus:border-state-danger focus:ring-2 focus:ring-state-danger/20"
                  : isFilled
                  ? "border-brand-ink bg-white text-brand-ink shadow-xs"
                  : "border-neutral-200 bg-white text-neutral-900 focus:border-black focus:ring-2 focus:ring-black/20"
              } ${isExpired ? "opacity-50 cursor-not-allowed bg-neutral-100" : ""}`}
            />
          );
        })}
      </div>

      {/* Expiry Timer & Resend */}
      <div className="flex items-center justify-between w-full max-w-[340px] text-[13px] px-0.5">
        <div
          className={`flex items-center gap-1.5 font-medium ${
            isExpired ? "text-state-danger font-semibold" : "text-neutral-500"
          }`}
        >
          <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>
            {isExpired ? "Code expired" : `Expires in ${formattedTime}`}
          </span>
        </div>

        {onResend && (
          <button
            type="button"
            onClick={() => {
              setSecondsRemaining(expiresInSeconds);
              setCanResend(false);
              onResend();
            }}
            disabled={!canResend || isResending || disabled}
            className="inline-flex items-center gap-1 font-semibold text-black hover:text-neutral-700 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isResending ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
            <span>Resend code</span>
          </button>
        )}
      </div>
    </div>
  );
};
