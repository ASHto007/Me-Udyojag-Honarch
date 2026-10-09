import { apiClient, ApiError } from './apiClient';

export const PREVIEW_MESSAGE = 'Registration is not connected yet. Your details have not been sent.';

const WEB3FORMS_ACCESS_KEY = '9f429b26-8194-4934-a377-0cfc8c7f6c81';

/**
 * Submit general membership / business inquiry via Web3Forms with MongoDB backend persistence.
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
    // 1. Submit directly to Web3Forms over HTTPS (guarantees email delivery to admin)
    const formData = new FormData();
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', `[New Website Inquiry] ${payload.fullName} - ${payload.interest || 'General'}`);
    formData.append('from_name', 'Mi Udyojak Honarach Portal');
    formData.append('name', payload.fullName);
    formData.append('email', payload.email);
    formData.append('phone', payload.phone);
    formData.append('city', payload.city);
    formData.append('stage', payload.stage || 'Aspiring Entrepreneur');
    formData.append('interest', payload.interest || 'Mentorship & Guidance');
    formData.append('message', payload.message || 'No additional message provided');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    // 2. Also persist to MongoDB backend in background
    apiClient.post('/enquiries', payload).catch((err) => {
      console.warn('[Backend Sync Note]:', err?.message || err);
    });

    if (data.success) {
      return {
        success: true,
        isPreview: false,
        message: 'Your enquiry has been received successfully. Our team will contact you shortly.',
        data,
      };
    } else {
      throw new Error(data.message || 'Error submitting enquiry.');
    }
  } catch (error) {
    // Fallback to backend API if web3forms encounters network limits
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
