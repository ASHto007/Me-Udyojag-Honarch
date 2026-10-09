/**
 * Verified Impact Statistics Data
 * 
 * Quantifiable metrics displayed in the Impact / Numbers section.
 * Recognized labels automatically map to custom brand icons.
 */

export interface VerifiedStatistic {
  id: string;                      // Unique ID (e.g., 'stat-entrepreneurs')
  label:                           // Recognized labels with designated icons:
  | 'Entrepreneurs Connected'
  | 'Districts Reached'
  | 'Events Conducted'
  | 'Mentors'
  | 'Businesses Supported'
  | 'Years of Journey';
  value: string;                   // Formatted display number (e.g., '25,000+', '36', '120+')
  source: string;                  // Audit reference or basis
}

/**
 * Array of verified statistics.
 * Add new statistic entries inside this array.
 */
export const APPROVED_STATISTICS: VerifiedStatistic[] = [

  // Example template:
  {
    id: 'stat-entrepreneurs',
    label: 'Entrepreneurs Connected',
    value: '25,000+',
    source: 'Statewide registration and seminar logs 2018-2026'
  },
  {
    id: 'stat-districts',
    label: 'Districts Reached',
    value: '36',
    source: 'District chapter outreach across Maharashtra'
  },
  {
    id: 'stat-events',
    label: 'Events Conducted',
    value: '150+',
    source: 'Statewide registration and seminar logs 2018-2026'
  },
  {
    id: 'stat-mentors',
    label: 'Mentors',
    value: '100+',
    source: 'Statewide registration and seminar logs 2018-2026'
  },
  {
    id: 'stat-businesses',
    label: 'Businesses Supported',
    value: '100+',
    source: 'Statewide registration and seminar logs 2018-2026'
  },
  {
    id: 'stat-journey',
    label: 'Years of Journey',
    value: '8+',
    source: 'Statewide registration and seminar logs 2018-2026'
  },

];
