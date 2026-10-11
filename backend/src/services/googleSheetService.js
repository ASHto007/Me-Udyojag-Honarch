/**
 * Backend Google Sheets Service
 * 
 * Synchronizes enquiries and event registrations securely to Google Sheets via Google Apps Script Webhook.
 * Secrets and Webhook URLs are retrieved strictly from server-side environment variables and never exposed to the client.
 */

import { config } from '../config/env.js';

function getWebhookUrl() {
  return config.googleSheet?.webhookUrl || process.env.GOOGLE_SHEET_WEBHOOK_URL || '';
}

function getWebhookSecret() {
  return config.googleSheet?.secret || process.env.GOOGLE_SHEET_SECRET || process.env.GOOGLE_SHEET_KEY || '';
}

/**
 * Dispatch payload to Google Sheets webhook via Node fetch.
 * 
 * @param {Record<string, any>} payload
 * @param {string} [webhookUrl]
 */
export async function appendToGoogleSheet(payload, webhookUrl = getWebhookUrl()) {
  const secret = getWebhookSecret();

  if (!webhookUrl || !webhookUrl.startsWith('http')) {
    console.warn('[Backend GoogleSheetService]: GOOGLE_SHEET_WEBHOOK_URL is not configured in backend/.env.');
    return { success: false, message: 'Google Sheet webhook URL not configured' };
  }

  if (!payload.secret && secret) {
    payload.secret = secret;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }

    if (data && data.success === false) {
      console.warn('[Backend GoogleSheetService]: Sheet rejection:', data.message);
      return { success: false, message: data.message, data };
    }

    console.log('[Backend GoogleSheetService]: Success =>', data?.message || 'Row added');
    return { success: true, message: data?.message || 'Synced to Google Sheet', data };
  } catch (error) {
    console.error('[Backend GoogleSheetService Error]:', error?.message || error);
    return { success: false, message: error?.message || 'Failed to sync to Google Sheet' };
  }
}

/**
 * Dispatch enquiry to Google Sheet.
 * @param {Object} enquiry
 */
export async function syncEnquiryToGoogleSheet(enquiry) {
  const payload = {
    secret: enquiry.secret || getWebhookSecret(),
    type: 'enquiry',
    fullName: enquiry.fullName || '',
    email: enquiry.email || '',
    phone: enquiry.phone || '',
    city: enquiry.city || '',
    stage: enquiry.stage || 'Aspiring Entrepreneur (Idea Stage)',
    interest: enquiry.interest || 'Mentorship & Guidance (Service 03)',
    message: enquiry.message || '',
    source: enquiry.source || 'Website',
    status: enquiry.status || 'new',
    mongoId: enquiry._id ? enquiry._id.toString() : (enquiry.mongoId || ''),
  };

  return appendToGoogleSheet(payload);
}

/**
 * Dispatch event registration to Google Sheet.
 * @param {Object} registration
 */
export async function syncEventRegistrationToGoogleSheet(registration) {
  const payload = {
    secret: registration.secret || getWebhookSecret(),
    type: 'event_registration',
    eventId: registration.eventId || '',
    eventTitle: registration.eventTitle || '',
    fullName: registration.fullName || '',
    email: registration.email || '',
    phone: registration.phone || '',
    businessName: registration.businessName || '',
    netWorth: registration.netWorth || '',
    cityDistrict: registration.cityDistrict || '',
    message: registration.message || '',
    status: registration.status || 'pending',
    mongoId: registration._id ? registration._id.toString() : (registration.mongoId || ''),
  };

  return appendToGoogleSheet(payload);
}

export default {
  appendToGoogleSheet,
  syncEnquiryToGoogleSheet,
  syncEventRegistrationToGoogleSheet,
};
