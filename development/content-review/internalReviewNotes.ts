/**
 * INTERNAL IMPLEMENTATION & CLIENT REVIEW ARCHIVE
 * 
 * This file preserves all internal review annotations, spreadsheet tracker codes,
 * compliance items, and pending client information requirements for developer
 * reference. These notes were moved from public presentation components
 * to maintain clean, credible, user-facing copy without erasing project history.
 */

export interface ReviewTrackerItem {
  code: string;
  section: string;
  category: 'pending_input' | 'audit_item' | 'permission_note' | 'metric_source';
  note: string;
  sourceContext?: string;
}

export const INTERNAL_REVIEW_NOTES: ReviewTrackerItem[] = [
  // Metrics and Statistics Sources
  {
    code: 'item 03-08',
    section: 'Stats / Metrics',
    category: 'metric_source',
    note: 'Client-reported figures: 25,000+ seminar participants, 36 districts of Maharashtra, ₹150 Cr+ cumulative capital & market value enabled, 450+ veteran mentors & advisors.',
    sourceContext: 'Reported by founder Nilesh More; pending independent 3rd party certification.'
  },
  {
    code: 'item 04-03',
    section: 'Milestones / History',
    category: 'audit_item',
    note: '5 verified timeline points submitted: 17 years movement history, 185+ seminars, Taj Palace conclave 2018, youth guidance series 2020, NSE Expo 2026.',
    sourceContext: 'Historical documentation tracker item 04-03.'
  },

  // Events & Venue Details
  {
    code: 'item 06-03',
    section: 'Events / NSE 2026',
    category: 'pending_input',
    note: 'Exact hall, full building address, and Google Map directions link for NSE India venue in Mumbai.',
    sourceContext: 'Awaiting venue management confirmation.'
  },
  {
    code: 'item 06-05',
    section: 'Events / NSE 2026',
    category: 'pending_input',
    note: 'Formal registration process, invite qualification criteria, and ticketing/entry protocol for crore-scale businesses.',
    sourceContext: 'Organizing committee vetting procedure.'
  },

  // Success Stories
  {
    code: 'section 07',
    section: 'Stories / Founder Journeys',
    category: 'pending_input',
    note: 'Success stories and entrepreneur case studies to be supplied with photos, business turnover, and mentorship quotes.',
    sourceContext: 'Client content collection pipeline.'
  },

  // Contact Desk & Channels
  {
    code: 'item 09-11',
    section: 'Contact / Headquarters',
    category: 'pending_input',
    note: 'Official head office registered address and visiting hours.',
    sourceContext: 'Awaiting official registered office address from client.'
  },
  {
    code: 'item 09-12',
    section: 'Contact / Email',
    category: 'pending_input',
    note: 'Public official organization email address.',
    sourceContext: 'Domain mailbox setup in progress.'
  },
  {
    code: 'item 09-13',
    section: 'Contact / Helpline',
    category: 'pending_input',
    note: 'Official helpline phone number and WhatsApp business integration API.',
    sourceContext: 'Telecom onboarding pending.'
  },
  {
    code: 'section 09',
    section: 'Contact / Routing',
    category: 'pending_input',
    note: 'Backend submission routing, CRM integration, and automated response template.',
    sourceContext: 'Phase 2 backend implementation.'
  },

  // Gallery Permissions
  {
    code: 'item 02-08 / 02-11',
    section: 'Gallery / Orbit',
    category: 'permission_note',
    note: 'Pre-launch review archival artifact; subject to client photo permission.',
    sourceContext: 'Media release approvals.'
  },

  // Audit Notes
  {
    code: 'audit-master',
    section: 'Footer / Compliance',
    category: 'audit_item',
    note: 'Content Compliance Master Audit Applied — ensure distinction between participants, people reached, and entrepreneurs mentored.',
    sourceContext: 'Quality assurance checklist.'
  },
  {
    code: 'translation-tagline',
    section: 'Footer / Brand',
    category: 'audit_item',
    note: 'Working Translation Tagline: "I Will Become an Entrepreneur" for Marathi phrase "मी उद्योजक होणारच!"',
    sourceContext: 'English translation reference.'
  }
];
