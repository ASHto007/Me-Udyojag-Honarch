import { EventRegistration } from '../models/EventRegistration.js';
import { normalizeEmail } from '../utils/normalizeEmail.js';
import { normalizePhone } from '../utils/normalizePhone.js';
import { stripHtml } from '../utils/sanitize.js';
import { sendEventAdminEmail, sendEventUserEmail } from '../services/emailService.js';
import { syncEventRegistrationToGoogleSheet } from '../services/googleSheetService.js';

/**
 * Handle new event registration submission with duplicate protection.
 * 
 * POST /api/event-registrations
 */
export async function createEventRegistration(req, res, next) {
  try {
    // Explicit extraction of controlled fields
    const {
      eventId,
      eventTitle,
      fullName,
      email,
      phone,
      businessName,
      netWorth,
      cityDistrict,
      message,
      consent,
    } = req.body;

    const normalizedEmailVal = normalizeEmail(email);
    const normalizedPhoneVal = normalizePhone(phone);
    const cleanEventId = stripHtml(eventId);

    const controlledPayload = {
      eventId: cleanEventId,
      eventTitle: stripHtml(eventTitle),
      fullName: stripHtml(fullName),
      email: normalizedEmailVal,
      phone: normalizedPhoneVal,
      businessName: stripHtml(businessName) || '',
      netWorth: stripHtml(netWorth) || '',
      cityDistrict: stripHtml(cityDistrict),
      message: stripHtml(message) || '',
      consent: Boolean(consent),
      ip: req.ip || req.headers['x-forwarded-for'] || '',
      status: 'pending',
    };

    const registration = await EventRegistration.create(controlledPayload);

    // Return 201 response immediately so user experiences instant (<100ms) submission
    res.status(201).json({
      success: true,
      message: `Registration request submitted for ${registration.eventTitle}. Your request has been sent for admin review. Once approved, you will receive a confirmation email.`,
      data: {
        id: registration._id,
        eventId: registration.eventId,
        eventTitle: registration.eventTitle,
        fullName: registration.fullName,
        status: registration.status,
        createdAt: registration.createdAt,
      },
    });

    // Asynchronously dispatch notifications in background without blocking user
    setImmediate(() => {
      Promise.allSettled([
        sendEventAdminEmail(registration),
        sendEventUserEmail(registration),
        syncEventRegistrationToGoogleSheet(registration),
      ]).then((results) => {
        const types = ['Admin event notification', 'User event confirmation', 'Google Sheet sync'];
        results.forEach((res, i) => {
          if (res.status === 'rejected') {
            console.error(`[Event Dispatch Error - ${types[i]}]:`, res.reason?.message || res.reason);
          } else {
            console.log(`[Event Dispatch Success - ${types[i]}]: Sent / Synced`);
          }
        });
      }).catch((err) => console.error('[Event Dispatch Warning]:', err));
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Future-ready administrative listing of event registrations.
 * 
 * GET /api/event-registrations
 */
export async function getEventRegistrations(req, res, next) {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '20', 10);
    const skip = (page - 1) * limit;
    const filter = {};

    if (req.query.eventId) {
      filter.eventId = req.query.eventId;
    }

    const [registrations, total] = await Promise.all([
      EventRegistration.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      EventRegistration.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: registrations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
}

export default { createEventRegistration, getEventRegistrations };
