/**
 * Validation rules and helpers for M-Tap Flow 2 Self-Service Activation
 */

import { normalizeGhanaPhone } from "../utils/phone";

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Validates a 7-byte NTAG213 hexadecimal UID (14 hex chars)
 */
export function validateTagUid(rawUid: string | null | undefined): ValidationResult<string> {
  if (!rawUid || typeof rawUid !== "string" || !rawUid.trim()) {
    return {
      success: false,
      error: "Missing tag UID. Please scan a valid M-Tap QR code or select a sample tag.",
    };
  }

  const cleaned = rawUid.replace(/[^a-fA-F0-9]/g, "").toUpperCase();

  // NTAG213 chips use 7-byte factory UIDs (14 hexadecimal chars)
  if (cleaned.length !== 14) {
    return {
      success: false,
      error: `Invalid tag UID length (${cleaned.length} chars). Expected 14-character hex UID (7 bytes).`,
    };
  }

  if (!/^[0-9A-F]{14}$/.test(cleaned)) {
    return {
      success: false,
      error: "Invalid tag UID format. Must contain hexadecimal characters (0-9, A-F).",
    };
  }

  return {
    success: true,
    data: cleaned,
  };
}

/**
 * Validates phone number input
 */
export function validatePhoneNumber(rawPhone: string): ValidationResult<{ normalized: string; formatted: string }> {
  const result = normalizeGhanaPhone(rawPhone);
  if (!result.isValid) {
    return {
      success: false,
      error: result.error || "Please enter a valid Ghana mobile money number.",
    };
  }

  return {
    success: true,
    data: {
      normalized: result.normalized,
      formatted: result.formatted,
    },
  };
}

/**
 * Validates 6-digit OTP code
 */
export function validateOtp(otp: string): ValidationResult<string> {
  const cleaned = otp.trim();
  if (!cleaned) {
    return {
      success: false,
      error: "Please enter the 6-digit verification code.",
    };
  }

  if (!/^\d{6}$/.test(cleaned)) {
    return {
      success: false,
      error: "Verification code must consist of exactly 6 digits.",
    };
  }

  return {
    success: true,
    data: cleaned,
  };
}

