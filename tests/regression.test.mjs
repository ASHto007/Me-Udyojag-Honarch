import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { openManagedDialog } from '../src/components/ui/dialogLifecycle.ts';
import { submitEnquiry, PREVIEW_MESSAGE } from '../src/services/submissionService.ts';
import { submitEventJoinRequest } from '../src/services/eventRegistrationService.ts';
import { GALLERY_ITEMS, hasEventPhotos } from '../src/data/galleryData.ts';

const dom = new JSDOM('<!doctype html><html><body><div id="root"><button id="trigger">Open</button><nav><a href="#gallery">Gallery</a></nav><a id="logo" href="#top">Logo</a></div></body></html>', { url: 'http://localhost/' });
for (const name of ['window', 'document', 'HTMLElement', 'HTMLDialogElement', 'KeyboardEvent', 'Event', 'Node', 'SVGElement']) globalThis[name] = dom.window[name];
globalThis.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} });
// jsdom has no rendering or top layer: these shims test our coordinator only.
HTMLElement.prototype.getClientRects = function () { return this.hidden ? [] : [{ width: 50, height: 30 }]; };
HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };

function fixture() {
  const trigger = document.getElementById('trigger');
  trigger.focus();
  const dialog = document.createElement('dialog');
  dialog.tabIndex = -1;
  dialog.innerHTML = '<button id="close">Close</button><input disabled /><input id="field" /><button id="last">Send</button>';
  document.body.append(dialog);
  return { trigger, dialog };
}
const tab = shiftKey => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true }));

test('modal isolates the entire app, traps both tab directions, redirects escaped focus and restores prior state', () => {
  const { trigger, dialog } = fixture();
  document.body.style.overflow = 'auto';
  document.body.style.paddingRight = '7px';
  const release = openManagedDialog(dialog, () => {}, trigger);
  assert.equal(document.getElementById('root').inert, true);
  assert.equal(dialog.getAttribute('aria-modal'), 'true');
  assert.equal(document.activeElement.id, 'close');
  tab(true);
  assert.equal(document.activeElement.id, 'last');
  tab(false);
  assert.equal(document.activeElement.id, 'close');
  document.getElementById('logo').focus();
  assert.equal(document.activeElement.id, 'close');
  release();
  release(); // unmount / repeated cleanup is harmless
  assert.equal(document.querySelectorAll('dialog[open]').length, 0);
  assert.equal(document.getElementById('root').inert, false);
  assert.equal(document.body.style.overflow, 'auto');
  assert.equal(document.body.style.paddingRight, '7px');
  assert.equal(document.activeElement, trigger);
  dialog.remove();
});

test('opening another dialog closes the previous owner; stale cleanup cannot unlock the active one', () => {
  const first = fixture();
  let dismissed = 0;
  const release1 = openManagedDialog(first.dialog, () => dismissed++, first.trigger);
  const second = document.createElement('dialog');
  second.tabIndex = -1;
  document.body.append(second);
  const release2 = openManagedDialog(second, () => {}, first.trigger);
  assert.equal(dismissed, 1);
  assert.equal(document.querySelectorAll('dialog[open]').length, 1);
  release1();
  assert.equal(document.getElementById('root').inert, true);
  assert.equal(document.body.style.overflow, 'hidden');
  assert.equal(document.activeElement, second);
  release2();
  first.dialog.remove(); second.remove();
});

test('Escape and native cancel dismiss the active dialog', () => {
  for (const native of [false, true]) {
    const { dialog, trigger } = fixture();
    let release;
    release = openManagedDialog(dialog, () => release(), trigger);
    if (native) dialog.dispatchEvent(new Event('cancel', { cancelable: true }));
    else document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', cancelable: true, bubbles: true }));
    assert.equal(dialog.open, false);
    assert.equal(document.activeElement, trigger);
    dialog.remove();
  }
});

test('preview does not fetch or persist personal information', async () => {
  const previous = globalThis.fetch;
  globalThis.fetch = () => { throw new Error('Unexpected network request'); };
  const result = await submitEnquiry({ fullName: 'Test Person' });
  assert.deepEqual(result, { success: false, isPreview: true, message: PREVIEW_MESSAGE });
  assert.equal(window.localStorage.length, 0);
  globalThis.fetch = previous;
});

