"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

// Inline cn utility
function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

const SPRING = { type: "spring", stiffness: 320, damping: 30, mass: 0.8 } as const;

export const LayoutGrid = ({ cards = [] }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);

  // Lock body scroll when a card is open
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* ── Grid ─────────────────────────────────────────────── */}
      <div
        className="w-full p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-3 sm:gap-4"
        style={{ gridAutoRows: "220px" }}
      >
        {cards.map((card) => (
          <div key={card.id} className={cn(card.className, "min-h-[220px]")}>
            <motion.div
              layoutId={`card-${card.id}`}
              onClick={() => setSelected(card)}
              transition={SPRING}
              className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group"
              style={{ willChange: "transform" }}
            >
              {/* Image */}
              <motion.img
                layoutId={`img-${card.id}`}
                src={card.thumbnail}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center"
                transition={SPRING}
              />

              {/* Hover overlay with content hint */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-xs font-bold text-white/90 uppercase tracking-widest">
                  Click to explore →
                </span>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* ── Lightbox Modal ───────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />

            {/* Expanded card — flies from grid position to centre */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
              <motion.div
                layoutId={`card-${selected.id}`}
                transition={SPRING}
                className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl pointer-events-auto"
                style={{ willChange: "transform" }}
              >
                {/* Expanded image */}
                <motion.img
                  layoutId={`img-${selected.id}`}
                  src={selected.thumbnail}
                  alt=""
                  className="w-full h-64 sm:h-80 object-cover object-center"
                  transition={SPRING}
                />

                {/* Content panel slides up */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.28, ease: "easeOut", delay: 0.08 }}
                  className="bg-[#111827] px-7 py-6"
                >
                  {selected.content}
                </motion.div>

                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-[#E27500] text-white backdrop-blur-md transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LayoutGrid;
