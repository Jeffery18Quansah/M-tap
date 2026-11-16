/**
 * Service contracts for M-Tap Flow 2 Activation
 * Decoupled interface so mock can be seamlessly swapped for live backend later.
 */

export type ActivationStep =
  | "tag-check"
  | "phone-entry"
  | "otp-verification"
  | "activating"
  | "success"
  | "error";

export type DemoScenario =
  | "happy-path"
  | "tag-already-active"
  | "tag-not-eligible"
  | "sms-delivery-failed"
  | "wrong-otp"
  | "expired-otp"
  | "too-many-attempts"
  | "network-error";

export interface TagDetails {
  uid: string;
  formattedUid: string;
  isRegistered: boolean;
  status: "ACTIVE" | "PENDING_ACTIVATION" | "FROZEN" | "REVOKED";
  hardware: string;
}

export interface RequestOtpResponse {
  success: boolean;
  maskedPhone: string;
  expiresInSeconds: number;
  demoCode?: string;
  error?: {
    code: string;
    title: string;
    message: string;
    actionLabel?: string;
  };
}

export interface VerifyOtpResponse {
  success: boolean;
  activatedAt?: string;
  tagUid?: string;
  maskedPhone?: string;
  error?: {
    code: string;
    title: string;
    message: string;
    actionLabel?: string;
    canRetry?: boolean;
  };
}

export interface ActivationService {
  checkTagEligibility(uid: string, scenario?: DemoScenario): Promise<{
    eligible: boolean;
    tag?: TagDetails;
    error?: {
      code: string;
      title: string;
      message: string;
    };
  }>;

  requestOtp(uid: string, phoneNumber: string, scenario?: DemoScenario): Promise<RequestOtpResponse>;

  verifyOtp(uid: string, phoneNumber: string, otp: string, scenario?: DemoScenario): Promise<VerifyOtpResponse>;

  resendOtp(uid: string, phoneNumber: string, scenario?: DemoScenario): Promise<RequestOtpResponse>;
}

