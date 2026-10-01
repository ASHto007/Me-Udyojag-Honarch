import { APPROVED_MENTORS } from '../data/approvedContent';
import { SectionBackdrop } from './SectionBackdrop';
import React from 'react';
import AccordionGallery, { type MentorGalleryItem } from './AccordionGallery';

export const Mentors: React.FC = () => {
  const mentorsList: MentorGalleryItem[] = APPROVED_MENTORS;

  return (
    <section id="mentors" className="section-with-backdrop section-with-backdrop--dark w-full py-16 sm:py-24 bg-[#0B1320] text-white border-b border-gray-800 relative overflow-hidden">
      <SectionBackdrop label="MENTORS" />
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E27500]/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12 gap-5 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mentors & Guidance
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            
          </p>
        </div>

        {/* Mentor Profile Accordion Gallery */}
        <div className="w-full">
          {mentorsList.length ? <AccordionGallery
            items={mentorsList}
            defaultIndex={0}
            expandRatio={0.5}
            trigger="hover"
            height={520}
            gap={14}
            radius={24}
            accentColor="#E27500"
            overlayColor="#070D18"
            textColor="#ffffff"
            tilt={5}
            parallax={0}
            duration={0.5}
          /> : <p className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-sm text-gray-300">Mentor profiles will be published here once confirmed.</p>}
        </div>

      </div>
    </section>
  );
};

export default Mentors;
