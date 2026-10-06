import { Router } from 'express';
import { createEnquiry, getEnquiries } from '../controllers/enquiryController.js';
import { validateEnquiryInput } from '../validators/enquiryValidator.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { submissionRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// POST /api/enquiries - Submit new inquiry
router.post(
  '/',
  submissionRateLimiter,
  validateRequest(validateEnquiryInput),
  createEnquiry
);

// GET /api/enquiries - Future-ready admin listing
router.get('/', getEnquiries);

export default router;
