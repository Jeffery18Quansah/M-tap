import {
  ActivationService,
  RequestOtpResponse,
  VerifyOtpResponse,
} from "./activation-service";
import { maskPhoneNumber } from "../utils/mask-phone";

export const TEST_TAG_UID = "04A38CF2196880";

interface ApiErrorBody {
  code?: string;
  message?: string;
  error?: string;
  detail?: string;
  title?: string;
}

function toE164International(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, "");
}

async function readError(response: Response): Promise<ApiErrorBody> {
  try {
    return (await response.json()) as ApiErrorBody;
  } catch {
    return {};
  }
}

function otpErrorForStatus(status: number, body: ApiErrorBody) {
  if (status === 429) {
    return {
      code: "SMS_RATE_LIMITED",
      title: "Please wait",
      message: "An SMS was recently requested. Please wait before trying again.",
      actionLabel: "Try again",
    };
  }

  return {
    code: body.code || `API_ERROR_${status}`,
    title: body.title || "Unable to send code",
    message: body.message || body.error || body.detail || "Could not request verification. Please try again.",
    actionLabel: "Try again",
  };
}

export class LiveActivationService implements ActivationService {
  async checkTagEligibility(uid: string): Promise<{
    eligible: boolean;
    tag?: {
      uid: string;
      formattedUid: string;
      isRegistered: boolean;
      status: "ACTIVE" | "PENDING_ACTIVATION" | "FROZEN" | "REVOKED";
      hardware: string;
    };
    error?: { code: string; title: string; message: string };
  }> {
    // The hosted API validates tag state when pairing is initiated.
    return {
      eligible: true,
      tag: {
        uid,
        formattedUid: uid,
        isRegistered: false,
        status: "PENDING_ACTIVATION",
        hardware: "NTAG213 13.56 MHz",
      },
    };
  }

  async requestOtp(
    uid: string,
    phoneNumber: string
  ): Promise<RequestOtpResponse> {
    try {
      const response = await fetch("/api/tags/initiate-pairing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tag_uid: uid,
          phone_number: toE164International(phoneNumber),
        }),
      });

      if (!response.ok) {
        const body = await readError(response);
        return {
          success: false,
          maskedPhone: maskPhoneNumber(phoneNumber),
          expiresInSeconds: 0,
          error: otpErrorForStatus(response.status, body),
        };
      }

      return {
        success: true,
        maskedPhone: maskPhoneNumber(phoneNumber),
        expiresInSeconds: 300,
      };
    } catch {
      return {
        success: false,
        maskedPhone: maskPhoneNumber(phoneNumber),
        expiresInSeconds: 0,
        error: {
          code: "NETWORK_ERROR",
          title: "Connection unavailable",
          message: "Unable to reach M-Tap. Please check your connection and try again.",
          actionLabel: "Retry",
        },
      };
    }
  }

  async verifyOtp(
    uid: string,
    phoneNumber: string,
    otp: string
  ): Promise<VerifyOtpResponse> {
    try {
      const response = await fetch("/api/tags/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tag_uid: uid, otp }),
      });

      if (!response.ok) {
        const body = await readError(response);
        if (response.status === 401) {
          return {
            success: false,
            error: {
              code: "OTP_INVALID",
              title: body.title || "Incorrect code",
              message: body.message || body.error || body.detail || "The verification code is invalid or has expired.",
              actionLabel: "Try again",
              canRetry: true,
            },
          };
        }

        return {
          success: false,
          error: {
            code: body.code || `API_ERROR_${response.status}`,
            title: body.title || "Unable to verify code",
            message: body.message || body.error || body.detail || "Could not verify the code. Please try again.",
            actionLabel: "Try again",
            canRetry: true,
          },
        };
      }

      const body = await response.json().catch(() => ({})) as {
        activated_at?: unknown;
        tag_uid?: unknown;
      };
      return {
        success: true,
        activatedAt: typeof body.activated_at === "string" ? body.activated_at : new Date().toISOString(),
        tagUid: typeof body.tag_uid === "string" ? body.tag_uid : uid,
        maskedPhone: maskPhoneNumber(phoneNumber),
      };
    } catch {
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          title: "Connection lost",
          message: "Failed to confirm activation with M-Tap. Please try again.",
          actionLabel: "Retry",
          canRetry: true,
        },
      };
    }
  }

  async resendOtp(
    uid: string,
    phoneNumber: string
  ): Promise<RequestOtpResponse> {
    return this.requestOtp(uid, phoneNumber);
  }
}

export const liveActivationService = new LiveActivationService();