test('only explicit receipt succeeds; HTTP errors, malformed responses, missing receipts and network errors fail', async () => {
  const previous = globalThis.fetch;
  for (const [response, expected] of [
    [() => Response.json({ received: true }), true],
    [() => Response.json({ received: false }), false],
    [() => Response.json({}), false],
    [() => new Response('not JSON'), false],
    [() => new Response('', { status: 500 }), false],
    [() => { throw new Error('Offline'); }, false],
  ]) {
    globalThis.fetch = async () => response();
    const result = await submitEnquiry({ message: 'Test only' }, 'https://example.invalid/test');
    assert.equal(result.success, expected);
    assert.equal(result.isPreview, false);
  }
  globalThis.fetch = previous;
});

test('event validation accepts a formatted Indian phone and rejects invalid data without sending', async () => {
  const payload = { eventId: 'test', eventTitle: 'Test event', fullName: 'Test Person', phone: '+91 98765 43210', cityDistrict: 'Pune', consent: true };
  assert.equal((await submitEventJoinRequest(payload)).isPreview, true);
  const invalid = await submitEventJoinRequest({ ...payload, phone: '123', consent: false });
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.consent);
});

test('unconfirmed image captions never imply an event-photo association', () => {
  assert.equal(hasEventPhotos('taj-conclave-2018'), false);
  assert.equal(hasEventPhotos('youth-awards-2020'), false);
  assert.ok(GALLERY_ITEMS.length > 0);
});

