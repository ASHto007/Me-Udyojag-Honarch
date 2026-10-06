import validator from 'validator';

/**
 * Validates enquiry submission payload.
 * 
 * @param {Object} data
 * @returns {Record<string, string>} Map of validation error messages
 */
export function validateEnquiryInput(data = {}) {
  const errors = {};

  const fullName = typeof data.fullName === 'string' ? data.fullName.trim() : '';
  if (!fullName) {
    errors.fullName = 'Full Name is required.';
  } else if (fullName.length < 2) {
    errors.fullName = 'Full Name must be at least 2 characters.';
  } else if (fullName.length > 100) {
    errors.fullName = 'Full Name cannot exceed 100 characters.';
  }

  const email = typeof data.email === 'string' ? data.email.trim() : '';
  if (!email) {
    errors.email = 'Email Address is required.';
  } else if (!validator.isEmail(email) || email.length > 254) {
    errors.email = 'Please provide a valid email address.';
  }

  const phone = typeof data.phone === 'string' ? data.phone.trim() : '';
  const digits = phone.replace(/\D/g, '');
  const isValidPhone =
    digits.length === 10 ||
    (digits.length === 12 && digits.startsWith('91')) ||
    (digits.length === 11 && digits.startsWith('0'));

  if (!phone) {
    errors.phone = 'Mobile Number is required.';
  } else if (!isValidPhone) {
    errors.phone = 'Please provide a valid 10-digit mobile number.';
  }

  const city = typeof data.city === 'string' ? data.city.trim() : '';
  if (!city) {
    errors.city = 'City or District is required.';
  } else if (city.length < 2) {
    errors.city = 'City or District must be at least 2 characters.';
  } else if (city.length > 100) {
    errors.city = 'City cannot exceed 100 characters.';
  }

  if (data.consent !== true && data.consent !== 'true') {
    errors.consent = 'You must consent to being contacted regarding your inquiry.';
  }

  if (data.message && typeof data.message === 'string' && data.message.length > 2000) {
    errors.message = 'Message cannot exceed 2000 characters.';
  }

  return errors;
}

export default validateEnquiryInput;
