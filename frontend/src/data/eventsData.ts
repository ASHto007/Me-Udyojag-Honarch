/**
 * Events Data Model & Repository
 * 
 * Verifiable event records categorized into Upcoming and Past events.
 * Timings reflect local Asia/Kolkata timezone (IST, UTC+05:30).
 * 
 * To add an event:
 * - For upcoming conclaves/workshops, add to `UPCOMING_EVENTS`.
 * - For concluded events/archives, add to `PAST_EVENTS`.
 * Both are combined into `EVENTS_DATA` automatically.
 */

export interface EventItem {
  id: string;                      // Unique ID (e.g., 'mumbai-expo-2027')
  title: string;                   // Event name (English)
  marathiTitle?: string;           // Optional Marathi headline
  date: string;                    // Formatted date string (e.g., 'Saturday, 27 March 2027')
  time?: string;                   // Time string (e.g., '9:30 AM – 7:30 PM IST')
  location: string;                // Venue & City (e.g., 'BKC, Mumbai')
  venueAddress?: string;           // Complete postal street address & pin code
  landmark?: string;               // Landmark navigation aid
  description: string;             // Detailed event overview
  statusBadge: string;             // Display badge (e.g., 'Registrations Open', 'By Invitation')
  statusType:                      // Status code determining button styles:
    | 'open'
    | 'invitation'
    | 'closed'
    | 'postponed'
    | 'cancelled';
  image: string;                   // Banner photo path (e.g., '/assets/hero-workshop.webp')
  isFeatured?: boolean;            // Highlight as main top card
  type: 'upcoming' | 'past';       // Event bucket
  allowsEnquiry: boolean;          // Set true to allow users to register / submit enquiry
  startsAt?: string;               // ISO 8601 timestamp with TZ (e.g., '2027-03-27T09:30:00+05:30')
  endsAt?: string;                 // ISO 8601 timestamp with TZ (e.g., '2027-03-27T19:30:00+05:30')
  category?: string;               // Category label (e.g., 'Flagship Conclave', 'Regional Meet')
  imageAlt?: string;               // Accessible alt description for the banner image
  recapUrl?: string;               // External link to video or press recap
  photosAnchor?: string;           // Link to gallery item or anchor if photos exist
  recapNote?: string;              // Concluding summary note for past events
}

/**
 * ─────────────────────────────────────────────────────────────
 * UPCOMING EVENTS
 * ─────────────────────────────────────────────────────────────
 * Add upcoming conferences, workshops, and conclaves here.
 */
export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 'global-marathi-parishad-2026',
    title: 'Global Marathi Entrepreneurship Conclave 2026',
    marathiTitle: 'ग्लोबल मराठी उद्योजकीय परिषद - २०२६',
    date: 'Tuesday, 27 October 2026',
    time: '9:00 AM – 9:00 PM IST',
    location: 'National Stock Exchange of India (NSE), BKC, Mumbai',
    venueAddress: 'Exchange Plaza, C-1, Block G, Bandra Kurla Complex (BKC), Bandra (East), Mumbai, Maharashtra 400051',
    landmark: 'Near MCA Club & ICICI Bank Tower, BKC',
    description: '१०० कोटींचा व्यवसाय करणारे मराठी उद्योजक प्रथमच एकत्र. चला करू कर्तृत्वाचा जागर — अभिजात मराठी, श्रीमंत मराठी. Landmark summit connecting high-impact business creators, institutional investors, and visionary leaders.',
    statusBadge: 'प्रवेश फक्त निमंत्रितांसाठी (By Invitation)',
    statusType: 'invitation',
    image: '/assets/global-marathi-parishad-2026.webp',
    imageAlt: 'ग्लोबल मराठी उद्योजकीय परिषद २०२६ - १०० कोटींचा व्यवसाय करणारे मराठी उद्योजक प्रथमच एकत्र - NSE मुंबई',
    isFeatured: true,
    type: 'upcoming',
    allowsEnquiry: true,
    category: 'Flagship Conclave',
    startsAt: '2026-10-27T09:00:00+05:30',
    endsAt: '2026-10-27T21:00:00+05:30'
  }
];

