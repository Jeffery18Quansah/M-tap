/**
 * Phone number and Tag UID masking utilities
 */

/**
 * Masks a normalized phone number for confirmation screens
 * Example: +233241234567 -> +233 ••• ••• 4567
 */
export function maskPhoneNumber(phone: string): string {
  if (!phone) return "";
  const cleaned = phone.replace(/[^\d+]/g, "");

  if (cleaned.startsWith("+233")) {
    const local = cleaned.slice(4);
    if (local.length === 9) {
      return `+233 ${local.slice(0, 2)} ••• ••${local.slice(7)}`;
    }
  }

  // Fallback generic masking
  if (cleaned.length >= 8) {
    const firstTwo = cleaned.slice(0, 4);
    const lastTwo = cleaned.slice(-2);
    return `${firstTwo} •••• ${lastTwo}`;
  }

  return phone;
}

/**
 * Formats a 7-byte / 14-char tag UID into readable groups
 * Example: 04A38CF2196880 -> 04A3 8CF2 1968 80
 */
export function formatTagUid(uid: string): string {
  if (!uid) return "";
  const cleaned = uid.replace(/[^a-fA-F0-9]/g, "").toUpperCase();
  if (cleaned.length === 14) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8, 12)} ${cleaned.slice(12, 14)}`;
  }
  return cleaned;
}

