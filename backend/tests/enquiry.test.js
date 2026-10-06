import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/app.js';
import { Enquiry } from '../src/models/Enquiry.js';

const TEST_DB_URI = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/mi-udyojak-honarach-test';

describe('Enquiry API Integration Tests', () => {
  before(async () => {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(TEST_DB_URI);
    }
    await Enquiry.deleteMany({});
  });

  after(async () => {
    await Enquiry.deleteMany({});
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });

  test('GET /api/health returns 200 and database connected status', async () => {
    const res = await request(app).get('/api/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'ok');
    assert.equal(typeof res.body.uptime, 'number');
    assert.equal(res.body.database.connected, true);
  });

  test('POST /api/enquiries returns 400 when required fields are missing', async () => {
    const res = await request(app)
      .post('/api/enquiries')
      .send({});

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.ok(res.body.errors);
    assert.ok(res.body.errors.fullName);
    assert.ok(res.body.errors.email);
    assert.ok(res.body.errors.phone);
    assert.ok(res.body.errors.city);
    assert.ok(res.body.errors.consent);
  });

  test('POST /api/enquiries returns 400 for invalid email and phone format', async () => {
    const res = await request(app)
      .post('/api/enquiries')
      .send({
        fullName: 'Test User',
        email: 'invalid-email-format',
        phone: '123',
        city: 'Pune',
        consent: true,
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.ok(res.body.errors.email);
    assert.ok(res.body.errors.phone);
  });

  test('POST /api/enquiries successfully creates record with 201 Created', async () => {
    const payload = {
      fullName: 'Rahul Deshmukh',
      email: 'rahul.deshmukh@example.com',
      phone: '9876543210',
      city: 'Pune',
      stage: 'Early-stage Startup',
      interest: 'Mentorship & Guidance',
      message: 'Looking for guidance in scaling agro-processing supply chains.',
      consent: true,
    };

    const res = await request(app)
      .post('/api/enquiries')
      .send(payload);

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.id);
    assert.equal(res.body.data.fullName, 'Rahul Deshmukh');

    // Verify persisted in MongoDB
    const saved = await Enquiry.findById(res.body.data.id);
    assert.ok(saved);
    assert.equal(saved.email, 'rahul.deshmukh@example.com');
    assert.equal(saved.phone, '9876543210');
    assert.equal(saved.city, 'Pune');
    assert.equal(saved.status, 'new');
  });

  test('GET /api/enquiries lists submitted enquiries', async () => {
    const res = await request(app).get('/api/enquiries');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length >= 1);
  });

  test('GET /api/docs.json returns 200 and valid OpenAPI 3.0 specification', async () => {
    const res = await request(app).get('/api/docs.json');
    assert.equal(res.status, 200);
    assert.equal(res.body.openapi, '3.0.3');
    assert.equal(res.body.info.title, 'Mi Udyojak Honarach REST API');
    assert.ok(res.body.paths['/health']);
    assert.ok(res.body.paths['/enquiries']);
    assert.ok(res.body.paths['/event-registrations']);
  });

  test('GET /api/docs returns 200/301 for Swagger UI documentation', async () => {
    const res = await request(app).get('/api/docs/');
    assert.ok([200, 301, 302].includes(res.status));
  });
});
