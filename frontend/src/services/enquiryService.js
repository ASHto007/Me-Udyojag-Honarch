import { submitEnquiryToGoogleSheet } from './googleSheetService';

export const PREVIEW_MESSAGE = 'Registration is not connected yet. Your details have not been sent.';

/**
 * Submit general membership / business inquiry directly via Google Sheets Webhook.
 * Pure frontend webhook with zero backend interaction.
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
    const sheetResult = await submitEnquiryToGoogleSheet(payload);

    if (sheetResult.success) {
      return {
        success: true,
        isPreview: false,
        message: 'Your enquiry has been received successfully. Our team will contact you shortly.',
        data: sheetResult.data,
      };
    }

    return {
      success: false,
      isPreview: false,
      message: sheetResult.message || 'Failed to submit inquiry. Please try again.',
    };
  } catch (error) {
    return {
      success: false,
      isPreview: false,
      message: error?.message || 'Failed to submit inquiry. Please check your connection and try again.',
    };
  }
}

export default { submitEnquiry };
