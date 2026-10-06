/**
 * Founder Vision & Leadership Data
 * 
 * Central data for Nilesh More (Founder & Convener).
 */

export interface FounderPillar {
  num: string;
  title: string;
  description?: string;
}

export interface FounderProfile {
  name: string;
  marathiName: string;
  role: string;
  organization: string;
  photo: string;
  bio: string;
  quote: string;
  paragraphs: string[];
  pillars: FounderPillar[];
}

export const FOUNDER_QUOTE: string | null = null;

export const FOUNDER_DATA: FounderProfile = {
  name: 'Nilesh More',
  marathiName: 'निलेश मोरे',
  role: 'Founder & Convener',
  organization: 'Mi Udyojak Honarach',
  photo: '/assets/nilesh-more.jpg',
  bio: 'Entrepreneur, Educator & Community Builder empowering first-generation business creators across Maharashtra.',
  quote: 'Mi Udyojak Honarach is not merely a declaration; it is the beginning of an entrepreneurial journey.',
  paragraphs: [
    'The initiative was created to transform entrepreneurial ambition into action. It aims to give young people confidence, determination and inspiration by connecting them with successful and experienced entrepreneurs, enabling practical learning, guidance and meaningful professional relationships.',
    'Through grassroot seminars, district meetups, and enterprise bootcamps across Maharashtra, the movement nurtures an ecosystem where every aspiring individual finds the confidence to declare: मी उद्योजक होणारच!'
  ],
  pillars: [
    { num: 'Pillar 01', title: 'Confidence & Mindset' },
    { num: 'Pillar 02', title: 'Practical Guidance' },
    { num: 'Pillar 03', title: 'High-Value Networks' }
  ]
};
