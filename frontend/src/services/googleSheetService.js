/**
 * Google Sheets Service
 * 
 * Synchronizes website contact inquiries and event registrations directly
 * to Google Sheets via Google Apps Script Web App Webhook.
 * 
 * Supports secure WEBHOOK_SECRET verification matching the Apps Script deployment.
 */

export const DEFAULT_GOOGLE_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbwFA2Yi86N8JoR-RKRj8jsew8Y5_zdPkRiIoNcpwTczeOeB34Lzm4vS0PuhgtyKEXNQnA/exec';

export const DEFAULT_GOOGLE_SHEET_SECRET =
  '01729666eb1d32b654fcd13384eb800d682df6553f7dab6520bbd5601dc55cc1';

export function getWebhookUrl() {
  const envUrl =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_SHEET_WEBHOOK_URL) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.GOOGLE_SHEET_WEBHOOK_URL);

  if (typeof envUrl === 'string' && envUrl.trim().startsWith('http')) {
    return envUrl.trim();
  }
  return DEFAULT_GOOGLE_SHEET_URL;
}

export function getWebhookSecret() {
  const envSecret =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_SHEET_SECRET) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.GOOGLE_SHEET_SECRET) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.GOOGLE_SHEET_KEY);

  if (typeof envSecret === 'string' && envSecret.trim()) {
    return envSecret.trim();
  }
  return DEFAULT_GOOGLE_SHEET_SECRET;
}

/**
 * Low-level transport helper to dispatch JSON payloads to Google Apps Script.
 * 
 * @param {Record<string, any>} payload
 * @param {string} [webhookUrl]
 * @returns {Promise<{ success: boolean, message: string, data?: any }>}
 */
export async function appendToGoogleSheet(payload, webhookUrl = getWebhookUrl()) {
  if (!webhookUrl || !webhookUrl.startsWith('http')) {
    const errorMsg = 'Google Sheet webhook URL is not configured or invalid.';
    console.warn(`[GoogleSheetService]: ${errorMsg}`);
    return { success: false, message: errorMsg };
  }

  // Ensure secret is always attached if missing
  if (!payload.secret) {
    payload.secret = getWebhookSecret();
  }

  const jsonBody = JSON.stringify(payload);
  const controller = new AbortController();
  const timeoutMs = 15000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: jsonBody,
      redirect: 'follow',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }

    if (data && data.success === false) {
      console.warn('[GoogleSheetService]: Sheet returned rejection:', data.message);
      return { success: false, message: data.message || 'Sheet rejection', data };
    }

    console.log('[GoogleSheetService]: Successfully saved to Google Sheet:', data?.message || 'Success');
    return { success: true, message: data?.message || 'Data saved to Google Sheet', data };
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      console.warn('[GoogleSheetService]: Request timed out after 15s');
      return { success: false, message: 'Google Sheet request timed out' };
    }

    // Attempt no-cors fallback if browser cross-origin policy blocked the 302 redirect
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: jsonBody,
      });

      console.log('[GoogleSheetService]: Dispatched to Google Sheet via no-cors fallback');
      return { success: true, message: 'Dispatched to Google Sheet' };
    } catch (fallbackError) {
      console.error('[GoogleSheetService]: Failed to dispatch:', fallbackError);
      return { success: false, message: fallbackError?.message || 'Failed to dispatch to Google Sheet' };
    }
  }
}

/**
 * Submit general contact inquiry to Google Sheets.
 * Matches exact Apps Script `data.type === "enquiry"` schema.
 * 
 * @param {Object} data
 * @param {string} [data.secret]
 * @param {string} data.fullName
 * @param {string} data.email
 * @param {string} data.phone
 * @param {string} data.city
 * @param {string} [data.stage]
 * @param {string} [data.interest]
 * @param {string} [data.message]
 * @param {string} [data.source]
 * @param {string} [data.status]
 * @param {string} [data.mongoId]
 * @param {string} [customWebhookUrl]
 */
export async function submitEnquiryToGoogleSheet(data, customWebhookUrl) {
  const payload = {
    secret: data.secret || getWebhookSecret(),
    type: 'enquiry',
    fullName: data.fullName || data.name || '',
    email: (data.email || '').trim().toLowerCase(),
    phone: data.phone || data.mobile || '',
    city: data.city || data.district || '',
    stage: data.stage || 'Aspiring Entrepreneur (Idea Stage)',
    interest: data.interest || 'Mentorship & Guidance (Service 03)',
    message: data.message || '',
    source: data.source || 'Website',
    status: data.status || 'new',
    mongoId: data.mongoId || data._id || data.id || '',
  };

  return appendToGoogleSheet(payload, customWebhookUrl);
}

/**
 * Submit event registration to Google Sheets.
 * Matches exact Apps Script `data.type === "event_registration"` schema.
 * 
 * @param {Object} data
 * @param {string} [data.secret]
 * @param {string} data.eventId
 * @param {string} data.eventTitle
 * @param {string} data.fullName
 * @param {string} data.email
 * @param {string} data.phone
 * @param {string} [data.businessName]
 * @param {string} [data.netWorth]
 * @param {string} data.cityDistrict
 * @param {string} [data.message]
 * @param {string} [data.status]
 * @param {string} [data.mongoId]
 * @param {string} [customWebhookUrl]
 */
export async function submitEventRegistrationToGoogleSheet(data, customWebhookUrl) {
  const payload = {
    secret: data.secret || getWebhookSecret(),
    type: 'event_registration',
    eventId: data.eventId || '',
    eventTitle: data.eventTitle || '',
    fullName: data.fullName || data.name || '',
    email: (data.email || '').trim().toLowerCase(),
    phone: data.phone || data.mobile || '',
    businessName: data.businessName || '',
    netWorth: data.netWorth || '',
    cityDistrict: data.cityDistrict || data.city || '',
    message: data.message || '',
    status: data.status || 'pending',
    mongoId: data.mongoId || data._id || data.id || '',
  };

  return appendToGoogleSheet(payload, customWebhookUrl);
}

// Aliases
export const sendEnquiryToGoogleSheet = submitEnquiryToGoogleSheet;
export const sendEventRegistrationToGoogleSheet = submitEventRegistrationToGoogleSheet;
export const sendToGoogleSheet = appendToGoogleSheet;

export default {
  appendToGoogleSheet,
  submitEnquiryToGoogleSheet,
  sendEnquiryToGoogleSheet,
  submitEventRegistrationToGoogleSheet,
  sendEventRegistrationToGoogleSheet,
  sendToGoogleSheet,
  getWebhookUrl,
  getWebhookSecret,
  DEFAULT_GOOGLE_SHEET_URL,
  DEFAULT_GOOGLE_SHEET_SECRET,
};
