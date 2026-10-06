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
  /*
  // Example template:
  {
    id: 'milestone-gmec-2018',
    period: 'October 2018',
    date: '2018-10-15',
    title: 'Global Maharashtrian Entrepreneurship Conclave',
    desc: 'Founding symposium convening regional industrialists, trade delegates, and aspiring business pioneers.',
    badge: 'Flagship Inception',
    location: 'The Taj Mahal Palace, Mumbai',
    peopleReached: 500
  }
  */
];
