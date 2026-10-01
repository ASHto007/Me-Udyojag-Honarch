import { submitEnquiry } from './submissionService';
/**
 * Event Registration Service Interface
 * 
 * Provides an extensible API integration point for processing event join requests.
 * Explicitly distinguishes preview mode (no endpoint configured) from real server receipt,
 * avoiding simulation of false success and never storing personal information in localStorage.
 */

export interface EventRegistrationPayload {
  eventId: string;
  eventTitle: string;
  fullName: string;
  phone: string;
  email?: string;
  businessName?: string;
  cityDistrict: string;
  message?: string;
  consent: boolean;
}

export interface RegistrationResult {
  success: boolean;
  isPreview: boolean;
  message: string;
  errors?: Record<string, string>;
}

let lastEventPayload: EventRegistrationPayload | undefined;

export async function submitEventJoinRequest(
  payload: EventRegistrationPayload,
  endpointUrl?: string
): Promise<RegistrationResult> {
  // Validate required fields
  const errors: Record<string, string> = {};

  if (!payload.fullName || payload.fullName.trim().length < 2) {
    errors.fullName = 'Full Name is required.';
  }

  const digits = payload.phone.replace(/\D/g, "");
  if (!(digits.length === 10 || (digits.length === 12 && digits.startsWith("91")))) {
    errors.phone = "Please enter a valid 10-digit mobile number.";
  }

  if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!payload.cityDistrict || payload.cityDistrict.trim().length < 2) {
    errors.cityDistrict = 'City / District is required.';
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

  if (!lastEventPayload || JSON.stringify(lastEventPayload) !== JSON.stringify(payload)) lastEventPayload = payload;
  return submitEnquiry(lastEventPayload, endpointUrl);
}
