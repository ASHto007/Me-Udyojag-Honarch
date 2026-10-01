import { SectionBackdrop } from './SectionBackdrop';
import { SAMPLE_STORIES } from '../data/sampleContent';
import { MapPin, Lightbulb } from 'lucide-react';
import React from 'react';

export const Stories: React.FC = () => (
  <section id="stories" className="section-with-backdrop w-full py-16 sm:py-24 bg-white border-b border-[#EAEAEA]">
    <SectionBackdrop label="STORIES" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
      <div className="flex flex-col items-center text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
          Success Stories &amp; Founder Journeys
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#6D6D6D]">
          Small beginnings, practical lessons and the confidence to take the next step.
        </p>
        <p className="mt-3 text-xs font-medium text-[#9A4D00]">
          Sample stories. All people, businesses and journeys below are fictional.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SAMPLE_STORIES.map(story => (
          <article key={story.id} className="flex flex-col rounded-3xl border border-[#EAEAEA] bg-[#FCFBF9] p-6 sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-[#9A4D00]">{story.sector}</span>
              <span className="text-xs text-gray-500">Sample</span>
            </div>
            <h3 className="text-xl font-bold leading-snug text-[#111827]">{story.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-[#4B5563]">{story.description}</p>
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-white p-4 border border-orange-100">
              <Lightbulb aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#E27500]" />
              <p className="text-sm leading-relaxed text-[#4B5563]">{story.lesson}</p>
            </div>
            <div className="mt-auto pt-6">
              <p className="font-bold text-[#111827]">{story.name}</p>
              <p className="mt-1 text-sm text-[#6D6D6D]">{story.business}</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-[#6D6D6D]">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" />{story.city}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Stories;
