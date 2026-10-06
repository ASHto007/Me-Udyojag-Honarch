/**
 * Normalizes email by trimming and converting to lowercase.
 * 
 * @param {string} [email]
 * @returns {string}
 */
export function normalizeEmail(email) {
  if (!email || typeof email !== 'string') return '';
  return email.trim().toLowerCase();
}

export default normalizeEmail;
