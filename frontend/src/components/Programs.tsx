import { SectionBackdrop } from './SectionBackdrop';
import React, { useRef } from 'react';
import {
  Network,
  Megaphone,
  GraduationCap,
  Award,
  Handshake,
  ArrowRight,
  CheckCircle2,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PROGRAMS_DATA, type ProgramItem } from '../data/programsData';

const ICONS_MAP = {
  Network,
  Megaphone,
  GraduationCap,
  Award,
  Handshake,
};

interface ServiceCardProps {
  program: ProgramItem;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ program, className = '' }) => {
  const IconComponent = ICONS_MAP[program.iconName] || Network;

  return (
    <article
      className={`group relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-xs hover:shadow-xl hover:border-[#E27500]/60 transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* ── Top Visual Header ─────────────────────────────────────── */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-gray-900 shrink-0">
        <img
          src={program.thumbnail}
          alt={program.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Gradient Overlay for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/65 to-black/30 pointer-events-none" />

        {/* Floating Service Badge & Icon */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#E27500] text-white shadow-xs">
            Service {program.num}
          </span>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[#FFB783]">
            <IconComponent className="w-4 h-4" />
          </span>
        </div>

        {/* Overlaid Title on Image Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 text-white pointer-events-none">
          {program.marathiTitle && (
            <span className="text-xs font-marathi text-[#FFB783] font-bold block mb-0.5 drop-shadow-xs">
              {program.marathiTitle}
            </span>
          )}
          <h3 className="text-base sm:text-lg font-extrabold leading-snug drop-shadow-sm text-white">
            {program.title}
          </h3>
        </div>
      </div>

      {/* ── Card Body Content ─────────────────────────────────────── */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-3.5">
          {/* What It Is Description */}
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            {program.whatItIs}
          </p>

          {/* Who It Is For Pill */}
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-orange-50/70 border border-orange-200/50">
            <Users className="w-3.5 h-3.5 text-[#E27500] shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B45309] block">
                Target Audience:
              </span>
              <p className="text-[11px] sm:text-xs text-gray-700 leading-snug font-medium">
                {program.whoItIsFor}
              </p>
            </div>
          </div>

          {/* Key Offerings / Highlights */}
          <div className="space-y-2 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
              Key Deliverables &amp; Benefits:
            </span>
            <ul className="space-y-1.5" role="list">
              {program.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E27500] shrink-0 mt-0.5" />
                  <span className="leading-snug">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Card Footer Action ──────────────────────────────────── */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <a
            href={program.ctaLink || '#contact'}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#E27500] hover:text-[#c46500] transition-colors group/cta"
          >
            <span>{program.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </article>
  );
};

export const Programs: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="programs" className="section-with-backdrop w-full py-16 sm:py-24 bg-[#FCFBF9] border-b border-[#EAEAEA] overflow-hidden">
      <SectionBackdrop label="SERVICES" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-[#E27500]">
              CORE INITIATIVES &amp; SUPPORT
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">
              Services &amp; Core Initiatives
            </h2>
            <p className="text-sm sm:text-base text-[#6D6D6D] leading-relaxed">
              Five structured, high-impact pathways designed to empower Maharashtra's first-generation entrepreneurs with peer linkages, brand visibility, and practical industry advisory.
            </p>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Scroll services left"
              className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-[#E27500] hover:text-white hover:border-[#E27500] text-gray-700 flex items-center justify-center transition-all shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27500]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Scroll services right"
              className="w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-[#E27500] hover:text-white hover:border-[#E27500] text-gray-700 flex items-center justify-center transition-all shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27500]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Horizontal Scroll Track ──────────────────────────────── */}
        <div
          ref={scrollRef}
          tabIndex={0}
          role="region"
          aria-label="Services and initiatives carousel"
          className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 pt-1 px-1 -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27500] rounded-2xl"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {PROGRAMS_DATA.map((program) => (
            <ServiceCard
              key={program.id}
              program={program}
              className="w-[300px] sm:w-[350px] md:w-[380px] shrink-0 snap-start"
            />
          ))}
        </div>

        {/* Scroll Helper Hint */}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-2 px-1">
          <span>← Swipe horizontally to explore all 5 services →</span>
          <span>5 Core Initiatives</span>
        </div>

      </div>
    </section>
  );
};

export default Programs;
