import { apiClient, ApiError } from './apiClient';

export const PREVIEW_MESSAGE = 'Registration is not connected yet. Your details have not been sent.';

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID || 'xzedgebd';
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

/**
 * Submit general membership / business inquiry via Formspree with optional backend persistence.
 * 
 * @param {Object} payload
 * @param {string} payload.fullName
 * @param {string} payload.phone
 * @param {string} payload.email
 * @param {string} payload.city
 * @param {string} [payload.stage]
 * @param {string} [payload.interest]
 * @param {string} [payload.message]
 * @param {boolean} payload.consent
 * @returns {Promise<{ success: boolean, isPreview: boolean, message: string, data?: any, errors?: any }>}
 */
export async function submitEnquiry(payload) {
  try {
    // 1. Submit directly to Formspree endpoint over HTTPS
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _subject: `[New Website Inquiry] ${payload.fullName} - ${payload.interest || 'General'}`,
        name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        city: payload.city,
        stage: payload.stage || 'Aspiring Entrepreneur',
        interest: payload.interest || 'Mentorship & Guidance',
        message: payload.message || 'No additional message provided',
      }),
    });

    const data = await response.json();

    // 2. Also attempt background persistence to MongoDB backend if configured
    apiClient.post('/enquiries', payload).catch((err) => {
      console.warn('[Backend Sync Note]:', err?.message || err);
    });

    if (response.ok) {
      return {
        success: true,
        isPreview: false,
        message: 'Your enquiry has been received successfully. Our team will contact you shortly.',
        data,
      };
    } else {
      throw new Error(data?.error || data?.errors?.[0]?.message || 'Error submitting enquiry.');
    }
  } catch (error) {
    // Fallback to backend API if Formspree encounters network issues
    try {
      const fallbackResponse = await apiClient.post('/enquiries', payload);
      return {
        success: true,
        isPreview: false,
        message: fallbackResponse.message || 'Your enquiry has been received successfully.',
        data: fallbackResponse.data,
      };
    } catch (fallbackErr) {
      if (fallbackErr instanceof ApiError) {
        return {
          success: false,
          isPreview: false,
          message: fallbackErr.message,
          errors: fallbackErr.data?.errors,
        };
      }
      return {
        success: false,
        isPreview: false,
        message: error.message || 'Failed to submit inquiry. Please try again.',
      };
    }
  }
}

export default { submitEnquiry };
