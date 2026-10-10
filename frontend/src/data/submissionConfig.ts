// Centralized form endpoints and Formspree configuration
export const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID || 'xzedgebd';
export const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

// Optional backend REST endpoints (for dual sync or fallback)
export const CONTACT_ENDPOINT = '/enquiries';
export const EVENT_ENDPOINT = '/event-registrations';
