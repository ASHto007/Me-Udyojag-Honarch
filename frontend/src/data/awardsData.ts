/**
 * Verified Awards & Recognitions Data
 * 
 * Formal awards, honors, and recognitions received.
 */

export interface VerifiedAward {
  id: string;                      // Unique ID (e.g., 'award-state-msme-2022')
  name: string;                    // Name of the award
  year: string;                    // Year awarded (e.g., '2022')
  organisation: string;           // Issuing body or institution
  image: string;                   // Award photo or trophy asset (e.g., '/assets/award-1.jpg')
  imageAlt: string;                // Accessible description of the image
  description: string;             // Summary description of the honor
  referenceUrl?: string;           // Optional link to press release or news coverage
}

/**
 * Array of verified awards.
 * Add new award entries inside this array.
 */
export const APPROVED_AWARDS: VerifiedAward[] = [
  /*
  // Example template:
  {
    id: 'award-catalyst-2022',
    name: 'Maharashtra Youth Enterprise Catalyst Honor',
    year: '2022',
    organisation: 'State Chamber of Commerce & Industry',
    image: '/assets/gallery-2.webp',
    imageAlt: 'Maharashtra Youth Enterprise Catalyst Award Ceremony',
    description: 'Recognized for pioneering grassroots entrepreneurship bootcamps across 30+ districts.'
  }
  */
];
