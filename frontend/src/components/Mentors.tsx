import { SectionBackdrop } from './SectionBackdrop';
import React from 'react';
import { Award, Briefcase, ExternalLink, ArrowRight, UserCheck } from 'lucide-react';
import { APPROVED_MENTORS } from '../data/mentorsData';

export const Mentors: React.FC = () => {
  const mentorsList = APPROVED_MENTORS;

  return (
    <section id="mentors" className="section-with-backdrop section-with-backdrop--dark w-full py-16 sm:py-24 bg-[#080E18] text-white border-b border-gray-800 relative overflow-hidden">
      <SectionBackdrop label="MENTORS" />
      {/* Background glow accents - subtle brand accent, not neon */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E27500]/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 gap-3 max-w-3xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FFB783]">
            LEADERSHIP ECOSYSTEM
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Mentors &amp; Guidance
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mt-1">
            Learn directly from seasoned entrepreneurs and industry veterans across Maharashtra in business operations, finance, marketing, and technology.
          </p>
        </div>

        {/* Mentor Cards / Clean Data-Ready State */}
        {mentorsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {mentorsList.map((mentor, index) => {
              const variant = index % 3;
              // Variation 0: Prominent card with emphasis on company & expertise
              // Variation 1: Vertical card with top photo & prominent experience badge
              // Variation 2: Editorial card with bio highlight and social links
              return (
                <article
                  key={mentor.id}
                  className={`rounded-3xl border border-[#1e2f4a] bg-[#0D1829] overflow-hidden flex flex-col justify-between shadow-xl shadow-black/30 transition-all duration-300 hover:border-[#E27500]/40 hover:-translate-y-1 ${
                    variant === 0 ? 'lg:col-span-1 border-t-2 border-t-[#E27500]' : ''
                  }`}
                >
                  <div>
                    {/* Photo with subtle variation */}
                    <div className={`relative w-full overflow-hidden bg-[#0B1320] ${
                      variant === 2 ? 'aspect-[4/3]' : 'aspect-[3/2] sm:aspect-[4/3]'
                    }`}>
                      <img
                        src={mentor.photo || mentor.image}
                        alt={mentor.photoAlt || `${mentor.name} — ${mentor.designation}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1829] via-transparent to-transparent opacity-80" />

                      {mentor.yearsExperience && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#E27500]/90 text-white text-[11px] font-bold shadow-md shadow-black/40">
                          {mentor.yearsExperience} Exp
                        </div>
                      )}
                    </div>

                    {/* Metadata & Bio */}
                    <div className="p-6 sm:p-7 space-y-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#FFB783] font-semibold mb-1">
                          <Award className="w-3.5 h-3.5 text-[#E27500]" />
                          <span>{mentor.designation || mentor.role}</span>
                        </div>
                        <h3 className={`font-extrabold text-white leading-tight ${variant === 0 ? 'text-2xl' : 'text-xl'}`}>
                          {mentor.name}
                        </h3>
                        {(mentor.company || mentor.organisation) && (
                          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5 font-medium">
                            <Briefcase className="w-3 h-3 text-[#E27500]" />
                            <span>{mentor.company || mentor.organisation}</span>
                          </p>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pt-1">
                        {mentor.shortBio || mentor.description}
                      </p>

                      {/* Area of Expertise Tags */}
                      {mentor.expertise && mentor.expertise.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {mentor.expertise.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Social / External Links Footer */}
                  {(mentor.linkedInUrl || mentor.socialUrl) && (
                    <div className="p-6 pt-0 mt-2 flex items-center gap-3 border-t border-white/5 pt-4">
                      {mentor.linkedInUrl && (
                        <a
                          href={mentor.linkedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFB783] hover:text-white transition-colors"
                          aria-label={`View ${mentor.name}'s LinkedIn profile`}
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.62-1.63-1.62Z"/></svg>
                          <span>LinkedIn</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {mentor.socialUrl && (
                        <a
                          href={mentor.socialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                          aria-label={`View ${mentor.name}'s profile`}
                        >
                          <span>Profile</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          /* Clean Data-Ready State */
          <div className="max-w-3xl mx-auto rounded-3xl border border-[#1e2f4a] bg-[#0D1829] p-8 sm:p-12 text-center shadow-xl shadow-black/30 space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-[#E27500]/15 text-[#FFB783] mx-auto flex items-center justify-center border border-[#E27500]/30">
              <UserCheck className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#FFB783] bg-[#E27500]/15 px-3 py-1 rounded-full border border-[#E27500]/30">
                DISTRICT MENTORSHIP PROGRAM
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-3">
                Seasoned Guidance for Maharashtra's Next Generation
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl mx-auto mt-2">
                Our mentor network brings together industry leaders, veteran manufacturers, and domain specialists across Maharashtra districts. Verified mentor profiles for upcoming cohorts will be featured here following formal onboardings.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#E27500] hover:bg-[#c96800] text-white px-6 py-3 rounded-full text-xs font-bold tracking-wide transition-all shadow-md group"
              >
                <span>Join as a Mentor or Advisor</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Mentors;
