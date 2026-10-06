import { SectionBackdrop } from './SectionBackdrop';
import { APPROVED_STORIES } from '../data/storiesData';
import { MapPin, ArrowUpRight, TrendingUp, Building } from 'lucide-react';

export function Stories() {
  return (
    <section id="stories" className="section-with-backdrop w-full py-16 sm:py-24 bg-white border-b border-[#EAEAEA]">
      <SectionBackdrop label="STORIES" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-widest text-[#E27500] mb-2">
            GRASSROOTS ENTERPRISE IMPACT
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight">
            Success Stories &amp; Founder Journeys
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Measurable business outcomes from entrepreneurs supported across Maharashtra.
          </p>
        </div>

        {APPROVED_STORIES.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {APPROVED_STORIES.map((story) => (
              <article
                key={story.id}
                className="overflow-hidden rounded-3xl border border-[#EAEAEA] bg-[#FCFBF9] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {story.photo ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                      <img
                        src={story.photo}
                        alt={story.photoAlt || `${story.name} — ${story.company}`}
                        loading="lazy"
                        decoding="async"
                        width={600}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-[11px] font-semibold">
                        {story.industry}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 pb-0 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#E27500] uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
                        {story.industry}
                      </span>
                    </div>
                  )}

                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#111827]">
                        {story.name}
                      </h3>
                      <p className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 mt-0.5">
                        <Building className="w-3.5 h-3.5 text-[#E27500]" />
                        <span>{story.company}</span>
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-[#E27500]" />
                        <span>{story.location}</span>
                      </p>
                    </div>

                    <dl className="space-y-3 text-xs sm:text-sm leading-relaxed text-gray-600 border-t border-gray-200/60 pt-3">
                      <div>
                        <dt className="font-bold text-gray-900 text-xs uppercase tracking-wider">The Challenge</dt>
                        <dd className="mt-0.5">{story.challenge}</dd>
                      </div>
                      <div>
                        <dt className="font-bold text-gray-900 text-xs uppercase tracking-wider">How Platform Helped</dt>
                        <dd className="mt-0.5">{story.support}</dd>
                      </div>
                      <div>
                        <dt className="font-bold text-[#9A4D00] text-xs uppercase tracking-wider">Measurable Result</dt>
                        <dd className="mt-0.5 font-medium text-gray-900">{story.result}</dd>
                      </div>
                    </dl>

                    {story.quote && (
                      <blockquote className="border-l-3 border-[#E27500] pl-3 text-xs italic text-gray-700 bg-orange-50/50 p-2.5 rounded-r-xl">
                        "{story.quote}"
                      </blockquote>
                    )}
                  </div>
                </div>

                {/* Optional profile and video links */}
                {(story.socialUrl || story.videoUrl) && (
                  <div className="p-6 pt-0 flex flex-wrap gap-4 border-t border-gray-100 pt-4">
                    {story.socialUrl && (
                      <a
                        href={story.socialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1 text-xs font-bold text-[#9A4D00] hover:text-[#C56300]"
                      >
                        <span>Visit Profile</span>
                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {story.videoUrl && (
                      <a
                        href={story.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1 text-xs font-bold text-[#9A4D00] hover:text-[#C56300]"
                      >
                        <span>Watch Video Story</span>
                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          /* Clean Data-Ready State */
          <div className="rounded-3xl border border-[#EAEAEA] bg-[#FCFBF9] p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#E27500]/10 text-[#E27500] mx-auto flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#111827]">
              Verified Entrepreneur Case Studies
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Authentic accounts of first-generation business creators—documenting initial challenges, specific mentorship interventions, and measurable economic milestones—are shared here with formal founder consent.
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E27500] hover:text-[#C56300] transition-colors"
              >
                <span>Share your enterprise journey with our community →</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Stories;
