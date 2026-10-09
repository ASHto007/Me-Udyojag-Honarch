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

  const businessName = typeof data.businessName === 'string' ? data.businessName.trim() : '';
  if (!businessName) {
    errors.businessName = 'Business or organization name is required.';
  } else if (businessName.length < 2) {
    errors.businessName = 'Business name must be at least 2 characters.';
  } else if (businessName.length > 150) {
    errors.businessName = 'Business name cannot exceed 150 characters.';
  }

  const netWorth = typeof data.netWorth === 'string' ? data.netWorth.trim() : '';
  if (!netWorth) {
    errors.netWorth = 'Business turnover or net worth is required.';
  } else if (netWorth.length > 100) {
    errors.netWorth = 'Net worth / turnover cannot exceed 100 characters.';
  }

  const cityDistrict = typeof data.cityDistrict === 'string' ? data.cityDistrict.trim() : '';
  if (!cityDistrict) {
    errors.cityDistrict = 'City / District is required.';
  } else if (cityDistrict.length < 2) {
    errors.cityDistrict = 'City / District must be at least 2 characters.';
  } else if (cityDistrict.length > 100) {
    errors.cityDistrict = 'City / District cannot exceed 100 characters.';
  }

  const message = typeof data.message === 'string' ? data.message.trim() : '';
  if (!message) {
    errors.message = 'Please describe your business and reason for joining.';
  } else if (message.length < 10) {
    errors.message = 'Please provide at least 10 characters explaining your business and objectives.';
  } else if (message.length > 2000) {
    errors.message = 'Message cannot exceed 2000 characters.';
  }

  if (data.consent !== true && data.consent !== 'true') {
    errors.consent = 'You must consent to be contacted about this event.';
  }

  return errors;
}

export default validateEventRegistrationInput;
