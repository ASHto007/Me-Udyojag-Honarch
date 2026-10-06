import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/app.js';
import { EventRegistration } from '../src/models/EventRegistration.js';

const TEST_DB_URI = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/mi-udyojak-honarach-test';

describe('Event Registration API Integration Tests', () => {
  before(async () => {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(TEST_DB_URI);
    }
    await EventRegistration.deleteMany({});
  });

  after(async () => {
    await EventRegistration.deleteMany({});
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });

  test('POST /api/event-registrations returns 400 when required fields are missing', async () => {
    const res = await request(app)
      .post('/api/event-registrations')
      .send({});

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.ok(res.body.errors);
    assert.ok(res.body.errors.eventId);
    assert.ok(res.body.errors.eventTitle);
    assert.ok(res.body.errors.fullName);
    assert.ok(res.body.errors.email);
    assert.ok(res.body.errors.phone);
    assert.ok(res.body.errors.cityDistrict);
    assert.ok(res.body.errors.consent);
  });

  test('POST /api/event-registrations registers new participant successfully (201 Created)', async () => {
    const payload = {
      eventId: 'mumbai-expo-2027',
      eventTitle: 'Global Marathi Entrepreneurship Expo 2027',
      fullName: 'Aakash More',
      email: 'aakash.more@example.com',
      phone: '9822012345',
      businessName: 'More Engineering Works',
      cityDistrict: 'Mumbai Suburban',
      message: 'Looking forward to the manufacturing panel.',
      consent: true,
    };

    const res = await request(app)
      .post('/api/event-registrations')
      .send(payload);

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.id);
    assert.equal(res.body.data.eventId, 'mumbai-expo-2027');

    const saved = await EventRegistration.findById(res.body.data.id);
    assert.ok(saved);
    assert.equal(saved.email, 'aakash.more@example.com');
    assert.equal(saved.phone, '9822012345');
    assert.equal(saved.status, 'confirmed');
  });

  test('POST /api/event-registrations duplicate registration returns 409 Conflict', async () => {
    // Attempt to register again with same email for the same event
    const duplicateEmailPayload = {
      eventId: 'mumbai-expo-2027',
      eventTitle: 'Global Marathi Entrepreneurship Expo 2027',
      fullName: 'Aakash More',
      email: 'aakash.more@example.com',
      phone: '9811122233', // different phone, same email
      businessName: 'More Engineering',
      cityDistrict: 'Mumbai',
      consent: true,
    };

    const resEmail = await request(app)
      .post('/api/event-registrations')
      .send(duplicateEmailPayload);

    assert.equal(resEmail.status, 409);
    assert.equal(resEmail.body.success, false);
    assert.ok(resEmail.body.message.includes('already registered'));

    // Attempt to register again with same phone for the same event
    const duplicatePhonePayload = {
      eventId: 'mumbai-expo-2027',
      eventTitle: 'Global Marathi Entrepreneurship Expo 2027',
      fullName: 'Another Person',
      email: 'another.person@example.com',
      phone: '9822012345', // same phone as first test
      cityDistrict: 'Mumbai',
      consent: true,
    };

    const resPhone = await request(app)
      .post('/api/event-registrations')
      .send(duplicatePhonePayload);

    assert.equal(resPhone.status, 409);
    assert.equal(resPhone.body.success, false);
    assert.ok(resPhone.body.message.includes('already registered'));
  });

  test('POST /api/event-registrations allows registration for a different event with same email', async () => {
    const differentEventPayload = {
      eventId: 'pune-conclave-2027',
      eventTitle: 'Western Maharashtra MSME Conclave 2027',
      fullName: 'Aakash More',
      email: 'aakash.more@example.com',
      phone: '9822012345',
      cityDistrict: 'Pune',
      consent: true,
    };

    const res = await request(app)
      .post('/api/event-registrations')
      .send(differentEventPayload);

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.eventId, 'pune-conclave-2027');
  });

  test('GET /api/event-registrations lists event registrations', async () => {
    const res = await request(app).get('/api/event-registrations');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length >= 2);
  });
});
