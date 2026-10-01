import { SectionBackdrop } from './SectionBackdrop';
import React from 'react';

export const Stories: React.FC = () => {
  return (
    <section id="stories" className="section-with-backdrop w-full py-16 sm:py-24 bg-white border-b border-[#EAEAEA]">
      <SectionBackdrop label="STORIES" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Success Stories &amp; Founder Journeys
          </h2>
        </div>
        <div className="rounded-2xl border border-[#EAEAEA] bg-[#FCFBF9] p-8 text-center text-sm text-[#6D6D6D]">
          Entrepreneur stories will be published here once approved.
        </div>

      </div>
    </section>
  );
};

export default Stories;
