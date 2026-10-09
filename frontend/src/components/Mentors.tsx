import { SectionBackdrop } from './SectionBackdrop';
import React from 'react';
import { ArrowRight, UserCheck } from 'lucide-react';
import { APPROVED_MENTORS } from '../data/mentorsData';
import AccordionGallery, { type MentorGalleryItem } from './AccordionGallery';

export const Mentors: React.FC = () => {
  const mentorsList = APPROVED_MENTORS;
  const galleryItems: MentorGalleryItem[] = mentorsList.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.company || m.designation || m.role || 'Enterprise Mentor',
    tag: m.tag || 'Industry Leader',
    experience: m.yearsExperience
      ? typeof m.yearsExperience === 'number'
        ? `${m.yearsExperience}+ Yrs Exp`
        : m.yearsExperience.includes('Exp')
        ? m.yearsExperience
        : `${m.yearsExperience} Exp`
      : undefined,
    description: m.shortBio || m.description || (m.company ? `Associated with ${m.company}` : ''),
    image: m.photo || m.image || `/assets/${m.id}-refined.webp`,
    imagePosition: m.imagePosition,
    imageShiftUp: m.imageShiftUp,
    imageScale: m.imageScale,
    alt: m.photoAlt || m.alt || `${m.name} — ${m.company || m.designation || 'Mentor'}`,
    link: m.linkedInUrl || m.socialUrl || '#contact',
  }));

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
            Learn directly from seasoned entrepreneurs and industry veterans across Maharashtra. Hover or tap any mentor to expand their profile and expertise.
          </p>
        </div>

        {/* Mentor Cards: Single Line Accordion Layout */}
        {galleryItems.length > 0 ? (
          <div className="w-full">
            <AccordionGallery
              items={galleryItems}
              defaultIndex={0}
              expandRatio={0.52}
              trigger="hover"
              height={550}
              gap={12}
              radius={24}
              accentColor="#E27500"
              overlayColor="#070D18"
              textColor="#ffffff"
            />
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
