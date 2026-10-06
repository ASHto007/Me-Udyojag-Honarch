"use client";
import React, { useState, useId } from "react";
import { motion } from "motion/react";
import { Modal } from "./Modal";
import { X } from "lucide-react";

// Inline cn utility
function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

export type Card = {
  id: number;
  num?: string;
  title?: string;
  marathiTitle?: string;
  content: React.ReactNode;
  className: string;
  thumbnail: string;
};

const SPRING = { type: "spring", stiffness: 320, damping: 30, mass: 0.8 } as const;

export const LayoutGrid = ({ cards = [] }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const titleId = useId();
  const handleCardClick = (card: Card) => setSelected(card);

  return (
    <>
      {/* ── Grid ─────────────────────────────────────────────── */}
      <div
        className="w-full p-2 sm:p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 sm:gap-5"
        style={{ gridAutoRows: "230px" }}
      >
        {cards.map((card) => (
          <div key={card.id} className={cn(card.className, "min-h-[230px]")}>
            <motion.button
              type="button"
              layoutId={`card-${card.id}`}
              onClick={() => handleCardClick(card)}
              transition={SPRING}
              className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group text-left p-0 border border-gray-200/90 shadow-sm hover:shadow-md hover:border-[#E27500]/60 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#E27500] focus-visible:ring-offset-2 block bg-gray-900 transition-all duration-300"
              style={{ willChange: "transform" }}
              aria-haspopup="dialog"
              aria-expanded={selected?.id === card.id}
              aria-label={`Service ${card.num || card.id}: ${card.title || 'Explore service details'}`}
            >
              {/* Background Photograph */}
              <motion.img
                layoutId={`img-${card.id}`}
                src={card.thumbnail}
                alt={card.title || "Service illustration"}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                transition={SPRING}
              />

              {/* Restrained theme-colored gradient for permanent legibility without requiring hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/60 to-black/20 pointer-events-none" />

              {/* Permanent Header Badge */}
              <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#E27500] text-white shadow-xs">
                  Service {card.num || `0${card.id}`}
                </span>
              </div>

              {/* Permanent Bottom Caption Area */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 flex flex-col justify-end text-white pointer-events-none">
                {card.marathiTitle && (
                  <span className="text-[11px] sm:text-xs font-marathi text-[#FFB783] font-semibold mb-1 drop-shadow-xs line-clamp-1">
                    {card.marathiTitle}
                  </span>
                )}
                <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug drop-shadow-sm line-clamp-2">
                  {card.title}
                </h3>
              </div>
            </motion.button>
          </div>
        ))}
      </div>

      {/* ── Accessible Detail Lightbox Modal ──────────────────── */}
      {selected && (
        <Modal onClose={() => setSelected(null)} labelledBy={titleId}
          className="bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <h2 id={titleId} className="sr-only">{selected.title || 'Service Details'}</h2>
              <motion.div
                layoutId={`card-${selected.id}`}
                transition={SPRING}
                className="relative w-full max-w-2xl rounded-3xl overflow-y-auto shadow-2xl pointer-events-auto bg-[#111827] border border-white/15 max-h-[90dvh] flex flex-col"
                style={{ willChange: "transform" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Expanded Image */}
                <div className="relative w-full h-[min(14rem,30dvh)] sm:h-[min(18rem,35dvh)] shrink-0 overflow-hidden bg-black">
                  <motion.img
                    layoutId={`img-${selected.id}`}
                    src={selected.thumbnail}
                    alt={selected.title || ""}
                    className="w-full h-full object-cover object-center"
                    transition={SPRING}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent pointer-events-none" />
                  
                  {/* Close button with focus visible */}
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    aria-label="Close dialog"
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-[#E27500] text-white backdrop-blur-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27500]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content Panel */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="px-6 sm:px-8 py-6" onClick={(event) => { if ((event.target as HTMLElement).closest('a[href^="#"]')) setSelected(null); }}
                >
                  {selected.content}
                </motion.div>
              </motion.div>
        </Modal>
      )}
    </>
  );
};

export default LayoutGrid;
