/**
 * Mentors & Guidance Data
 * 
 * Add or edit verified mentor profiles here.
 * To add a new mentor:
 * 1. Ensure their profile picture is saved in `public/assets/` or use an external URL.
 * 2. Add an object to `APPROVED_MENTORS` following the `MentorProfile` interface.
 */

export interface MentorProfile {
  id: string;                      // Unique identifier (e.g., 'mentor-nilesh-more')
  name: string;                    // Full name (e.g., 'Rajesh Patil')
  designation: string;             // Title/Designation (e.g., 'Managing Director')
  role?: string;                   // Optional role focus (e.g., 'Industrial Manufacturing')
  company?: string;                // Company or firm name
  organisation?: string;           // Alternate organisation name
  expertise?: string[];            // Key domains (e.g., ['Supply Chain', 'Export-Import', 'MSME Subsidies'])
  yearsExperience?: number | string; // Years in industry (e.g., 20 or '20+')
  shortBio: string;                // 2-3 sentence overview
  description?: string;            // Extended description if needed
  photo?: string;                  // Image path (e.g., '/assets/mentor-1.jpg')
  image?: string;                  // Alternative image path property
  photoAlt?: string;               // Accessible alt description
  alt?: string;                    // Alternative alt property
  tag?: string;                    // Card badge/tag (e.g., 'Manufacturing Mentor')
  linkedInUrl?: string;            // Full LinkedIn URL
  socialUrl?: string;              // Alternate website or profile link
}

/**
 * Array of verified mentors.
 * Add new mentor entries inside this array.
 */
export const APPROVED_MENTORS: MentorProfile[] = [
  /*
  // Example template:
  {
    id: 'mentor-1',
    name: 'Santosh Shinde',
    designation: 'Founder & CMD',
    company: 'Sahyadri Agro Industries',
    expertise: ['Food Processing', 'Cold Chain', 'Govt Subsidies'],
    yearsExperience: '22+',
    shortBio: 'Specializes in scaling agri-processing ventures and securing agro-industrial cluster incentives across Maharashtra.',
    photo: '/assets/mentor-1.jpg',
    tag: 'Agri-Business Mentor',
    linkedInUrl: 'https://linkedin.com'
  }
  */
];
