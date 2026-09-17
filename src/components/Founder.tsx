import React from 'react';
import { Quote } from 'lucide-react';

export const Founder: React.FC = () => {
  return (
    <section id="founder-vision" className="w-full py-16 sm:py-24 bg-[#080E18] border-b border-[#1a2540]">
      <div id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Center-aligned Section Heading */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Transforming Entrepreneurial Ambition into Lasting Action
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-3 max-w-2xl">
            Connecting aspiring youth with seasoned business leaders to turn entrepreneurial ambition into sustainable enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Founder Editorial Frame */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Backing decorative saffron accent */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#E27500]/30 to-[#E27500]/5 -rotate-1" />

              {/* Photo Card Shell */}
              <div className="relative rounded-2xl overflow-hidden bg-[#0D1829] border border-[#1e2f4a] shadow-xl shadow-black/40 group">
                {/* Real Founder Photo Frame */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#0B1320]">
                  <img
                    src="/assets/nilesh-more.jpg"
                    alt="Nilesh More - Founder & Convener"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1829] via-transparent to-transparent opacity-80" />

                  {/* Floating Founder Badge */}
                  <div className="absolute top-4 right-4 px-3.5 py-1 rounded-full bg-[#E27500] text-white text-xs font-bold shadow-lg shadow-[#E27500]/40">
                    Founder &amp; Convener
                  </div>
                </div>

                {/* Founder Info Bar */}
                <div className="p-6 bg-[#0D1829] border-t border-white/10 relative z-10">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span className="text-[#FFB783] font-semibold uppercase tracking-wider text-[11px]">Movement Architect</span>
                    <span className="font-semibold text-white">Mi Udyojak Honarach</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white">Nilesh More</h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Entrepreneur, Educator &amp; Community Builder empowering first-generation business creators across Maharashtra.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Founder Vision & Words */}
          <div className="lg:col-span-7 space-y-6">

            {/* Core Quote Box */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-[#0D1829] border-l-4 border-[#E27500] border border-white/10 shadow-sm">
              <Quote className="w-8 h-8 text-[#E27500]/30 absolute top-4 right-4" />
              <blockquote className="text-lg sm:text-xl font-semibold text-gray-100 italic leading-relaxed">
                "Mi Udyojak Honarach is not merely a declaration; it is the beginning of an entrepreneurial journey."
              </blockquote>
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-white/10">
                <span className="text-sm font-bold text-white">
                  — Nilesh More
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-[#FFB783] font-semibold bg-[#E27500]/15 px-2.5 py-1 rounded-full border border-[#E27500]/30">
                  Founder Vision
                </span>
              </div>
            </div>

            {/* Founder Motivation (Submitted Text) */}
            <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
              <p>
                The initiative was created to transform entrepreneurial ambition into action. It aims to give young people confidence, determination and inspiration by connecting them with successful and experienced entrepreneurs, enabling practical learning, guidance and meaningful professional relationships.
              </p>
              <p>
                Through grassroot seminars, district meetups, and enterprise bootcamps across Maharashtra, the movement nurtures an ecosystem where every aspiring individual finds the confidence to declare: <span className="font-marathi font-bold text-[#E27500]">मी उद्योजक होणारच!</span>
              </p>
            </div>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0D1829] border border-white/10">
                <div className="text-xs font-bold text-[#FFB783] uppercase tracking-wider mb-1">Pillar 01</div>
                <div className="text-sm font-bold text-white">Confidence &amp; Mindset</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0D1829] border border-white/10">
                <div className="text-xs font-bold text-[#FFB783] uppercase tracking-wider mb-1">Pillar 02</div>
                <div className="text-sm font-bold text-white">Practical Guidance</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0D1829] border border-white/10">
                <div className="text-xs font-bold text-[#FFB783] uppercase tracking-wider mb-1">Pillar 03</div>
                <div className="text-sm font-bold text-white">High-Value Networks</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
