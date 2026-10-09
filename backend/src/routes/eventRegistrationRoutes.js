import { Router } from 'express';
import {
  createEventRegistration,
  getEventRegistrations,
} from '../controllers/eventRegistrationController.js';
import { validateEventRegistrationInput } from '../validators/eventRegistrationValidator.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { submissionRateLimiter } from '../middleware/rateLimiter.js';
import { requireAdminAuth } from '../middleware/adminAuth.js';

const router = Router();

// POST /api/event-registrations - Submit event seat/enquiry request
router.post(
  '/',
  submissionRateLimiter,
  validateRequest(validateEventRegistrationInput),
  createEventRegistration
);

// GET /api/event-registrations - Protected administrative listing
router.get('/', requireAdminAuth, getEventRegistrations);

export default router;
