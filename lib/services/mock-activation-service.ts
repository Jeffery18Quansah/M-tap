/**
 * Activation Service Implementation
 * Production-ready mock layer with deterministic handling
 */

import {
  ActivationService,
  DemoScenario,
  RequestOtpResponse,
  VerifyOtpResponse,
  TagDetails,
} from "./activation-service";
import { formatTagUid, maskPhoneNumber } from "../utils/mask-phone";

export const DEFAULT_OTP = "123456";

export const SAMPLE_TAGS = {
  READY: "04A38CF2196880",
  ALREADY_ACTIVE: "04B89DE1207191",
  REVOKED: "04EE55AA112233",
};

const KNOWN_TAGS: Record<string, Partial<TagDetails>> = {
  "04A38CF2196880": {
    isRegistered: false,
    status: "PENDING_ACTIVATION",
    hardware: "NTAG213 13.56 MHz",
  },
  "04B89DE1207191": {
    isRegistered: true,
    status: "ACTIVE",
    hardware: "NTAG213 13.56 MHz",
  },
  "04EE55AA112233": {
    isRegistered: false,
    status: "REVOKED",
    hardware: "NTAG213 13.56 MHz",
  },
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockActivationService implements ActivationService {
  async checkTagEligibility(
    uid: string,
    scenario: DemoScenario = "happy-path"
  ): Promise<{
    eligible: boolean;
    tag?: TagDetails;
    error?: { code: string; title: string; message: string };
  }> {
    await delay(300);

    if (scenario === "network-error") {
      return {
        eligible: false,
        error: {
          code: "NETWORK_ERROR",
          title: "Connection unavailable",
          message: "Unable to reach the server. Please check your internet connection.",
        },
      };
    }

    if (scenario === "tag-already-active" || uid === SAMPLE_TAGS.ALREADY_ACTIVE) {
      return {
        eligible: false,
        error: {
          code: "TAG_ALREADY_ACTIVE",
          title: "Tag already registered",
          message: "This tag is already linked to an active mobile money account.",
        },
      };
    }

    if (scenario === "tag-not-eligible" || uid === SAMPLE_TAGS.REVOKED) {
      return {
        eligible: false,
        error: {
          code: "TAG_REVOKED",
          title: "Tag unavailable",
          message: "This tag has been flagged as inactive. Please use a valid M-Tap sticker.",
        },
      };
    }

    const tagRecord = KNOWN_TAGS[uid] || {
      isRegistered: false,
      status: "PENDING_ACTIVATION",
      hardware: "NTAG213 13.56 MHz",
    };

    return {
      eligible: true,
      tag: {
        uid,
        formattedUid: formatTagUid(uid),
        isRegistered: tagRecord.isRegistered || false,
        status: (tagRecord.status as TagDetails["status"]) || "PENDING_ACTIVATION",
        hardware: tagRecord.hardware || "NTAG213 13.56 MHz",
      },
    };
  }

  async requestOtp(
    uid: string,
    phoneNumber: string,
    scenario: DemoScenario = "happy-path"
  ): Promise<RequestOtpResponse> {
    await delay(400);

    if (scenario === "network-error") {
      return {
        success: false,
        maskedPhone: maskPhoneNumber(phoneNumber),
        expiresInSeconds: 0,
        error: {
          code: "NETWORK_TIMEOUT",
          title: "Network timeout",
          message: "Unable to reach the SMS gateway. Please retry.",
          actionLabel: "Retry",
        },
      };
    }

    if (scenario === "sms-delivery-failed") {
      return {
        success: false,
        maskedPhone: maskPhoneNumber(phoneNumber),
        expiresInSeconds: 0,
        error: {
          code: "SMS_DISPATCH_FAILED",
          title: "SMS delivery failed",
          message: "Could not send the verification code to this phone number. Please check the number.",
          actionLabel: "Try another number",
        },
      };
    }

    return {
      success: true,
      maskedPhone: maskPhoneNumber(phoneNumber),
      expiresInSeconds: 300,
      demoCode: DEFAULT_OTP,
    };
  }

  async verifyOtp(
    uid: string,
    phoneNumber: string,
    otp: string,
    scenario: DemoScenario = "happy-path"
  ): Promise<VerifyOtpResponse> {
    await delay(500);

    if (scenario === "network-error") {
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          title: "Connection lost",
          message: "Failed to confirm activation with the server. Please try again.",
          canRetry: true,
          actionLabel: "Retry",
        },
      };
    }

    if (scenario === "expired-otp") {
      return {
        success: false,
        error: {
          code: "OTP_EXPIRED",
          title: "Code expired",
          message: "The 6-digit verification code has expired. Please request a new code.",
          canRetry: false,
          actionLabel: "Request new code",
        },
      };
    }

    if (scenario === "wrong-otp" || otp !== DEFAULT_OTP) {
      return {
        success: false,
        error: {
          code: "OTP_INVALID",
          title: "Incorrect code",
          message: "The verification code is incorrect. Please check and try again.",
          canRetry: true,
          actionLabel: "Try again",
        },
      };
    }

    if (scenario === "too-many-attempts") {
      return {
        success: false,
        error: {
          code: "TOO_MANY_ATTEMPTS",
          title: "Too many attempts",
          message: "Maximum verification attempts exceeded. Please wait 60 seconds.",
          canRetry: false,
          actionLabel: "Start over",
        },
      };
    }

    return {
      success: true,
      activatedAt: new Date().toISOString(),
      tagUid: uid,
      maskedPhone: maskPhoneNumber(phoneNumber),
    };
  }

  async resendOtp(
    uid: string,
    phoneNumber: string,
    scenario: DemoScenario = "happy-path"
  ): Promise<RequestOtpResponse> {
    return this.requestOtp(uid, phoneNumber, scenario);
  }
}

export const mockActivationService = new MockActivationService();
