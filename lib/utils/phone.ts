/**
 * Ghana phone number utilities for M-Tap
 * Default country context: Ghana (+233)
 */

export interface MnoInfo {
  name: string;
  code: "MTN" | "TELECEL" | "AT" | "UNKNOWN";
  brandColor: string;
}

export function detectMno(normalizedNumber: string): MnoInfo {
  // expects normalized number like "+233241234567" or "233241234567"
  const digits = normalizedNumber.replace(/\D/g, "");
  const localDigits = digits.startsWith("233") ? digits.slice(3) : digits.startsWith("0") ? digits.slice(1) : digits;
  const prefix2 = localDigits.slice(0, 2);

  // MTN Ghana: 24, 54, 55, 59, 53
  if (["24", "54", "55", "59", "53"].includes(prefix2)) {
    return { name: "MTN Mobile Money", code: "MTN", brandColor: "#FFCC00" };
  }
  // Telecel (formerly Vodafone): 20, 50
  if (["20", "50"].includes(prefix2)) {
    return { name: "Telecel Cash", code: "TELECEL", brandColor: "#E60000" };
  }
  // AT (AirtelTigo): 27, 57, 26
  if (["27", "57", "26"].includes(prefix2)) {
    return { name: "AT Money", code: "AT", brandColor: "#0055A5" };
  }

  return { name: "Mobile Money", code: "UNKNOWN", brandColor: "#FF6B35" };
}

/**
 * Normalizes user input into E.164 format: +233XXXXXXXXX
 */
export function normalizeGhanaPhone(input: string): {
  isValid: boolean;
  normalized: string;
  formatted: string;
  error?: string;
} {
  const cleaned = input.trim();
  if (!cleaned) {
    return { isValid: false, normalized: "", formatted: "", error: "Phone number is required." };
  }

  // Strip spaces, dashes, parentheses
  const digitsOnly = cleaned.replace(/[^\d+]/g, "");

  let pureDigits = digitsOnly.replace(/\+/g, "");

  // Handle +233 or 233 prefix
  if (pureDigits.startsWith("233")) {
    pureDigits = pureDigits.slice(3);
  } else if (pureDigits.startsWith("0")) {
    pureDigits = pureDigits.slice(1);
  }

  // Pure local digits should be exactly 9 digits in Ghana
  if (pureDigits.length !== 9) {
    return {
      isValid: false,
      normalized: "",
      formatted: cleaned,
      error: pureDigits.length < 9 
        ? "Phone number is too short (9 digits required after country code)." 
        : "Phone number is too long (9 digits required after country code).",
    };
  }

  const normalized = `+233${pureDigits}`;
  const formatted = `+233 ${pureDigits.slice(0, 2)} ${pureDigits.slice(2, 5)} ${pureDigits.slice(5)}`;

  return {
    isValid: true,
    normalized,
    formatted,
  };
}

/**
 * Formats a raw user input as they type (e.g., 024 123 4567)
 */
export function formatAsLocalGhana(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (!digits) return "";
  
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
}