test('contact preview appears before inputs and preserves values after preview submission', async () => {
  const React = await import('react');
  const { createRoot } = await import('react-dom/client');
  const { ContactForm } = await import('../src/components/ContactForm.tsx');
  const container = document.createElement('div'); document.body.append(container);
  const root = createRoot(container);
  await React.act(async () => root.render(React.createElement(ContactForm, { endpoint: '' })));
  assert.ok(container.textContent.indexOf(PREVIEW_MESSAGE) < container.textContent.indexOf('Full Name'));
  const setValue = async (id, value) => {
    const input = container.querySelector('#' + id);
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    await React.act(async () => { setter.call(input, value); input.dispatchEvent(new Event('input', { bubbles: true })); });
  };
  await setValue('contact-fullName', 'Test Person');
  await setValue('contact-phone', '9876543210');
  await setValue('contact-city', 'Pune');
  await setValue('contact-email', 'visitor@example.com');
  await React.act(async () => container.querySelector('#contact-consent').click());
  await React.act(async () => container.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  assert.equal(container.querySelector('#contact-fullName').value, 'Test Person');
  assert.ok(container.textContent.includes(PREVIEW_MESSAGE));
  assert.equal(window.localStorage.length, 0);
  await React.act(async () => root.unmount()); container.remove();
});
import { getEventPhotos } from '../src/data/galleryData.ts';

test('album filtering uses stable event IDs and excludes unrelated photos', () => {
  const a = { ...GALLERY_ITEMS[0], id: 'fixture-a', eventId: 'fixture-event-a' };
  const b = { ...GALLERY_ITEMS[1], id: 'fixture-b', eventId: 'fixture-event-b' };
  assert.deepEqual(getEventPhotos('fixture-event-a', [a, b, GALLERY_ITEMS[2]]), [a]);
  assert.deepEqual(getEventPhotos('unknown-event', [a, b]), []);
});

test('contact rejects duplicate pending submissions and preserves entries on server failure', async () => {
  const React = await import('react');
  const { createRoot } = await import('react-dom/client');
  const { ContactForm } = await import('../src/components/ContactForm.tsx');
  const container = document.createElement('div'); document.body.append(container);
  const root = createRoot(container);
  await React.act(async () => root.render(React.createElement(ContactForm, { endpoint: 'https://example.invalid/test' })));
  for (const [id, value] of [['contact-fullName', 'Test Person'], ['contact-phone', '9876543210'], ['contact-city', 'Pune'], ['contact-email', 'visitor@example.com']]) {
    await React.act(async () => {
      const input = container.querySelector('#' + id);
      Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(input, value);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
  }
  await React.act(async () => container.querySelector('#contact-consent').click());
  let finish, requests = 0;
  const previous = globalThis.fetch;
  globalThis.fetch = () => { requests++; return new Promise(resolve => { finish = resolve; }); };
  await React.act(async () => {
    const form = container.querySelector('form');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
  assert.equal(requests, 1);
  assert.equal(container.querySelector('button[type="submit"]').disabled, true);
  await React.act(async () => finish(new Response('', { status: 500 })));
  assert.equal(container.querySelector('#contact-fullName').value, 'Test Person');
  assert.equal(container.querySelector('button[type="submit"]').disabled, false);
  assert.ok(container.textContent.includes('could not confirm receipt'));
  globalThis.fetch = previous;
  await React.act(async () => root.unmount()); container.remove();
});

test('event enquiry names its dialog, connects to Firebase, and restores focus on close', async () => {
  const React = await import('react');
  const { createRoot } = await import('react-dom/client');
  const { EventEnquiryModal } = await import('../src/components/EventEnquiryModal.tsx');
  const container = document.createElement('div'); document.getElementById('root').append(container);
  const root = createRoot(container);
  const trigger = document.getElementById('trigger'); trigger.focus();
  const event = { id: 'fixture', title: 'Test Event', date: 'Test date', location: 'Test venue' };
  const onClose = () => root.render(null);
  await React.act(async () => root.render(React.createElement(EventEnquiryModal, { event, isOpen: true, onClose, triggerElementRef: trigger })));
  const dialog = document.querySelector('dialog[open]');
  assert.equal(document.getElementById(dialog.getAttribute('aria-labelledby')).textContent.trim(), 'Test Event');
  assert.equal(dialog.textContent.includes(PREVIEW_MESSAGE), false);
  assert.equal(document.getElementById('root').inert, true);
  await React.act(async () => dialog.querySelector('[aria-label="Close enquiry modal"]').click());
  assert.equal(document.querySelector('dialog[open]'), null);
  assert.equal(document.activeElement, trigger);
  assert.equal(document.getElementById('root').inert, false);
  await React.act(async () => root.unmount()); container.remove();
});


test('contact uses Firebase by default and does not display the preview banner', async () => {
  const React = await import('react');
  const { createRoot } = await import('react-dom/client');
  const { ContactForm } = await import('../src/components/ContactForm.tsx');
  const { CONTACT_ENDPOINT } = await import('../src/data/submissionConfig.ts');
  assert.equal(CONTACT_ENDPOINT, 'firebase:contact');
  const container = document.createElement('div'); document.body.append(container);
  const root = createRoot(container);
  await React.act(async () => root.render(React.createElement(ContactForm)));
  assert.equal(container.textContent.includes(PREVIEW_MESSAGE), false);
  assert.equal(container.querySelector('button[type="submit"]').textContent, 'Submit Inquiry');
  await React.act(async () => root.unmount()); container.remove();
});

test('contact validates email and passes it to backend notification handling', async () => {
  const React = await import('react');
  const { createRoot } = await import('react-dom/client');
  const { ContactForm } = await import('../src/components/ContactForm.tsx');
  const { validateSubmission, notification } = await import('../functions/enquiry.js');
  const { randomUUID } = await import('node:crypto');
  const container = document.createElement('div'); document.body.append(container);
  const root = createRoot(container);
  const previous = globalThis.fetch;
  let payload, requests = 0;
  globalThis.fetch = async (_url, options) => {
    requests++;
    payload = JSON.parse(options.body);
    return Response.json({ received: true });
  };
  try {
    await React.act(async () => root.render(React.createElement(ContactForm, { endpoint: 'https://example.invalid/test' })));
    const setValue = async (id, value) => React.act(async () => {
      const input = container.querySelector('#contact-' + id);
      Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(input, value);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    for (const [id, value] of [['fullName','Test Person'],['phone','9876543210'],['city','Pune'],['email','invalid-email']])
      await setValue(id,value);
    await React.act(async () => container.querySelector('#contact-consent').click());
    const submit = () => React.act(async () => container.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    await submit();
    assert.equal(requests,0);
    assert.equal(container.querySelector('#contact-email').getAttribute('aria-invalid'),'true');
    assert.match(container.querySelector('#contact-email-error').textContent,/valid email/);
    await setValue('email','');
    await submit();
    assert.equal(requests,0);
    assert.equal(container.querySelector('#contact-email').required,true);
    assert.match(container.querySelector('#contact-email-error').textContent,/required/);
    await setValue('email','visitor@example.com');
    await submit();
    assert.equal(requests,1);
    assert.equal(payload.email,'visitor@example.com');
    const enquiry = validateSubmission({ ...payload,kind:'contact',requestId:randomUUID() });
    assert.equal(enquiry.email,'visitor@example.com');
    assert.equal(notification(enquiry,'test-id','approved@example.com',new Date()).replyTo,'visitor@example.com');
  } finally {
    globalThis.fetch = previous;
    await React.act(async () => root.unmount()); container.remove();
  }
});
