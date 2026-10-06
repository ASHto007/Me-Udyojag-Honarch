/**
 * Core Programs & Services Data
 * 
 * Five structured initiatives to empower aspiring and emerging entrepreneurs.
 * Add or edit programs and their details here without touching the UI component.
 */

export interface ProgramItem {
  id: number;
  num: string;
  iconName: 'Network' | 'Megaphone' | 'GraduationCap' | 'Award' | 'Handshake';
  title: string;
  marathiTitle: string;
  whatItIs: string;
  whoItIsFor: string;
  benefit: string;
  ctaText?: string;
  thumbnail: string;
  gridSpan: string;
}

export const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: 1,
    num: '01',
    iconName: 'Network',
    title: 'Networking Events & Forums',
    marathiTitle: 'व्यावसायिक नेटवर्किंग आणि परिसंवाद',
    gridSpan: 'md:col-span-2 md:row-span-2',
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80&fit=crop',
    whatItIs: 'High-impact district meetups, business conclaves, and founder networking roundtables across Maharashtra.',
    whoItIsFor: 'Aspiring entrepreneurs, early-stage founders, and established MSME leaders seeking peer connections.',
    benefit: 'Direct introductions, peer collaboration, and strategic regional supply chain partnerships.',
    ctaText: 'Join Networking Forum'
  },
  {
    id: 2,
    num: '02',
    iconName: 'Megaphone',
    title: 'Business Promotion',
    marathiTitle: 'व्यवसाय प्रसिद्धी आणि व्यासपीठ',
    gridSpan: 'md:col-span-1 md:row-span-1',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80&fit=crop',
    whatItIs: 'Curated exhibitions, product showcases, digital directories, and business feature spotlights.',
    whoItIsFor: 'Homegrown producers, artisans, and regional brands aiming to scale their customer reach.',
    benefit: 'Statewide commercial visibility, direct consumer access, and customer acquisition.',
    ctaText: 'Enquire for Promotion'
  },
  {
    id: 3,
    num: '03',
    iconName: 'GraduationCap',
    title: 'Mentorship',
    marathiTitle: 'अनुभवी उद्योजकांचे मार्गदर्शन',
    gridSpan: 'md:col-span-1 md:row-span-1',
    thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80&fit=crop',
    whatItIs: 'Structured guidance from experienced industry veterans in operations, finance, and marketing.',
    whoItIsFor: 'First-generation business creators needing realistic problem-solving and strategic advisory.',
    benefit: 'Practical insights that reduce startup errors, streamline cash-flow, and accelerate growth.',
    ctaText: 'Connect with a Mentor'
  },
  {
    id: 4,
    num: '04',
    iconName: 'Award',
    title: 'Awards & Recognition',
    marathiTitle: 'उद्योजक सन्मान आणि पुरस्कार',
    gridSpan: 'md:col-span-1 md:row-span-1',
    thumbnail: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80&fit=crop',
    whatItIs: 'Felicitation programs and honors celebrating verified grassroots entrepreneurial achievements.',
    whoItIsFor: 'Standout business innovators, resilient manufacturers, and community enterprise creators.',
    benefit: 'Third-party credibility, industry recognition, and inspiring regional role-model visibility.',
    ctaText: 'Learn About Honors'
  },
  {
    id: 5,
    num: '05',
    iconName: 'Handshake',
    title: 'Collaborations',
    marathiTitle: 'संस्थात्मक आणि व्यावसायिक सहयोग',
    gridSpan: 'md:col-span-2 md:row-span-1',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&q=80&fit=crop',
    whatItIs: 'Strategic alliances bridging local entrepreneurs with industry associations and institutional partners.',
    whoItIsFor: 'Enterprises seeking institutional tie-ups, B2B procurement links, and shared infrastructure.',
    benefit: 'High-leverage relationships, commercial joint ventures, and sustainable long-term scale.',
    ctaText: 'Explore Collaborations'
  }
];
