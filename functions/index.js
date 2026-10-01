import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { defineString, defineSecret } from 'firebase-functions/params';
import { receiveEnquiry, SubmissionError } from './enquiry.js';

initializeApp();
const recipient = defineString('ENQUIRY_RECIPIENT', { description: 'Approved inbox for website enquiries' });
const rateSecret = defineSecret('ENQUIRY_RATE_LIMIT_SECRET');

export const submitWebsiteEnquiry = onCall({
  region: 'asia-south1', enforceAppCheck: true,
  secrets: [rateSecret], maxInstances: 10, timeoutSeconds: 30,
}, async request => {
  try {
    return await receiveEnquiry({
      db: getFirestore(), input: request.data, ip: request.rawRequest.ip,
      recipient: recipient.value(), rateSecret: rateSecret.value(),
    });
  } catch (error) {
    if (error instanceof SubmissionError) throw new HttpsError(error.code, error.message);
    // Do not log the payload, SMTP details, or contact information.
    console.error('Enquiry storage failed', { code: error?.code || 'unknown' });
    throw new HttpsError('unavailable', 'We could not confirm receipt. Please try again.');
  }
});
