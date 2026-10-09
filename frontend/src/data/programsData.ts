/**
 * Core Programs & Services Data
 * 
 * Five structured initiatives to empower aspiring and emerging entrepreneurs across Maharashtra.
 * Updated with authentic event assets and rich, complete service metadata.
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
  highlights: string[];
  thumbnail: string;
  ctaText: string;
  ctaLink?: string;
}

export const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: 1,
    num: '01',
    iconName: 'Network',
    title: 'Networking Events & Forums',
    marathiTitle: 'व्यावसायिक नेटवर्किंग आणि परिसंवाद',
    thumbnail: '/assets/gallery-1.webp',
    whatItIs: 'High-impact district conclaves, B2B exchange roundtables, and monthly entrepreneur meetups across Maharashtra.',
    whoItIsFor: 'Aspiring entrepreneurs, early-stage founders, and established MSME leaders seeking peer connections.',
    benefit: 'Direct introductions, peer collaboration, and strategic regional supply chain partnerships.',
    highlights: [
      'Active district chapters in Mumbai, Pune, Nashik & Chh. Sambhajinagar',
      'Structured B2B matchmaking & peer referral circles',
      'Founder roundtables with veteran industry leaders'
    ],
    ctaText: 'Join Networking Forum',
    ctaLink: '#contact'
  },
  {
    id: 2,
    num: '02',
    iconName: 'Megaphone',
    title: 'Business Promotion & Visibility',
    marathiTitle: 'व्यवसाय प्रसिद्धी आणि व्यासपीठ',
    thumbnail: '/assets/orbit-1.webp',
    whatItIs: 'Curated trade exhibitions, product showcases, social video spotlights, and verified business directory features.',
    whoItIsFor: 'Homegrown producers, agro-processors, D2C brands, and regional manufacturers scaling statewide.',
    benefit: 'Statewide commercial visibility, customer acquisition, and enhanced brand credibility.',
    highlights: [
      'Commercial stalls & product showcases at flagship annual conclaves',
      'Digital video spotlights reaching 100K+ Maharashtra community',
      'Verified listing in the Marathi Udyojak Business Directory'
    ],
    ctaText: 'Promote Your Business',
    ctaLink: '#contact'
  },
  {
    id: 3,
    num: '03',
    iconName: 'GraduationCap',
    title: '1-on-1 Mentorship & Advisory',
    marathiTitle: 'अनुभवी उद्योजकांचे मार्गदर्शन',
    thumbnail: '/assets/orbit-3.webp',
    whatItIs: 'Personalized guidance from veteran industrialists in shop-floor operations, capital subsidies, and modern distribution.',
    whoItIsFor: 'First-generation entrepreneurs with business ideas and growth-stage manufacturers facing operational bottlenecks.',
    benefit: 'Practical insights that reduce startup errors, streamline working capital, and accelerate scale.',
    highlights: [
      'Direct advisory from 20+ years experienced industry titans',
      'Working capital syndication, CGTMSE loans & subsidy roadmap',
      'Lean manufacturing, factory compliance & distribution scaling'
    ],
    ctaText: 'Connect with a Mentor',
    ctaLink: '#mentors'
  },
  {
    id: 4,
    num: '04',
    iconName: 'Award',
    title: 'Awards & Grassroots Recognition',
    marathiTitle: 'उद्योजक सन्मान आणि पुरस्कार',
    thumbnail: '/assets/hero-award-refined.webp',
    whatItIs: 'Felicitation programs and prestigious honors celebrating verified grassroots milestones and innovative manufacturers.',
    whoItIsFor: 'Resilient manufacturers, innovative startup creators, women entrepreneurs, and community enterprise builders.',
    benefit: 'Third-party credibility, prominent media recognition, and inspiring regional role-model visibility.',
    highlights: [
      'Felicitation on stage at the National Stock Exchange (NSE) Conclave',
      'Regional print media dispatch and video documentary coverage',
      'Inspirational entrepreneur case study featured in movement archives'
    ],
    ctaText: 'Learn About Honors',
    ctaLink: '#contact'
  },
  {
    id: 5,
    num: '05',
    iconName: 'Handshake',
    title: 'Institutional Collaborations',
    marathiTitle: 'संस्थात्मक आणि व्यावसायिक सहयोग',
    thumbnail: '/assets/orbit-4.webp',
    whatItIs: 'Strategic alliances bridging local entrepreneurs with industry associations, chambers of commerce, and institutional partners.',
    whoItIsFor: 'Growing enterprises seeking institutional tie-ups, B2B procurement links, and shared infrastructure.',
    benefit: 'High-leverage relationships, commercial joint ventures, and sustainable long-term scale.',
    highlights: [
      'Direct linkage with trade bodies & corporate vendor onboarding desks',
      'Collaborative export consortia, shared logistics & warehousing',
      'MoU frameworks for sustainable inter-enterprise regional trade'
    ],
    ctaText: 'Explore Collaborations',
    ctaLink: '#contact'
  }
];
