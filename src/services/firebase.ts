import { getApp, getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAssq2n_VwumLJzHWBhYP3HENZXQTMwtI8',
  authDomain: 'mi-udyojak-honarach.firebaseapp.com',
  projectId: 'mi-udyojak-honarach',
  storageBucket: 'mi-udyojak-honarach.firebasestorage.app',
  messagingSenderId: '732496401276',
  appId: '1:732496401276:web:cb482e827d2f71e4fb4af9',
  measurementId: 'G-P8SH0N5XLC',
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);


export async function initializeFirebaseAnalytics(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    const { getAnalytics, isSupported } = await import('firebase/analytics');
    if (await isSupported()) getAnalytics(firebaseApp);
  } catch {
    // Browser restrictions on Analytics must not prevent the page from loading.
  }
}

let appCheckReady: Promise<void> | undefined;
async function initializeSubmissionProtection(): Promise<void> {
  const siteKey = import.meta.env.VITE_FIREBASE_APP_CHECK_SITE_KEY?.trim();
  if (!siteKey) throw new Error('Submission protection is not configured.');
  appCheckReady ??= import('firebase/app-check').then(({ initializeAppCheck, ReCaptchaEnterpriseProvider }) => {
    initializeAppCheck(firebaseApp, { provider: new ReCaptchaEnterpriseProvider(siteKey), isTokenAutoRefreshEnabled: true });
  }).catch(error => { appCheckReady = undefined; throw error; });
  await appCheckReady;
}

export async function sendWebsiteEnquiry(payload: object, kind: 'contact' | 'event', requestId: string) {
  await initializeSubmissionProtection();
  const { getFunctions, httpsCallable } = await import('firebase/functions');
  const functions = getFunctions(firebaseApp, import.meta.env.VITE_FIREBASE_FUNCTIONS_REGION || 'asia-south1');
  const submit = httpsCallable<object, { received: boolean; enquiryId: string }>(functions, 'submitWebsiteEnquiry');
  const { data } = await submit({ ...payload, kind, requestId });
  if (data?.received !== true || !data.enquiryId) throw new Error('Receipt not confirmed.');
  return data;
}
