import { createHash, createHmac } from 'node:crypto';

export class SubmissionError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}
const invalid = message => { throw new SubmissionError('invalid-argument', message); };
export const isEmail = value => typeof value === 'string' && value.length <= 254 && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);

export function validateSubmission(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) invalid('Invalid enquiry.');
  const allowed = ['requestId', 'kind', 'fullName', 'phone', 'email', 'city', 'cityDistrict', 'businessName', 'stage', 'interest', 'eventId', 'eventTitle', 'message', 'consent'];
  if (Object.keys(input).some(key => !allowed.includes(key))) invalid('Unexpected enquiry fields.');
  if (typeof input.requestId !== 'string' || !/^[a-f0-9-]{36}$/i.test(input.requestId)) invalid('Invalid request ID.');
  if (!['contact', 'event'].includes(input.kind)) invalid('Invalid enquiry type.');
  if (input.consent !== true) invalid('Consent is required.');
  const field = (key, min = 0, max = 200, multiline = false) => {
    const value = input[key] ?? '';
    if (typeof value !== 'string') invalid('Invalid ' + key + '.');
    const result = value.trim();
    if (result.length < min || result.length > max || (!multiline && (/[\r\n]/.test(result) || result.includes(String.fromCharCode(0))))) invalid('Invalid ' + key + '.');
    return result;
  };
  const digits = field('phone', 10, 30).replace(/\D/g, '');
  if (!/^(?:91)?\d{10}$/.test(digits)) invalid('Please enter a valid mobile number.');
  const email = field('email', input.kind === 'contact' ? 1 : 0, 254);
  if (email && !isEmail(email)) invalid('Please enter a valid email address.');
  return {
    requestId: input.requestId, kind: input.kind, fullName: field('fullName', 2),
    phone: '+91' + digits.slice(-10), email, city: field(input.kind === 'event' ? 'cityDistrict' : 'city', 2),
    businessName: field('businessName'), stage: field('stage'), interest: field('interest'),
    eventId: field('eventId', input.kind === 'event' ? 1 : 0),
    eventTitle: field('eventTitle', input.kind === 'event' ? 1 : 0),
    message: field('message', 0, 5000, true), consent: true,
  };
}

export function notification(enquiry, id, recipient, submittedAt) {
  if (!isEmail(recipient)) throw new SubmissionError('failed-precondition', 'Enquiry notifications are not configured.');
  const lines = [
    ['Name', enquiry.fullName], ['Mobile', enquiry.phone], ['Email', enquiry.email],
    ['City / District', enquiry.city], ['Business Name', enquiry.businessName],
    ['Area of Interest', enquiry.interest], ['Business Stage', enquiry.stage],
    ['Event Name', enquiry.eventTitle], ['Message', enquiry.message],
    ['Submitted At', submittedAt.toISOString()], ['Enquiry ID', id],
  ];
  return {
    to: [recipient], ...(enquiry.email ? { replyTo: enquiry.email } : {}),
    message: { subject: 'New Website Enquiry ? Mi Udyojak Honarach',
      text: lines.map(([label, value]) => label + ': ' + (value || 'Not supplied')).join('\n') },
  };
}

// One transaction protects the limits, deduplicates retries, and creates durable email work.
export async function receiveEnquiry({ db, input, ip, recipient, rateSecret, now = new Date() }) {
  const enquiry = validateSubmission(input);
  if (!ip || !rateSecret) throw new SubmissionError('failed-precondition', 'Enquiry submission is not configured.');
  const hash = value => createHmac('sha256', rateSecret).update(value).digest('hex');
  const fingerprint = createHash('sha256').update(JSON.stringify(enquiry)).digest('hex');
  const id = hash('request:' + enquiry.requestId);
  const ref = db.collection('enquiries').doc(id);
  const mail = db.collection('mail').doc(id);
  const job = notification(enquiry, id, recipient, now);
  const limits = [
    { ref: db.collection('submissionLimits').doc(hash('ip:' + ip)), maximum: 5 },
    { ref: db.collection('submissionLimits').doc(hash('phone:' + enquiry.phone)), maximum: 3 },
  ];
  await db.runTransaction(async tx => {
    const existing = await tx.get(ref);
    if (existing.exists) {
      if (existing.data().fingerprint !== fingerprint) invalid('Request ID already used for another enquiry.');
      return;
    }
    const snapshots = await Promise.all(limits.map(limit => tx.get(limit.ref)));
    const counters = snapshots.map(snapshot => {
      const data = snapshot.data();
      return data && data.expiresAt.toMillis() > now.getTime() ? data.count : 0;
    });
    if (limits.some((limit, index) => counters[index] >= limit.maximum))
      throw new SubmissionError('resource-exhausted', 'Too many enquiries. Please try again in an hour.');
    limits.forEach((limit, index) => {
      const previous = snapshots[index].data();
      tx.set(limit.ref, { count: counters[index] + 1,
        expiresAt: counters[index] ? previous.expiresAt : new Date(now.getTime() + 3600000) });
    });
    const { requestId: _requestId, ...saved } = enquiry;
    tx.create(ref, { ...saved, fingerprint, createdAt: now, notificationId: id });
    tx.create(mail, { ...job, enquiryId: id, createdAt: now });
  });
  return { received: true, enquiryId: id };
}
