import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="w-full pt-20 pb-6 sm:pt-24 sm:pb-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main Hero Showcase Card */}
        <div className="relative w-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 bg-neutral-900 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[2.1/1] min-h-[460px] sm:min-h-[520px]">
          {/* Background Image */}
          <img
            src="/assets/hero-workshop.jpg"
            alt="Dynamic Maharashtra entrepreneurs collaborating at their workshop table"
            className="w-full h-full object-cover object-center brightness-[0.95]"
          />

          {/* Dark Gradient Overlay for optimal contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/20 pointer-events-none" />

          {/* Bottom Left: Tagline */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10 max-w-[60%] sm:max-w-none">
            <p className="text-white text-xs sm:text-sm md:text-base font-extrabold tracking-[0.25em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              DREAM LOCAL. BUILD SOMETHING BIG.
            </p>
          </div>

          {/* Bottom Right: Cutout Card (Exact replication from visual screenshot) */}
          <div className="absolute bottom-0 right-0 z-20 bg-white pt-5 pl-5 pr-5 pb-5 sm:pt-7 sm:pl-8 sm:pr-8 sm:pb-7 rounded-tl-[2rem] sm:rounded-tl-[2.5rem] max-w-[85%] sm:max-w-md shadow-[-8px_-8px_24px_rgba(0,0,0,0.12)]">
            <h2 className="text-lg sm:text-2xl md:text-[1.625rem] font-extrabold text-[#111827] leading-tight tracking-tight mb-4">
              Your next chapter starts with your own business.
            </h2>
            <div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#1F2937] hover:bg-[#E27500] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-200 shadow-sm group"
              >
                <span>Start your journey</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Four-Pillar Divider Bar (Matches reference screenshot) */}
        <div className="mt-8 pt-5 pb-5 border-b border-[#E5E7EB]">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-10 text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#4B5563] uppercase text-center">
            <span className="hover:text-[#E27500] transition-colors cursor-default">MENTORSHIP</span>
            <span className="text-gray-300 font-normal">/</span>
            <span className="hover:text-[#E27500] transition-colors cursor-default">BUSINESS SKILLS</span>
            <span className="text-gray-300 font-normal">/</span>
            <span className="hover:text-[#E27500] transition-colors cursor-default">COMMUNITY</span>
            <span className="text-gray-300 font-normal">/</span>
            <span className="hover:text-[#E27500] transition-colors cursor-default">OPPORTUNITY</span>
          </div>
        </div>

        {/* Verified Movement Introduction (Tracker Item 03-02, Submitted Copy) */}
        <div className="mt-8 max-w-4xl mx-auto text-center px-4">
          <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed font-normal">
            <strong className="text-[#1F2937] font-semibold">Mi Udyojak Honarach</strong> inspires young people and aspiring entrepreneurs to develop confidence, determination and an entrepreneurial mindset. Through guidance from experienced business leaders, practical learning and meaningful connections, the platform helps participants take informed steps towards building their businesses.
          </p>
        </div>
      </div>
    </section>
  );
};
