const requestIds = new WeakMap<object, string>();

export const PREVIEW_MESSAGE = 'Registration is not connected yet. Your details have not been sent.';

export interface SubmissionResult {
  success: boolean;
  isPreview: boolean;
  message: string;
}

/** Only an explicit server acknowledgement means the enquiry was received. */
export async function submitEnquiry(payload: object, endpoint?: string): Promise<SubmissionResult> {
  if (!endpoint) return { success: false, isPreview: true, message: PREVIEW_MESSAGE };
  try {
    if (endpoint === 'firebase:contact' || endpoint === 'firebase:event') {
      const { sendWebsiteEnquiry } = await import('./firebase');
      let requestId = requestIds.get(payload);
      if (!requestId) {
        requestId = crypto.randomUUID();
        requestIds.set(payload, requestId);
      }
      const receipt = await sendWebsiteEnquiry(payload, endpoint === 'firebase:event' ? 'event' : 'contact', requestId);
      return { success: true, isPreview: false, message: receipt.message };
    }
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error('Request failed');
    const receipt = await response.json();
    if (receipt?.received !== true) throw new Error('Receipt not confirmed');
    return { success: true, isPreview: false, message: 'Your enquiry has been received.' };
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'functions/resource-exhausted') {
      return { success: false, isPreview: false, message: 'Too many enquiries. Please try again in an hour.' };
    }
    return { success: false, isPreview: false, message: 'We could not confirm receipt of your enquiry. Your entries are still here; please try again.' };
  }
}
