import { Enquiry } from '../models/Enquiry.js';
import { normalizeEmail } from '../utils/normalizeEmail.js';
import { normalizePhone } from '../utils/normalizePhone.js';
import { stripHtml } from '../utils/sanitize.js';
import { sendEnquiryAdminEmail, sendEnquiryUserEmail } from '../services/emailService.js';

/**
 * Handle new general enquiry submission.
 * 
 * POST /api/enquiries
 */
export async function createEnquiry(req, res, next) {
  try {
    // Explicit extraction of controlled fields (never trust req.body wholesale)
    const {
      fullName,
      email,
      phone,
      city,
      stage,
      interest,
      message,
      consent,
    } = req.body;

    const controlledPayload = {
      fullName: stripHtml(fullName),
      email: normalizeEmail(email),
      phone: normalizePhone(phone),
      city: stripHtml(city),
      stage: stripHtml(stage) || 'Aspiring Entrepreneur (Idea Stage)',
      interest: stripHtml(interest) || 'Mentorship & Guidance (Service 03)',
      message: stripHtml(message) || '',
      consent: Boolean(consent),
      ip: req.ip || req.headers['x-forwarded-for'] || '',
      status: 'new',
    };

    const enquiry = await Enquiry.create(controlledPayload);

    // Return 201 response immediately so user experiences instant (<100ms) submission
    res.status(201).json({
      success: true,
      message: 'Your enquiry has been received successfully. Our team will contact you shortly.',
      data: {
        id: enquiry._id,
        fullName: enquiry.fullName,
        createdAt: enquiry.createdAt,
      },
    });

    // Asynchronously dispatch notifications in background without blocking user
    setImmediate(() => {
      Promise.allSettled([
        sendEnquiryAdminEmail(enquiry),
        sendEnquiryUserEmail(enquiry),
      ]).then((results) => {
        const types = ['Admin notification', 'User confirmation'];
        results.forEach((res, i) => {
          if (res.status === 'rejected') {
            console.error(`[Email Error - ${types[i]}]:`, res.reason?.message || res.reason);
          } else {
            console.log(`[Email Success - ${types[i]}]: Sent (messageId: ${res.value?.messageId || 'OK'})`);
          }
        });
      }).catch((err) => console.error('[Email Dispatch Warning]:', err));
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Future-ready administrative listing of enquiries.
 * 
 * GET /api/enquiries
 */
export async function getEnquiries(req, res, next) {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '20', 10);
    const skip = (page - 1) * limit;

    const [enquiries, total] = await Promise.all([
      Enquiry.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Enquiry.countDocuments(),
    ]);

    return res.json({
      success: true,
      data: enquiries,
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

export default { createEnquiry, getEnquiries };
