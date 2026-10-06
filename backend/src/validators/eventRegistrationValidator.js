import validator from 'validator';

/**
 * Validates event registration submission payload.
 * 
 * @param {Object} data
 * @returns {Record<string, string>} Map of validation error messages
 */
export function validateEventRegistrationInput(data = {}) {
  const errors = {};

  const eventId = typeof data.eventId === 'string' ? data.eventId.trim() : '';
  if (!eventId) {
    errors.eventId = 'Event ID is required.';
  }

  const eventTitle = typeof data.eventTitle === 'string' ? data.eventTitle.trim() : '';
  if (!eventTitle) {
    errors.eventTitle = 'Event Title is required.';
  }

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

  const cityDistrict = typeof data.cityDistrict === 'string' ? data.cityDistrict.trim() : '';
  if (!cityDistrict) {
    errors.cityDistrict = 'City / District is required.';
  } else if (cityDistrict.length < 2) {
    errors.cityDistrict = 'City / District must be at least 2 characters.';
  } else if (cityDistrict.length > 100) {
    errors.cityDistrict = 'City / District cannot exceed 100 characters.';
  }

  if (data.consent !== true && data.consent !== 'true') {
    errors.consent = 'You must consent to be contacted about this event.';
  }

  if (data.message && typeof data.message === 'string' && data.message.length > 2000) {
    errors.message = 'Message cannot exceed 2000 characters.';
  }

  return errors;
}

export default validateEventRegistrationInput;
