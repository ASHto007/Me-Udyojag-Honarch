/**
 * Success Stories & Founder Journeys Data
 * 
 * Add or edit verified entrepreneur case studies and business growth outcomes.
 */

export interface SuccessStory {
  id: string;                      // Unique ID (e.g., 'story-rohit-pawar')
  name: string;                    // Founder or business owner name
  company: string;                 // Company or venture name
  industry: string;                // Sector (e.g., 'Food Processing', 'Solar Energy', 'Textiles')
  location: string;                // District or town (e.g., 'Satara, Maharashtra')
  challenge: string;               // What bottleneck they faced initially
  support: string;                 // How Mi Udyojak Honarach assisted
  result: string;                  // Measurable business outcome (e.g., '3x revenue growth in 18 months')
  photo?: string;                  // Photo path (e.g., '/assets/story-1.jpg')
  photoAlt?: string;               // Alt text for the image
  quote?: string;                  // Testimonial quote from the founder
  socialUrl?: string;              // Website or LinkedIn link
  videoUrl?: string;               // Optional link to video interview
}

/**
 * Array of verified success stories.
 * Add new success story entries inside this array.
 */
export const APPROVED_STORIES: SuccessStory[] = [
  /*
  // Example template:
  {
    id: 'story-1',
    name: 'Pravin Kadam',
    company: 'Sahyadri Bio-Organics',
    industry: 'Agri-Tech & Organics',
    location: 'Kolhapur, Maharashtra',
    challenge: 'Struggling with retail distribution networks and state MSME compliance.',
    support: 'Connected with cluster mentors and facilitated B2B market tie-ups.',
    result: 'Expanded retail placement into 45+ organic stores across Pune & Mumbai.',
    quote: 'The mentorship transformed our operational mindset from a small farm unit into a commercial brand.'
  }
  */
];
