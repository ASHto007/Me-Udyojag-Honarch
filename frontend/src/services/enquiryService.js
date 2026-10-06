import { apiClient, ApiError } from './apiClient';

export const PREVIEW_MESSAGE = 'Registration is not connected yet. Your details have not been sent.';

/**
 * Submit general membership / business inquiry to the backend REST API.
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
    const response = await apiClient.post('/enquiries', payload);
    return {
      success: true,
      isPreview: false,
      message: response.message || 'Your enquiry has been received successfully.',
      data: response.data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        isPreview: false,
        message: error.message,
        errors: error.data?.errors,
      };
    }
    return {
      success: false,
      isPreview: false,
      message: 'Failed to submit inquiry. Please try again.',
    };
  }
}

export default { submitEnquiry };
