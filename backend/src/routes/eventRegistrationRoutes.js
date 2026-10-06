import { Router } from 'express';
import {
  createEventRegistration,
  getEventRegistrations,
} from '../controllers/eventRegistrationController.js';
import { validateEventRegistrationInput } from '../validators/eventRegistrationValidator.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { submissionRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// POST /api/event-registrations - Submit event seat/enquiry request
router.post(
  '/',
  submissionRateLimiter,
  validateRequest(validateEventRegistrationInput),
  createEventRegistration
);

// GET /api/event-registrations - Future-ready admin listing
router.get('/', getEventRegistrations);

export default router;
