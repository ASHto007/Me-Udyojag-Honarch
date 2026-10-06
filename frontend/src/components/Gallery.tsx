import { SectionBackdrop } from './SectionBackdrop';
import { GALLERY_ITEMS, type GalleryItemDto } from '../data/galleryData';
import { EVENTS_DATA } from '../data/eventsData';
import React, { useState, useId, useEffect } from 'react';
import { motion } from 'motion/react';
import { Modal } from './ui/Modal';
import { X, Calendar } from 'lucide-react';
import { OrbitImages } from './OrbitImages';
import './Gallery.css';

export const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItemDto | null>(null);

  // Archival & Conclave Items including generated event photos


  const [eventFilter, setEventFilter] = useState<string | null>(() => new URLSearchParams(location.search).get('galleryEvent'));
  useEffect(() => {
    const sync = () => setEventFilter(new URLSearchParams(location.search).get('galleryEvent'));
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => { window.removeEventListener('popstate', sync); window.removeEventListener('hashchange', sync); };
  }, []);
  const selectedEvent = EVENTS_DATA.find(event => event.id === eventFilter && GALLERY_ITEMS.some(item => item.eventId === event.id));
  const galleryItems = selectedEvent ? GALLERY_ITEMS.filter(item => item.eventId === selectedEvent.id) : GALLERY_ITEMS;
  const showAll = () => {
    const url = new URL(location.href);
    url.searchParams.delete('galleryEvent');
    history.replaceState(null, '', url);
    setEventFilter(null);
  };
  const titleId = useId();
  const descriptionId = useId();
  const handleOpenLightbox = (item: GalleryItemDto) => setSelectedItem(item);

  return (
    <section id="gallery" className="section-with-backdrop section-with-backdrop--dark w-full py-12 sm:py-16 bg-[#080E18] text-white border-b border-gray-800 relative overflow-hidden">
      <SectionBackdrop label="GALLERY" />
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E27500]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6 gap-2 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Moments From Mi Udyojak Honarach
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Archival photographs, press features, and conclave moments from regional business forums. Click any photograph to enlarge.
          </p>
        </div>
      </div>

      {selectedEvent && (
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 px-4 pb-4" role="status">
          <span>{selectedEvent.title}</span>
          <button type="button" onClick={showAll} className="min-h-11 rounded-full border border-white/30 px-4 text-sm focus-visible:outline-2 focus-visible:outline-[#E27500]">All photographs</button>
        </div>
      )}
      {/* Clean Orbit Carousel Mode (Full-Screen Viewport Width Edge-to-Edge) */}
      <div className="w-full relative z-10 overflow-x-clip py-2">
        <OrbitImages
          key={selectedEvent?.id ?? "all"}
          items={galleryItems}
          onOpenLightbox={handleOpenLightbox}
          isLightboxOpen={Boolean(selectedItem)}
        />
      </div>

      {/* Shared Element Morphing Lightbox Modal */}
{selectedItem && (
          <Modal onClose={() => setSelectedItem(null)} labelledBy={titleId} describedBy={descriptionId}
            className="bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
            <motion.div
              layoutId={`gallery-img-${selectedItem.id}`}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 280,
                mass: 0.8,
              }}
              className="relative max-w-4xl w-full max-h-[92dvh] flex flex-col items-center bg-[#0B1320] border border-white/15 rounded-3xl overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#E27500] text-white transition-colors cursor-pointer backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27500]"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main Image Frame */}
              <div className="w-full shrink-0 max-h-[60dvh] bg-black/60 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedItem.image.url}
                  alt={selectedItem.image.alt}
                  className="max-h-[60dvh] w-auto max-w-full object-contain"
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

                <h3 id={titleId} className="text-xl sm:text-2xl font-extrabold text-white">
                  {selectedItem.title}
                </h3>
                <p id={descriptionId} className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Footer Credit & Rights Line */}
                <div className="mt-2 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E27500]" />
                  <span>Official Mi Udyojak Honarach Movement Archive</span>
                </div>
              </motion.div>
            </motion.div>
          </Modal>
        )}
</section>
  );
};

export default Gallery;
