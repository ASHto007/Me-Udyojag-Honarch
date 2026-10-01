import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { receiveEnquiry, validateSubmission } from '../enquiry.js';

const payload = overrides => ({ requestId: randomUUID(), kind: 'contact', fullName: 'Test Person',
  phone: '9876543210', email: 'visitor@example.com', city: 'Pune', consent: true, message: 'Hello', ...overrides });
function fixture() {
  const records = new Map();
  const normalize = data => Object.fromEntries(Object.entries(data).map(([k,v]) => [k, v instanceof Date ? { toMillis: () => v.getTime() } : v]));
  const db = {
    collection: collection => ({ doc: id => ({ path: collection + '/' + id }) }),
    runTransaction: async callback => {
      const writes = [];
      const value = await callback({
        get: async ref => ({ exists: records.has(ref.path), data: () => records.get(ref.path) }),
        set: (ref,data) => writes.push([ref.path,normalize(data)]),
        create: (ref,data) => {
          if (records.has(ref.path)) throw new Error('Already exists');
          writes.push([ref.path,normalize(data)]);
        },
      });
      writes.forEach(([key,value]) => records.set(key,value));
      return value;
    },
  };
  const submit = (input, options = {}) => receiveEnquiry({ db, input, ip: '192.0.2.1',
    recipient: 'approved@example.com', rateSecret: 'test-only-secret',
    now: new Date('2026-10-01T12:00:00Z'), ...options });
  return { records, submit };
}
test('validates fields, consent and disallows client email recipients', () => {
  for (const change of [{ consent: false }, { email: '' }, { email: '   ' }, { email: undefined }, { to: 'attacker@example.com' }, { fullName: '' },
    { phone: '123' }, { email: 'visitor@example.com\r\nBcc: attacker@example.com' },
    { message: 'a'.repeat(5001) }, { kind: 'event', eventId: '', eventTitle: '' }])
    assert.throws(() => validateSubmission(payload(change)), { code: 'invalid-argument' });
});
test('stores enquiry and fixed-recipient notification, including visitor reply-to', async () => {
  const { submit,records } = fixture();
  const result = await submit(payload({ email: 'visitor@example.com', businessName: 'Test business' }));
  assert.equal(result.received,true);
  assert.equal(result.message,'We received your enquiry.');
  const mail = records.get('mail/' + result.enquiryId);
  assert.deepEqual(mail.to,['approved@example.com']);
  assert.equal(mail.message.subject,'New Website Enquiry');
  assert.equal(mail.replyTo,'visitor@example.com');
  assert.match(mail.message.text,/Business Name: Test business/);
  assert.match(mail.message.text,/Enquiry ID:/);
  assert.equal(records.get('enquiries/' + result.enquiryId).phone,'+919876543210');
});
test('event submissions include event context', async () => {
  const { submit,records } = fixture();
  const result = await submit(payload({ kind: 'event', cityDistrict: 'Mumbai', eventId: 'event-1', eventTitle: 'Test event' }));
  const mail = records.get('mail/' + result.enquiryId);
  assert.equal(result.message,'We received your interest in Test event.');
  assert.equal(mail.message.subject,'New Event Enquiry \u2014 Test event');
  assert.match(mail.message.text,/Event ID: event-1/);
  assert.match(mail.message.text,/Event Name: Test event/);
  assert.equal(records.get('enquiries/' + result.enquiryId).kind,'event');
  await assert.rejects(submit(payload({ kind: 'event', cityDistrict: 'Mumbai', eventId: 'event-1', eventTitle: 'Test event', email: '' })),{ code: 'invalid-argument' });
});
test('retry returns the same receipt and cannot overwrite a different payload', async () => {
  const { submit,records } = fixture(), input = payload();
  const first = await submit(input);
  const count = records.size;
  assert.deepEqual(await submit(input),first);
  assert.equal(records.size,count);
  await assert.rejects(submit({ ...input,message: 'Changed' }),{ code: 'invalid-argument' });
});
test('limits submissions by phone, then permits them after the rolling window', async () => {
  const { submit } = fixture();
  for (let i=0;i<3;i++) await submit(payload());
  await assert.rejects(submit(payload()),{ code: 'resource-exhausted' });
  await submit(payload(), { now: new Date('2026-10-01T13:00:01Z') });
});
test('limits IP submissions across different phones', async () => {
  const { submit } = fixture();
  for (let i=0;i<5;i++) await submit(payload({ phone: '987654321' + i }));
  await assert.rejects(submit(payload({ phone: '9876543219' })),{ code: 'resource-exhausted' });
});
test('delivery failures preserve stored enquiry and retries do not create another job', async () => {
  const { submit,records } = fixture(), input = payload();
  const result = await submit(input);
  records.get('mail/' + result.enquiryId).delivery = { state: 'ERROR', attempts: 1 };
  assert.deepEqual(await submit(input),result);
  assert.equal(records.has('enquiries/' + result.enquiryId),true);
  assert.equal(records.get('mail/' + result.enquiryId).delivery.state,'ERROR');
});
test('storage failure never returns a successful receipt', async () => {
  const { submit } = fixture();
  await assert.rejects(submit(payload(), { db: {
    collection: name => ({doc: id => ({path:name+'/'+id})}),
    runTransaction: async () => { throw new Error('Storage offline'); },
  }}), /Storage offline/);
});
