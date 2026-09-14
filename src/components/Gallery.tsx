import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid as LayoutGridIcon, Orbit, X, AlertTriangle, Maximize2, Tag, Calendar, ShieldAlert, Sparkles } from 'lucide-react';
import { LayoutGrid } from './ui/layout-grid';
import { OrbitImages } from './OrbitImages';
import './Gallery.css';

export interface GalleryItemDto {
  id: string;
  image: { url: string; alt: string };
  title: string;
  description: string;
  chapter: string;
  categoryLabel: string;
  badge: string;
  statIcon: string;
  stat: string;
}

export const Gallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<'orbit' | 'grid'>('orbit');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItemDto | null>(null);

  // Archival & Conclave Items including generated event photos
  const galleryItems: GalleryItemDto[] = [
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

  const categories = ['All', 'Events & Expos', 'Press Coverage', 'Awards & Recognition'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.categoryLabel === activeCategory);

  // Body scroll lock during Lightbox
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  // Esc key listener for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="gallery" className="w-full py-16 sm:py-24 bg-[#080E18] text-white border-b border-gray-800 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E27500]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 gap-3 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Moments From Mi Udyojak Honarach
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Archival photographs, press features, and conclave moments from regional business forums. Click any orbiting photo to enlarge.
          </p>
        </div>

        {/* Clean Orbit Carousel Mode */}
        {viewMode === 'orbit' && (
          <div className="w-full py-8 relative flex items-center justify-center min-h-[560px] sm:min-h-[660px] overflow-visible">
            <OrbitImages
              images={galleryItems.map((item) => item.image.url)}
              itemIds={galleryItems.map((item) => item.id)}
              paused={Boolean(selectedItem)}
              shape="ellipse"
              baseWidth={1250}
              radiusX={540}
              radiusY={175}
              rotation={-6}
              duration={38}
              itemSize={180}
              responsive={true}
              showPath={false}
              onImageClick={(idx) => setSelectedItem(galleryItems[idx])}
            />
          </div>
        )}

        {/* Animated Layout Grid Mode */}
        {viewMode === 'grid' && (
          <div className="space-y-8">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#E27500] text-white shadow-lg shadow-[#E27500]/30'
                      : 'bg-white/10 text-gray-300 border border-white/10 hover:border-[#E27500] hover:text-[#FFB783]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* LayoutGrid with masonry-like spans */}
            <LayoutGrid
              cards={filteredItems.map((item, idx) => {
                // Create a masonry-like layout pattern
                const spanPatterns = [
                  'md:col-span-2 md:row-span-2',  // Large hero
                  'md:col-span-1 md:row-span-1',  // Standard
                  'md:col-span-1 md:row-span-1',  // Standard
                  'md:col-span-2 md:row-span-1',  // Wide
                  'md:col-span-1 md:row-span-1',  // Standard
                  'md:col-span-1 md:row-span-2',  // Tall
                  'md:col-span-1 md:row-span-1',  // Standard
                  'md:col-span-1 md:row-span-1',  // Standard
                  'md:col-span-1 md:row-span-1',  // Standard
                ];
                return {
                  id: idx + 1,
                  className: spanPatterns[idx % spanPatterns.length],
                  thumbnail: item.image.url,
                  content: (
                    <div className="text-white space-y-2">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-[#E27500]/30 border border-[#E27500]/50 text-[#FFB783] text-[10px] font-bold uppercase tracking-wider">
                        {item.chapter}
                      </span>
                      <h4 className="text-lg sm:text-xl font-extrabold leading-snug drop-shadow-lg">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-200 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 pt-1 text-[11px] text-gray-300">
                        <Calendar className="w-3 h-3 text-[#E27500]" />
                        <span>{item.stat}</span>
                      </div>
                    </div>
                  ),
                };
              })}
            />
          </div>
        )}

        {/* 60fps Jitter-Free Shared Element Morphing Lightbox Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedItem(null)}
              role="dialog"
              aria-modal="true"
              aria-label={selectedItem.title}
            >
              <motion.div
                layoutId={`gallery-img-${selectedItem.id}`}
                transition={{
                  type: "spring",
                  damping: 28,
                  stiffness: 280,
                  mass: 0.8,
                }}
                className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center bg-[#0B1320] border border-white/15 rounded-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#E27500] text-white transition-colors cursor-pointer backdrop-blur-md"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Main Image Frame */}
                <div className="w-full max-h-[60vh] bg-black/60 flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedItem.image.url}
                    alt={selectedItem.image.alt}
                    className="max-h-[60vh] w-auto max-w-full object-contain"
                  />
                </div>

                {/* Modal Metadata & Caption Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="w-full p-6 sm:p-8 bg-[#0D1829] border-t border-white/10 flex flex-col gap-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#E27500]/20 border border-[#E27500]/40 text-[#FFB783] text-xs font-bold">
                        {selectedItem.categoryLabel}
                      </span>
                      <span className="text-xs font-mono text-gray-400">
                        {selectedItem.chapter}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#E27500]" />
                      <span>{selectedItem.stat}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {selectedItem.description}
                  </p>

                  {/* Footer Credit & Rights Line */}
                  <div className="mt-2 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-amber-300/90 font-mono">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#E27500] shrink-0" />
                    <span>[Pre-launch review archival artifact • Subject to client photo permission item 02-08 / 02-11]</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Gallery;
