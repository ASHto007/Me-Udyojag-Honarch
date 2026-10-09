import { Router } from 'express';
import { createEnquiry, getEnquiries } from '../controllers/enquiryController.js';
import { validateEnquiryInput } from '../validators/enquiryValidator.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { submissionRateLimiter } from '../middleware/rateLimiter.js';
import { requireAdminAuth } from '../middleware/adminAuth.js';

const router = Router();

// POST /api/enquiries - Submit new inquiry
router.post(
  '/',
  submissionRateLimiter,
  validateRequest(validateEnquiryInput),
  createEnquiry
);

// GET /api/enquiries - Protected administrative listing
router.get('/', requireAdminAuth, getEnquiries);

export default router;
