import { submitEventRegistrationToGoogleSheet } from './googleSheetService';

export const PREVIEW_MESSAGE = 'Registration is not connected yet. Your details have not been sent.';

export interface EventRegistrationPayload {
  eventId: string;
  eventTitle: string;
  fullName: string;
  phone: string;
  email: string;
  businessName: string;
  netWorth: string;
  cityDistrict: string;
  message: string;
  consent: boolean;
}

export interface RegistrationResult {
  success: boolean;
  isPreview: boolean;
  message: string;
  errors?: Record<string, string>;
  data?: unknown;
}

/**
 * Submit event registration / conclave inquiry to the backend REST API.
 */
export async function registerForEvent(
  payload: EventRegistrationPayload
): Promise<RegistrationResult> {
  // Validate required fields
  if (!payload.eventId?.trim() || !payload.eventTitle?.trim()) {
    return {
      success: false,
      isPreview: false,
      message: 'Please select an event before sending an enquiry.',
    };
  }
  const errors: Record<string, string> = {};

  if (!payload.fullName || payload.fullName.trim().length < 2) {
    errors.fullName = 'Full Name is required.';
  }

  const digits = payload.phone?.replace(/\D/g, '') || '';
  if (!(digits.length === 10 || (digits.length === 12 && digits.startsWith('91')))) {
    errors.phone = 'Please enter a valid 10-digit mobile number.';
  }

  if (!payload.email?.trim()) {
    errors.email = 'Email Address is required.';
  } else if (payload.email.trim().length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(payload.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!payload.businessName || payload.businessName.trim().length < 2) {
    errors.businessName = 'Business or organization name is required.';
  }

  if (!payload.netWorth || !payload.netWorth.trim()) {
    errors.netWorth = 'Business turnover / net worth is required.';
  }

  if (!payload.cityDistrict || payload.cityDistrict.trim().length < 2) {
    errors.cityDistrict = 'City / District is required.';
  }

  if (!payload.message || payload.message.trim().length < 10) {
    errors.message = 'Please share details about your business and why you want to join (at least 10 characters).';
  }

  if (!payload.consent) {
    errors.consent = 'You must consent to be contacted about this event.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      isPreview: false,
      message: 'Please complete all required fields correctly.',
      errors,
    };
  }

  try {
    const sheetResult = await submitEventRegistrationToGoogleSheet(payload);

    if (sheetResult.success) {
      return {
        success: true,
        isPreview: false,
        message:
          sheetResult.message ||
          `Registration request submitted for ${payload.eventTitle.trim()}. Your request has been sent for admin review.`,
        data: sheetResult.data,
      };
    }

    return {
      success: false,
      isPreview: false,
      message: sheetResult.message || 'Failed to submit registration. Please try again.',
    };
  } catch (error: any) {
    return {
      success: false,
      isPreview: false,
      message: error?.message || 'Failed to complete registration. Please check your connection and try again.',
    };
  }
}

/**
 * Backwards-compatible alias for existing modal components
 */
export async function submitEventJoinRequest(
  payload: EventRegistrationPayload,
  _endpointUrl?: string
): Promise<RegistrationResult> {
  return registerForEvent(payload);
}

export default { registerForEvent, submitEventJoinRequest };
