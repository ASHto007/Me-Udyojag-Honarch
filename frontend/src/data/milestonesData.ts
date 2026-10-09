/**
 * Chronological Milestones Data
 * 
 * Add or edit organizational milestones, regional expansions, and gatherings.
 * Automatically sorted chronologically by date in the Milestones timeline.
 */

export interface Milestone {
  id: string;                      // Unique ID (e.g., 'conclave-taj-2018')
  period: string;                  // Display date or period (e.g., 'October 2018' or '2018 - 2019')
  date: string;                    // ISO Date string for sorting (e.g., '2018-10-15')
  title: string;                   // Main title of the achievement or event
  desc: string;                    // Summary description of what occurred
  badge: string;                   // Badge label (e.g., 'Flagship Event', 'Regional Chapter')
  location?: string;               // City or venue (e.g., 'The Taj Mahal Palace, Mumbai')
  activity?: string;               // Type of activity (e.g., 'State Conclave')
  peopleReached?: number;          // Verified attendees count
  businessesReached?: number;      // Verified businesses reached count
  image?: string;                  // Optional photo asset path
  imageAlt?: string;               // Alt text for photo
  verifiedStatistics?: { label: string; value: string }[];
}

/**
 * Array of verified milestones.
 * Add new milestone entries inside this array.
 */
export const APPROVED_MILESTONES: Milestone[] = [
  {
    id: 'milestone-inception',
    period: '~17 Years Ago',
    date: '2007-01-01',
    title: 'Movement Inception',
    desc: 'Grassroots entrepreneurship guidance initiative founded by Nilesh More, addressing the lack of structured business mentorship in regional communities.',
    badge: 'Movement Inception',
    activity: 'Initiative Launch'
  },
  {
    id: 'milestone-gmec-2018',
    period: '15 Oct 2018',
    date: '2018-10-15',
    title: 'Global Maharashtrian Entrepreneurship Conclave',
    desc: 'Held at the iconic Hotel Taj Mahal Palace, Mumbai, bringing together prominent business personalities and emerging industrialists.',
    badge: 'Documented Landmark',
    location: 'The Taj Mahal Palace, Mumbai',
    activity: 'State Conclave',
    peopleReached: 500
  },
  {
    id: 'milestone-youth-awards-2020',
    period: '2020',
    date: '2020-01-01',
    title: 'Youth Guidance & Awards Programme',
    desc: 'Statewide awards and orientation series covered by regional press, honoring youth resilience and enterprise creation.',
    badge: 'Press-Documented',
    activity: 'Awards & Orientation'
  },
  {
    id: 'milestone-statewide-reach',
    period: 'Ongoing',
    date: '2024-01-01',
    title: 'Statewide Participant Milestones',
    desc: 'Over 25,000 direct seminar participants, 185+ educational sessions (60+ auditoriums, 100+ hotels, 25+ colleges), and 2.5M+ digital impressions.',
    badge: 'Statewide Reach',
    peopleReached: 25000,
    verifiedStatistics: [
      { label: 'Educational Sessions', value: '185+' },
      { label: 'Digital Impressions', value: '2.5M+' }
    ]
  },
  {
    id: 'milestone-gmee-2026',
    period: '27 Oct 2026',
    date: '2026-10-27',
    title: 'Global Marathi Entrepreneurship Expo',
    desc: 'Historic gathering of 100+ Marathi entrepreneurs with crore-scale operations at the National Stock Exchange of India (NSE), Mumbai.',
    badge: 'Confirmed Upcoming Expo',
    location: 'National Stock Exchange of India (NSE), Mumbai',
    activity: 'State Conclave',
    businessesReached: 100
  }
];