/**
 * ─────────────────────────────────────────────────────────────
 * PAST / COMPLETED EVENTS & ARCHIVES
 * ─────────────────────────────────────────────────────────────
 * Concluded events, landmark symposiums, and archives.
 */
export const PAST_EVENTS: EventItem[] = [
  // {
  //   id: 'gmec-2018',
  //   title: 'Global Maharashtrian Entrepreneurship Conclave 2018',
  //   marathiTitle: 'ग्लोबल मराठी उद्योजकता परिषद २०१८',
  //   date: 'Monday, 15 October 2018',
  //   time: '9:30 AM – 6:30 PM IST',
  //   location: 'The Taj Mahal Palace, Colaba, Mumbai',
  //   venueAddress: 'Apollo Bunder, Colaba, Mumbai, Maharashtra 400001',
  //   landmark: 'Gateway of India, Colaba',
  //   description: 'Founding symposium convening regional industrialists, trade delegates, and emerging Marathi business pioneers in the historic ballroom of The Taj Mahal Palace.',
  //   statusBadge: 'संपन्न (Completed)',
  //   statusType: 'closed',
  //   image: '/assets/hero-workshop.webp',
  //   imageAlt: 'GMEC 2018 Conclave at Taj Mahal Palace, Mumbai',
  //   type: 'past',
  //   allowsEnquiry: false,
  //   category: 'Historical Conclave',
  //   startsAt: '2018-10-15T09:30:00+05:30',
  //   endsAt: '2018-10-15T18:30:00+05:30',
  //   recapNote: 'Presided over by senior industrial leaders. Archival symposium records preserved.',
  //   photosAnchor: 'gmec-2018',
  // },
  // {
  //   id: 'youth-awards-conclave-2020',
  //   title: 'State Youth Guidance & Entrepreneurship Conclave',
  //   marathiTitle: 'राज्यस्तरीय युवा मार्गदर्शन व उद्योजकता परिषद',
  //   date: 'Saturday, 18 January 2020',
  //   time: '10:00 AM – 5:00 PM IST',
  //   location: 'Bal Gandharva Ranga Mandir, JM Road, Pune',
  //   venueAddress: 'Jhansi Rani Laxmibai Chowk, Shivajinagar, Pune, Maharashtra 411005',
  //   landmark: 'Near Sambhaji Park, JM Road',
  //   description: 'Statewide orientation summit honoring youth resilience, first-generation startups, and enterprise creation across western Maharashtra.',
  //   statusBadge: 'संपन्न (Completed)',
  //   statusType: 'closed',
  //   image: '/assets/orbit-2.webp',
  //   imageAlt: 'State Youth Guidance and Awards Conclave in Pune',
  //   type: 'past',
  //   allowsEnquiry: false,
  //   category: 'Regional Conclave',
  //   startsAt: '2020-01-18T10:00:00+05:30',
  //   endsAt: '2020-01-18T17:00:00+05:30',
  //   recapNote: 'Attended by over 500 aspiring youth and regional industrialists.',
  //   photosAnchor: 'startup-felicitation',
  // },
];

/**
 * Accurately determines if an event has already occurred / concluded.
 * Checks explicit 'past' type, ISO endsAt timestamp, ISO startsAt timestamp,
 * or the formatted date string against the given timestamp.
 */
export function isEventPassed(event: EventItem, nowMs: number = Date.now()): boolean {
  if (event.type === 'past') return true;

  if (event.endsAt) {
    const end = Date.parse(event.endsAt);
    if (!isNaN(end)) return end <= nowMs;
  }

  if (event.startsAt) {
    const start = Date.parse(event.startsAt);
    if (!isNaN(start)) {
      // If endsAt is not specified, assume event concluded 12 hours after start
      const estimatedEnd = start + 12 * 60 * 60 * 1000;
      return estimatedEnd <= nowMs;
    }
  }

  if (event.date) {
    const parsed = Date.parse(event.date);
    if (!isNaN(parsed)) {
      const endOfDay = parsed + 24 * 60 * 60 * 1000;
      return endOfDay <= nowMs;
    }
  }

  return false;
}

/**
 * Combined list of all events, consumed by the Events component.
 */
export const EVENTS_DATA: EventItem[] = [...UPCOMING_EVENTS, ...PAST_EVENTS];
