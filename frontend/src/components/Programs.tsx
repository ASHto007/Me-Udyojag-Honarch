import { SectionBackdrop } from './SectionBackdrop';
import React from 'react';
import { Network, Megaphone, GraduationCap, Award, Handshake, ArrowRight } from 'lucide-react';
import { LayoutGrid } from './ui/layout-grid';

/* ─── Per-card content overlays communicating What It Is, Who It Is For, Benefit, CTA ─── */

const ServiceOverlay = ({
  num,
  icon: Icon,
  title,
  marathiTitle,
  whatItIs,
  whoItIsFor,
  benefit,
  ctaText = 'Enquire for Service',
}: {
  num: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  marathiTitle: string;
  whatItIs: string;
  whoItIsFor: string;
  benefit: string;
  ctaText?: string;
}) => (
  <div className="text-white space-y-2.5 text-left">
    <div className="flex items-center gap-2 flex-wrap">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#E27500]/30 border border-[#E27500]/50 text-[#FFB783]">
        <Icon className="w-3.5 h-3.5" />
      </span>
      <span className="text-[10px] font-extrabold text-[#FFB783] uppercase tracking-widest">
        SERVICE {num}
      </span>
    </div>

    <div>
      <h3 className="text-lg sm:text-xl font-extrabold leading-snug drop-shadow-md text-white">
        {title}
      </h3>
      <p className="text-xs font-marathi text-[#FFB783] font-semibold mt-0.5">
        {marathiTitle}
      </p>
    </div>

    <div className="space-y-2 text-xs text-gray-200 pt-1">
      <div>
        <span className="font-bold text-[#FFB783] uppercase text-[10px] tracking-wider block">What It Is:</span>
        <p className="leading-relaxed text-gray-300">{whatItIs}</p>
      </div>
      <div>
        <span className="font-bold text-[#FFB783] uppercase text-[10px] tracking-wider block">Who It Is For:</span>
        <p className="leading-relaxed text-gray-300">{whoItIsFor}</p>
      </div>
      <div>
        <span className="font-bold text-[#FFB783] uppercase text-[10px] tracking-wider block">Benefit:</span>
        <p className="leading-relaxed text-gray-300">{benefit}</p>
      </div>
    </div>

    <div className="pt-2">
      <a
        href="#contact"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFB783] hover:text-white transition-colors group"
      >
        <span>{ctaText}</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  </div>
);

import { PROGRAMS_DATA } from '../data/programsData';

const ICONS_MAP = {
  Network,
  Megaphone,
  GraduationCap,
  Award,
  Handshake,
};

/* ─── Card data derived from separated programsData file ─── */
const cards = PROGRAMS_DATA.map((program) => {
  const IconComponent = ICONS_MAP[program.iconName] || Network;
  return {
    id: program.id,
    num: program.num,
    title: program.title,
    marathiTitle: program.marathiTitle,
    className: program.gridSpan,
    thumbnail: program.thumbnail,
    content: (
      <ServiceOverlay
        num={program.num}
        icon={IconComponent}
        title={program.title}
        marathiTitle={program.marathiTitle}
        whatItIs={program.whatItIs}
        whoItIsFor={program.whoItIsFor}
        benefit={program.benefit}
        ctaText={program.ctaText}
      />
    ),
  };
});


/* ─── Section ─── */
export const Programs: React.FC = () => {
  return (
    <section id="programs" className="section-with-backdrop w-full py-16 sm:py-24 bg-[#FCFBF9] border-b border-[#EAEAEA]">
      <SectionBackdrop label="PROGRAMS" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Services &amp; Core Initiatives
          </h2>
          <p className="text-sm sm:text-base text-[#6D6D6D] mt-2">
            Five structured pathways to empower aspiring and emerging entrepreneurs with skills, visibility, and direct business linkages. Click any card to explore.
          </p>
        </div>

        {/* LayoutGrid — masonry layout with animated click-expand */}
        <LayoutGrid cards={cards} />

      </div>
    </section>
  );
};

export default Programs;
