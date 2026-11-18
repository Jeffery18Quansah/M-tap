"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Phone, Radio } from "lucide-react";
import { MtapLogo } from "../brand/mtap-logo";
import { Button } from "../ui/button";
import { ActivationProgress } from "./activation-progress";
import { ActivationIllustration } from "./activation-illustration";
import { TagUidField } from "./tag-uid-field";
import { PhoneNumberField } from "./phone-number-field";
import { OtpInput } from "./otp-input";
import { ActivationSuccess } from "./activation-success";
import { ActivationError, ActivationErrorDetails } from "./activation-error";
import { ActivationStep } from "@/lib/services/activation-service";
import {
  liveActivationService,
  TEST_TAG_UID,
} from "@/lib/services/live-activation-service";
import {
  validateTagUid,
  validatePhoneNumber,
  validateOtp,
} from "@/lib/validation/activation";

export const ActivationShell: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlUid = searchParams.get("uid") || "";

  const [step, setStep] = useState<ActivationStep>("tag-check");
  const [uid] = useState<string>(() => urlUid || TEST_TAG_UID);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [maskedPhoneNumber, setMaskedPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [otpError, setOtpError] = useState<string | undefined>();
  const [currentError, setCurrentError] =
    useState<ActivationErrorDetails | null>(null);

  const handleProceedFromTagCheck = async () => {
    setIsLoading(true);
    setCurrentError(null);

    const uidValidation = validateTagUid(uid);
    if (!uidValidation.success) {
      setIsLoading(false);
      setCurrentError({
        code: uid ? "INVALID_UID" : "MISSING_UID",
        title: uid ? "Invalid tag identifier" : "Missing tag identifier",
        message:
          uidValidation.error ||
          "Could not detect a valid M-Tap tag UID. Please scan your sticker QR code again.",
        actionLabel: "Scan again",
        canRetry: false,
      });
      setStep("error");
      return;
    }

    const eligibility = await liveActivationService.checkTagEligibility(
      uidValidation.data!
    );
    setIsLoading(false);

    if (!eligibility.eligible && eligibility.error) {
      setCurrentError({
        code: eligibility.error.code,
        title: eligibility.error.title,
        message: eligibility.error.message,
        actionLabel: "Try another tag",
        canRetry: false,
      });
      setStep("error");
      return;
    }

    setStep("phone-entry");
  };

  const handleRequestOtp = async () => {
    setPhoneError(undefined);

    const validation = validatePhoneNumber(phoneNumber);
    if (!validation.success) {
      setPhoneError(validation.error);
      return;
    }

    setIsLoading(true);
    const response = await liveActivationService.requestOtp(
      uid,
      validation.data!.normalized
    );
    setIsLoading(false);

    if (!response.success && response.error) {
      setCurrentError({
        code: response.error.code,
        title: response.error.title,
        message: response.error.message,
        actionLabel: response.error.actionLabel,
        canRetry: true,
      });
      setStep("error");
      return;
    }

    setMaskedPhoneNumber(response.maskedPhone);
    setOtp("");
    setStep("otp-verification");
  };

  const handleVerifyOtp = async (inputOtp?: string) => {
    const codeToVerify = inputOtp || otp;
    setOtpError(undefined);

    const validation = validateOtp(codeToVerify);
    if (!validation.success) {
      setOtpError(validation.error);
      return;
    }

    setIsLoading(true);
    setStep("activating");

    const response = await liveActivationService.verifyOtp(
      uid,
      phoneNumber,
      codeToVerify
    );
    setIsLoading(false);

    if (!response.success && response.error) {
      if (response.error.code === "OTP_INVALID") {
        setOtpError(response.error.message);
        setStep("otp-verification");
        return;
      }

      setCurrentError({
        code: response.error.code,
        title: response.error.title,
        message: response.error.message,
        actionLabel: response.error.actionLabel,
        canRetry: response.error.canRetry,
      });
      setStep("error");
      return;
    }

    setStep("success");
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    const response = await liveActivationService.resendOtp(uid, phoneNumber);
    setIsLoading(false);

    if (response.success) {
      setOtp("");
      setOtpError(undefined);
    } else if (response.error) {
      setOtpError(response.error.message);
    }
  };

  const handleReset = () => {
    setStep("tag-check");
    setPhoneNumber("");
    setOtp("");
    setOtpError(undefined);
    setPhoneError(undefined);
    setCurrentError(null);
  };

  const showProgress = step !== "success" && step !== "error";
  const backToTag = () => setStep("tag-check");
  const backToPhone = () => setStep("phone-entry");
  const backAction =
    step === "phone-entry"
      ? { label: "Back", onClick: backToTag }
      : step === "otp-verification"
        ? { label: "Change number", onClick: backToPhone }
        : null;
  const illustrationCopy =
    step === "tag-check"
      ? {
          title: "Let’s link your tag",
          description: "Confirm this tag ID to continue.",
        }
      : step === "phone-entry"
        ? {
            title: "Your mobile money number",
            description: "Enter the mobile money number you want to use.",
          }
        : step === "otp-verification"
          ? {
              title: "Verify your number",
              description: `Enter the six-digit code for ${
                maskedPhoneNumber || "+233 24 ••• ••67"
              }.`,
            }
          : step === "activating"
            ? {
                title: "Finishing activation",
                description: "Confirming your tag and mobile number.",
              }
            : undefined;

  return (
    <div className="flex min-h-dvh flex-col bg-white text-text-primary selection:bg-brand-yellow/30 selection:text-black">
      <header className="z-10 flex h-16 shrink-0 items-center justify-between border-b border-neutral-100 bg-white px-5 sm:px-8 lg:px-10">
        <MtapLogo height={34} asLink href="/" />
        <a
          href="tel:+233546007121"
          className="inline-flex min-h-11 items-center px-2 text-sm font-medium text-neutral-700 transition-colors hover:text-black focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Support</span>
        </a>
      </header>

      <main className="flex flex-1 flex-col lg:grid lg:grid-cols-2">
        <section
          aria-label="Tag-linking steps"
          className="order-2 flex min-w-0 flex-col justify-center px-5 py-6 sm:px-8 sm:py-8 lg:order-1 lg:px-[clamp(2rem,5vw,5rem)] lg:py-12"
        >
          <div className="mx-auto w-full max-w-[540px]">
            {backAction && (
              <button
                type="button"
                onClick={backAction.onClick}
                className="mb-4 inline-flex min-h-11 items-center gap-2 pr-3 text-sm font-semibold text-neutral-600 transition-colors hover:text-black focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {backAction.label}
              </button>
            )}

            {showProgress && (
              <ActivationProgress currentStep={step} />
            )}

            {step === "tag-check" && (
              <div
                key="tag-check"
                className="activation-stage-enter flex flex-col gap-5 sm:gap-6"
              >
                <TagUidField uid={uid} />

                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isLoading}
                    onClick={handleProceedFromTagCheck}
                    className="rounded-[14px]"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <p className="text-xs leading-5 text-neutral-500">
                    A live verification request will be sent to the M-Tap backend.
                  </p>
                </div>
              </div>
            )}

            {step === "phone-entry" && (
              <div
                key="phone-entry"
                className="activation-stage-enter flex flex-col gap-5 sm:gap-6"
              >
                <PhoneNumberField
                  value={phoneNumber}
                  onChange={(value) => {
                    setPhoneNumber(value);
                    if (phoneError) setPhoneError(undefined);
                  }}
                  error={phoneError}
                  disabled={isLoading}
                />
                <p className="-mt-3 text-xs leading-5 text-neutral-500">
                  Requesting a code may send an SMS to this number.
                </p>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                  onClick={handleRequestOtp}
                  className="rounded-[14px]"
                >
                  Request verification code
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            )}

            {step === "otp-verification" && (
              <div
                key="otp-verification"
                className="activation-stage-enter flex flex-col gap-5 sm:gap-6"
              >
                <OtpInput
                  value={otp}
                  onChange={(value) => {
                    setOtp(value);
                    if (otpError) setOtpError(undefined);
                  }}
                  onComplete={handleVerifyOtp}
                  onResend={handleResendOtp}
                  isResending={isLoading}
                  disabled={isLoading}
                  error={otpError}
                />

                {otpError && (
                  <p className="-mt-4 text-sm text-state-danger" role="alert">
                    {otpError}
                  </p>
                )}

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                  onClick={() => handleVerifyOtp()}
                  className="rounded-[14px]"
                >
                  Verify and finish
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            )}

            {step === "activating" && (
              <div
                key="activating"
                className="activation-stage-enter flex min-h-[300px] flex-col items-center justify-center gap-5 text-center"
                aria-live="polite"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow/25 text-black">
                  <Radio className="h-7 w-7 animate-pulse" aria-hidden="true" />
                </div>
                <span className="sr-only">
                  Finishing activation. Confirming your tag and mobile number.
                </span>
              </div>
            )}

            {step === "success" && (
              <div key="success" className="activation-stage-enter">
                <ActivationSuccess
                  tagUid={uid}
                  maskedPhoneNumber={maskedPhoneNumber || "+233 24 ••• ••67"}
                  onReset={handleReset}
                  onDone={() => router.push("/")}
                />
              </div>
            )}

            {step === "error" && currentError && (
              <div key="error" className="activation-stage-enter">
                <ActivationError
                  error={currentError}
                  onRetry={() => {
                    if (currentError.code === "SMS_DISPATCH_FAILED") {
                      setStep("phone-entry");
                    } else if (currentError.code === "OTP_EXPIRED") {
                      void handleResendOtp();
                      setStep("otp-verification");
                    } else {
                      void handleProceedFromTagCheck();
                    }
                  }}
                  onReset={handleReset}
                />
              </div>
            )}
          </div>
        </section>

        <ActivationIllustration
          step={step}
          title={illustrationCopy?.title}
          description={illustrationCopy?.description}
        />
      </main>

      <footer className="flex shrink-0 flex-col items-center justify-center gap-1 border-t border-neutral-100 bg-white px-5 py-3 text-xs text-neutral-500 sm:flex-row sm:gap-2">
        <MtapLogo height={20} asLink={false} />
      </footer>
    </div>
  );
};
