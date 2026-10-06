import { APPROVED_MILESTONES } from '../data/milestonesData';
import { SectionBackdrop } from './SectionBackdrop';
import React from 'react';
import { Calendar, MapPin, Users, Building, Flag, ArrowRight } from 'lucide-react';

export const Milestones: React.FC = () => {
  const timeline = [...APPROVED_MILESTONES].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <section id="achievements" className="section-with-backdrop section-with-backdrop--dark w-full py-16 sm:py-24 bg-[#1B2A3A] text-white border-b border-[#0F172A] relative overflow-hidden">
      <SectionBackdrop label="MILESTONES" />
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E27500]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Centered Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FFB783] mb-2">
            CHRONOLOGICAL EXPANSION
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Milestones of a Grassroots Journey
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-2">
            Key chapters and regional gatherings in the evolution of Mi Udyojak Honarach across Maharashtra.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-5xl mx-auto">
          {timeline.length > 0 ? (
            <>
              {/* Spine vertical line: center on desktop (md), left-aligned on mobile */}
              <div className="absolute top-4 bottom-4 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#E27500] via-[#E27500]/40 to-[#E27500]/10 pointer-events-none" />

              {/* Timeline Cards Container */}
              <div className="space-y-8 md:space-y-12">
                {timeline.map((item, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div
                      key={item.id}
                      className={`relative flex flex-col md:flex-row items-start md:items-center ${
                        isEven ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-[#E27500] border-4 border-[#1B2A3A] shadow-md shadow-[#E27500]/50 z-10 transition-transform duration-300 hover:scale-125" />

                      {/* Card Shell */}
                      <div className="w-full pl-10 sm:pl-12 md:pl-0 md:w-[calc(50%-2.5rem)]">
                        <article className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#E27500]/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 backdrop-blur-xs shadow-lg group">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <span className="text-xs sm:text-sm font-extrabold text-[#FFB783] tracking-wider uppercase font-mono flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-[#E27500]" />
                              <time dateTime={item.date}>{item.period || item.date}</time>
                            </span>
                            {item.badge && (
                              <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#E27500]/15 text-[#FFB783] border border-[#E27500]/30">
                                {item.badge}
                              </span>
                            )}
                          </div>

                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.imageAlt || item.title}
                              loading="lazy"
                              decoding="async"
                              width={600}
                              height={400}
                              className="mb-4 aspect-[3/2] w-full rounded-xl object-cover border border-white/10"
                            />
                          )}

                          {item.location && (
                            <p className="mb-1 text-xs text-gray-300 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#E27500]" />
                              <span>{item.location}</span>
                            </p>
                          )}

                          {item.activity && (
                            <p className="mb-2 text-xs font-semibold text-[#FFB783]">
                              {item.activity}
                            </p>
                          )}

                          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#FFB783] transition-colors">
                            {item.title}
                          </h3>

                          <p className="text-sm text-gray-300 leading-relaxed">
                            {item.desc}
                          </p>

                          {/* Verified statistics pill row */}
                          <dl className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-4 text-xs text-gray-300">
                            {item.peopleReached !== undefined && (
                              <div className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-[#E27500]" />
                                <span><strong className="text-white">{item.peopleReached.toLocaleString('en-IN')}</strong> participants</span>
                              </div>
                            )}
                            {item.businessesReached !== undefined && (
                              <div className="flex items-center gap-1.5">
                                <Building className="w-3.5 h-3.5 text-[#E27500]" />
                                <span><strong className="text-white">{item.businessesReached.toLocaleString('en-IN')}</strong> enterprises</span>
                              </div>
                            )}
                            {item.verifiedStatistics?.map((stat) => (
                              <div key={stat.label} className="bg-white/5 px-2 py-0.5 rounded border border-white/10">
                                <dt className="inline text-gray-400">{stat.label}: </dt>
                                <dd className="inline font-bold text-white">{stat.value}</dd>
                              </div>
                            ))}
                          </dl>
                        </article>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* Clean Data-Ready State */
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-[#E27500]/20 text-[#FFB783] mx-auto flex items-center justify-center border border-[#E27500]/30">
                <Flag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Archival Movement Timeline
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                From foundational district business circles to statewide industrial conclaves, the verified timeline of Mi Udyojak Honarach records each milestone with confirmed dates, venues, and grassroots attendance figures.
              </p>
              <div className="pt-2">
                <a
                  href="#gallery"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFB783] hover:text-white transition-colors"
                >
                  <span>Explore Archival Moments in Gallery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Milestones;
