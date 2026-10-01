# Enquiry notifications

## Current configuration

Recipient: ashutoshto007@gmail.com (server parameter ENQUIRY_RECIPIENT).
Function: submitWebsiteEnquiry in asia-south1.
Both React forms call this function. It validates input and consent, then atomically stores enquiries/{id} and mail/{id}. Visitors see ?Your enquiry has been received? after the transaction commits. SMTP delivery happens later.

The sender, SMTP connection, App Check site key, cloud deployment and live delivery verification are still pending. The frontend cannot submit successfully until the function and App Check are configured.

## 1. Configure email delivery

In the Firebase console for mi-udyojak-honarach, install **Trigger Email from Firestore** (firebase/firestore-send-email).
- Email documents collection: mail
- SMTP connection: your provider's SMTP URI and authentication
- Default From: an address authorized by that SMTP provider
- Enter the SMTP password through the extension's secure secret configuration, never React or a VITE variable
- Choose the default Firestore database

The function sets the approved To address and optional visitor Reply-To. The extension supplies the default From. Do not give browsers access to mail.

Official setup: https://firebase.google.com/docs/xextensions/official/firestore-send-email

## 2. Configure App Check

Register the Firebase web app with the reCAPTCHA Enterprise provider and allow the website domains.
Copy .env.example to .env.local and set VITE_FIREBASE_APP_CHECK_SITE_KEY to the public site key.
App Check enforcement is enabled on the callable function. For localhost, use Firebase's registered App Check debug-token workflow; never disable production enforcement or commit a debug token.

https://firebase.google.com/docs/app-check/web/recaptcha-enterprise-provider

## 3. Deploy

Use an account with access to the project and a Firebase billing plan that supports the chosen functions and extension. The previously installed global Firebase CLI failed because a template file was missing; the commands below use a fresh CLI package.

From the repository root:
```powershell
npm.cmd ci --prefix functions
npx.cmd --yes firebase-tools@latest login
npx.cmd --yes firebase-tools@latest functions:secrets:set ENQUIRY_RATE_LIMIT_SECRET --project mi-udyojak-honarach
npx.cmd --yes firebase-tools@latest deploy --only functions:enquiries,firestore:rules --project mi-udyojak-honarach
npm.cmd run build
```

Supply a random secret of at least 32 bytes at the secret prompt. Keep it stable: it hashes rate-limit keys and request IDs.
functions/.env.mi-udyojak-honarach contains the approved recipient locally and is gitignored. On another machine create it from functions/.env.example with ENQUIRY_RECIPIENT set.
Review existing deployed rules before publishing; merge unrelated collection policies if the project also serves other applications.
Publish the updated frontend after the backend is ready. Existing contactEnquiries documents are preserved; new submissions use enquiries.
Legacy VITE_CONTACT_ENDPOINT and VITE_EVENT_ENDPOINT variables are no longer used by these forms.

## 4. Verify

Run npm.cmd test and npm.cmd test --prefix functions.
Submit one approved test enquiry through each form. Verify the receipt, enquiries record and matching mail record.
Confirm delivery.state reaches SUCCESS and check the recipient inbox. Confirm public clients cannot read or write enquiries, mail, submissionLimits or contactEnquiries.
Test missing App Check and excessive submissions are rejected. The limits are 5 per IP and 3 per phone in a rolling one-hour window, enforced in the same transaction.
Set a Firestore TTL policy for submissionLimits.expiresAt to clean up expired counters. Expired counters do not block requests even before TTL cleanup.

## 5. Monitor and retry failures

The extension owns mail/{id}.delivery (state, attempts, error and delivery information).
Filter mail by delivery.state == ERROR to find failed notifications. Check PENDING/PROCESSING jobs if the extension or SMTP connection is unavailable.
Correct SMTP/provider configuration before retrying. With administrator Application Default Credentials, run:
```powershell
cd functions
node scripts/retry-email.js <enquiry-id>
```
This changes ERROR to RETRY on the existing job; it cannot change recipients or resend successful jobs. Delivery failures never delete the enquiry. There is no automatic retry loop.
https://firebase.google.com/docs/extensions/official/firestore-send-email/delivery-status

## Data handling

No SMTP secrets or recipient controls are accepted from the browser. Emails use plain text, with validated Reply-To headers.
Rate keys contain HMAC hashes of IPs and normalized phones; raw IPs are not stored.
Request IDs remain in browser memory so retries reuse an enquiry while the form stays loaded. Reloading the page starts a new request; there is no cross-reload deduplication.
Unit tests cover validation, receipt behavior, duplicate prevention, rate limits and delivery failure retention with an in-memory transaction adapter. Cloud/emulator integration and real SMTP delivery must still be verified before launch.
