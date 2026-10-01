export interface GalleryItemDto {
  id: string;
  eventId?: string;
  image: { url: string; alt: string };
  title: string;
  description: string;
  chapter: string;
  categoryLabel: string;
  badge: string;
  statIcon: string;
  stat: string;
}

export const GALLERY_ITEMS: GalleryItemDto[] = [
    {
      id: 'summit-keynote',
      image: {
        url: '/assets/orbit-1.jpg',
        alt: 'Global Business Summit Keynote Address'
      },
      title: 'Global India Business Summit Keynote',
      description: 'Visionary address on building resilient, future-ready grassroots enterprise networks.',
      chapter: 'FLAGSHIP CONCLAVE',
      categoryLabel: 'Events & Expos',
      badge: 'Keynote Session',
      statIcon: 'calendar',
      stat: 'Grand Ballroom • Annual Summit'
    },
    {
      id: 'startup-felicitation',
      image: {
        url: '/assets/orbit-2.jpg',
        alt: 'Indian Startup Founder Felicitation Ceremony'
      },
      title: 'Founder Felicitation & Honors',
      description: 'Recognizing trailblazing startup founders and emerging regional manufacturing pioneers.',
      chapter: 'HONOR & MERIT',
      categoryLabel: 'Awards & Recognition',
      badge: 'Felicitation 2024',
      statIcon: 'award',
      stat: 'State Innovation Forum'
    },
    {
      id: 'masterclass-workshop',
      image: {
        url: '/assets/orbit-3.jpg',
        alt: 'Entrepreneurship Strategy & Growth Masterclass'
      },
      title: 'Venture Scaling Masterclass',
      description: 'Hands-on cohort strategy workshop covering business model refinement and market traction.',
      chapter: 'DISTRICT WORKSHOP',
      categoryLabel: 'Events & Expos',
      badge: 'Masterclass',
      statIcon: 'map-pin',
      stat: 'Incubation Hub • Pune'
    },
    {
      id: 'leadership-panel',
      image: {
        url: '/assets/orbit-4.jpg',
        alt: 'Executive Leadership & MSME Policy Forum'
      },
      title: 'Industry Leaders Roundtable',
      description: 'High-level dialogue on supply chain resilience, MSME credit lines, and policy reforms.',
      chapter: 'MEDIA DISPATCH',
      categoryLabel: 'Press Coverage',
      badge: 'Panel Forum',
      statIcon: 'newspaper',
      stat: 'Global Leadership Conclave'
    },
    {
      id: 'gmec-2018',
      image: {
        url: '/assets/hero-workshop.jpg',
        alt: 'GMEC 2018 Conclave at Taj Mahal Palace, Mumbai'
      },
      title: 'Global Marathi Entrepreneurship Conclave',
      description: 'Founding symposium convening regional industrialists, trade delegates, and aspiring business pioneers.',
      chapter: 'FLAGSHIP CONCLAVE',
      categoryLabel: 'Events & Expos',
      badge: 'Conclave 2018',
      statIcon: 'calendar',
      stat: 'Taj Mahal Palace • Oct 2018'
    },
    {
      id: 'event-poster',
      image: {
        url: '/assets/gallery-1.jpg',
        alt: 'Statewide Entrepreneurship Seminar & Workshop Collateral'
      },
      title: 'Statewide Entrepreneurship Seminar Series',
      description: 'Educational forum and curriculum sessions covering manufacturing, market linkage, and project finance.',
      chapter: 'DISTRICT WORKSHOP',
      categoryLabel: 'Events & Expos',
      badge: 'Seminar Series',
      statIcon: 'map-pin',
      stat: 'Regional Expo Hub'
    },
    {
      id: 'press-clipping-1',
      image: {
        url: '/assets/gallery-4.jpg',
        alt: 'State Newspaper Feature on Grassroots Enterprise Development'
      },
      title: 'State Press Coverage — Grassroots Enterprise',
      description: 'Regional print feature reporting on entrepreneurial mindset programs and cluster mentoring.',
      chapter: 'MEDIA DISPATCH',
      categoryLabel: 'Press Coverage',
      badge: 'Print Feature',
      statIcon: 'newspaper',
      stat: 'Regional Dailies'
    },
    {
      id: 'press-clipping-2',
      image: {
        url: '/assets/gallery-5.jpg',
        alt: 'Editorial Spotlight on Regional MSME Development'
      },
      title: 'Editorial Spotlight — Industrial Growth',
      description: 'Media coverage analyzing regional MSME expansion pathways and business incubator support.',
      chapter: 'MEDIA DISPATCH',
      categoryLabel: 'Press Coverage',
      badge: 'Editorial',
      statIcon: 'newspaper',
      stat: 'State Circulation'
    },
    {
      id: 'award-photo',
      image: {
        url: '/assets/gallery-2.jpg',
        alt: 'State Enterprise Felicitation and Leadership Ceremony'
      },
      title: 'Enterprise Leadership Felicitation',
      description: 'Ceremony honoring grassroots business achievers and visionary enterprise builders.',
      chapter: 'HONOR & MERIT',
      categoryLabel: 'Awards & Recognition',
      badge: 'Felicitation',
      statIcon: 'award',
      stat: 'State Honors'
    }
  ];

export const getEventPhotos = (eventId: string, items: GalleryItemDto[] = GALLERY_ITEMS) => items.filter(item => item.eventId === eventId);
export const hasEventPhotos = (eventId: string) => getEventPhotos(eventId).length > 0;
