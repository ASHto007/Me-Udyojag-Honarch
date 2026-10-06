/**
 * Normalizes an Indian phone number.
 * Extracts digits and handles country code (+91 / 91 / 0) prefix.
 * 
 * @param {string} [phone]
 * @returns {string} 10-digit mobile number string
 */
export function normalizePhone(phone) {
  if (!phone || typeof phone !== 'string') return '';
  const digits = phone.replace(/\D/g, '');

  // 10 digits
  if (digits.length === 10) return digits;

  // 12 digits starting with 91 (e.g. 919876543210)
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }

  // 11 digits starting with 0 (e.g. 09876543210)
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }

  return digits;
}

export default normalizePhone;
