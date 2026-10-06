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
  /*
  // Example template:
  {
    id: 'mumbai-expo-2027',
    title: 'Global Marathi Entrepreneurship Expo 2027',
    marathiTitle: 'ग्लोबल मराठी उद्योजकता परिषद २०२७',
    date: 'Saturday, 27 March 2027',
    time: '9:30 AM – 7:30 PM IST',
    location: 'National Stock Exchange (NSE Convention Hall), BKC, Mumbai',
    description: 'Flagship industrial convention bringing together 500+ first-generation business creators, angel mentors, and MSME leaders across Maharashtra.',
    statusBadge: 'By Invitation & Vetted Application',
    statusType: 'open',
    image: '/assets/hero-workshop.webp',
    imageAlt: 'Global Marathi Entrepreneurship Expo 2027 in Mumbai',
    isFeatured: true,
    type: 'upcoming',
    allowsEnquiry: true,
    category: 'Flagship Conclave',
    startsAt: '2027-03-27T09:30:00+05:30',
    endsAt: '2027-03-27T19:30:00+05:30'
  }
  */
];

/**
 * ─────────────────────────────────────────────────────────────
 * PAST EVENTS & ARCHIVES
 * ─────────────────────────────────────────────────────────────
 * Add concluded events, milestones, and symposium archives here.
 */
export const PAST_EVENTS: EventItem[] = [
  /*
  // Example template:
  {
    id: 'gmec-2018',
    title: 'Global Maharashtrian Entrepreneurship Conclave 2018',
    marathiTitle: 'ग्लोबल मराठी उद्योजकता परिषद २०१८',
    date: '15 October 2018',
    time: 'Full Day Event',
    location: 'The Taj Mahal Palace, Colaba, Mumbai',
    description: 'Founding symposium convening regional industrialists, trade delegates, and aspiring business pioneers.',
    statusBadge: 'Concluded',
    statusType: 'closed',
    image: '/assets/hero-workshop.webp',
    imageAlt: 'GMEC 2018 Conclave at Taj Mahal Palace, Mumbai',
    type: 'past',
    allowsEnquiry: false,
    category: 'Historical Conclave',
    recapNote: 'Presided over by senior industrial leaders. Archival symposium records preserved.',
    photosAnchor: 'gmec-2018'
  }
  */
];

/**
 * Combined list of all events, consumed by the Events component.
 */
export const EVENTS_DATA: EventItem[] = [...UPCOMING_EVENTS, ...PAST_EVENTS];
