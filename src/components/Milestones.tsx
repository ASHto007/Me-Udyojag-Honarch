import { SAMPLE_MILESTONES } from '../data/sampleContent';
import { APPROVED_MILESTONES } from '../data/approvedContent';
import { SectionBackdrop } from './SectionBackdrop';
import React from 'react';
import { Calendar } from 'lucide-react';

export const Milestones: React.FC = () => {
  const timeline = APPROVED_MILESTONES.length ? APPROVED_MILESTONES : SAMPLE_MILESTONES;

  return (
    <section id="achievements" className="section-with-backdrop section-with-backdrop--dark w-full py-20 bg-[#1B2A3A] text-white border-b border-[#0F172A] relative overflow-hidden">
      <SectionBackdrop label="MILESTONES" />
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E27500]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Centered Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Milestones of a Grassroots Journey
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-2">
            The journey of Mi Udyojak Honarach.
          </p>
        </div>

        {!APPROVED_MILESTONES.length && <p className="mb-8 text-center text-xs text-orange-200">Sample timeline for illustration. Dates and milestones are fictional.</p>}
        {/* Horizontally Centered Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {!timeline.length && <p className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-sm text-gray-300">Movement milestones will be published here once confirmed.</p>}
          {/* Spine vertical line: center on desktop (md), left-aligned on mobile */}
          {timeline.length > 0 && <div className="absolute top-4 bottom-4 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#E27500] via-[#E27500]/40 to-[#E27500]/10 pointer-events-none" />}

          {/* Timeline Cards Container */}
          <div className="space-y-8 md:space-y-12">
            {timeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-[#E27500] border-4 border-[#1B2A3A] shadow-md shadow-[#E27500]/50 z-10 transition-transform duration-300 hover:scale-125" />

                  {/* Card Shell */}
                  <div className="w-full pl-10 sm:pl-12 md:pl-0 md:w-[calc(50%-2.5rem)]">
                    <div className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#E27500]/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 backdrop-blur-sm shadow-lg group">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs sm:text-sm font-extrabold text-[#FFB783] tracking-wider uppercase font-mono flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-[#E27500]" />
                          {item.period}
                        </span>
                        <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#E27500]/15 text-[#FFB783] border border-[#E27500]/30">
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#FFB783] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
