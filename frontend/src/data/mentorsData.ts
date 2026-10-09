/**
 * Mentors & Guidance Data
 * 
 * Verified mentor profiles for Mi Udyojak Honarach.
 * Additional bio, designation, and expertise details can be expanded in the future.
 */

export interface MentorProfile {
  id: string;                      // Unique identifier (e.g., 'mentor-1')
  name: string;                    // Full name (e.g., 'Santosh Patil')
  company?: string;                // Company or firm name
  designation?: string;             // Optional title/designation
  role?: string;                   // Optional role focus
  organisation?: string;           // Alternate organisation name
  expertise?: string[];            // Key domains
  yearsExperience?: number | string; // Years in industry
  shortBio?: string;                // Overview/bio
  description?: string;            // Extended description
  photo?: string;                  // Image path
  image?: string;                  // Alternative image path
  imagePosition?: string;          // Specific object-position calibration
  imageShiftUp?: number;           // Vertical offset tuning in px
  imageScale?: number;             // Zoom scale factor
  photoAlt?: string;               // Accessible alt description
  alt?: string;                    // Alternative alt property
  tag?: string;                    // Card badge/tag
  linkedInUrl?: string;            // LinkedIn URL
  socialUrl?: string;              // Alternate profile link
}

/**
 * Array of verified mentors.
 */
export const APPROVED_MENTORS: MentorProfile[] = [
  {
    id: 'mentor-1',
    name: 'Santosh Patil',
    company: "UK's Resort",
    photo: '/assets/mentor-1-refined.webp',
  },
  {
    id: 'mentor-2',
    name: 'Suresh Havare',
    company: 'Havare Group',
    photo: '/assets/mentor-2-refined.webp',
  },
  {
    id: 'mentor-3',
    name: 'Ajit Marathe',
    company: 'Nirman Group',
    photo: '/assets/mentor-3-refined.webp',
  },
  {
    id: 'mentor-4',
    name: 'Ravindra Prabhudesai',
    company: 'Pitambari Products Pvt',
    photo: '/assets/mentor-4-refined.webp',
  },
  {
    id: 'mentor-5',
    name: 'Virendra Pawar',
    company: 'Entrepreneur / Samajsevak',
    photo: '/assets/mentor-5-refined.webp',
  },
  {
    id: 'mentor-6',
    name: 'Dr. Pawan Agrawal',
    company: 'PhD, Mumbai Dabbawala',
    photo: '/assets/mentor-6-refined.webp',
  },
];
