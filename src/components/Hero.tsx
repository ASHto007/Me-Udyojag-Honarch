import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TypewriterText } from './TypewriterText';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Pause typing animation if hero is scrolled offscreen
  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      className="w-full pt-28 sm:pt-36 lg:pt-40 pb-8 sm:pb-12 bg-[#FCFBF9]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Editorial Heading Area above the photograph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-8 sm:mb-10 lg:mb-12">
          {/* Large headline on the left */}
          <div className="lg:col-span-7 xl:col-span-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] xl:text-[3.75rem] font-extrabold text-[#111827] tracking-tight leading-[1.12]">
              <span className="sr-only">Dream local. Build something big.</span>
              <span aria-hidden="true">
                <span className="block text-[#111827]">Dream local.</span>
                <span className="inline-block text-[#111827]">Build </span>{' '}
                <TypewriterText phrase="something big." isVisible={isHeroVisible} />
              </span>
            </h1>
          </div>

          {/* Supporting introduction on the right, aligned near lower portion */}
          <div className="lg:col-span-5 xl:col-span-4 lg:pb-3">
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed font-normal">
              Connect with entrepreneurs, find guidance, and take your next step in business.
            </p>
          </div>
        </div>

        {/* Hero Photograph with Inset CTA Panel */}
        <div className="relative w-full rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] overflow-hidden border border-gray-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-gray-100">
          <img
            src="/assets/hero-workshop.jpg"
            alt="Dynamic Maharashtra entrepreneurs collaborating at their workshop table"
            className="w-full h-[320px] sm:h-[400px] lg:h-[460px] object-cover object-[center_35%]"
            width={1280}
            height={460}
            loading="eager"
          />

          {/* Inset White CTA Panel (Curved Top-Left Edge) */}
          <div className="sm:absolute sm:bottom-0 sm:right-0 z-10 bg-white sm:rounded-tl-[2rem] lg:rounded-tl-[2.5rem] p-6 sm:p-7 lg:p-8 sm:max-w-[380px] lg:max-w-[420px] shadow-sm">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#111827] leading-snug tracking-tight mb-4">
              Your next chapter starts with your own business.
            </h2>
            <div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#E27500] hover:bg-[#CC6600] active:bg-[#B35500] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-colors duration-200 shadow-sm group"
              >
                <span>Start your journey</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Four-Pillar Divider Bar */}
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

        {/* Verified Movement Introduction */}
        <div className="mt-8 max-w-4xl mx-auto text-center px-4">
          <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed font-normal">
            <strong className="text-[#1F2937] font-semibold">Mi Udyojak Honarach</strong> inspires young people and aspiring entrepreneurs to develop confidence, determination and an entrepreneurial mindset. Through guidance from experienced business leaders, practical learning and meaningful connections, the platform helps participants take informed steps towards building their businesses.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
