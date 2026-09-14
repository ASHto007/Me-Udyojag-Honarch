import React from 'react';
import { Quote, AlertCircle, Sparkles } from 'lucide-react';

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
          
          {/* Left: Founder Editorial Frame / Candidate Photo Container */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Backing decorative saffron accent */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#E27500]/30 to-[#E27500]/5 -rotate-1" />

              {/* Photo Card Shell */}
              <div className="relative rounded-2xl overflow-hidden bg-[#0D1829] border border-[#1e2f4a] shadow-xl shadow-black/40">
                {/* Candidate Photo Frame */}
                <div className="w-full aspect-[4/5] bg-gradient-to-b from-[#0D1829] to-[#111f35] flex flex-col items-center justify-center p-8 text-center relative">
                  <div className="w-24 h-24 rounded-full bg-[#0B1320] shadow-inner flex items-center justify-center mb-4 border-2 border-dashed border-[#E27500]/60">
                    <Sparkles className="w-10 h-10 text-[#E27500]" />
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-1">Nilesh More</h4>
                  <p className="text-xs font-semibold text-[#FFB783] uppercase tracking-wider mb-4">
                    Founder &amp; Convener
                  </p>

                  <div className="pending-placeholder">
                    [PENDING CLIENT INPUT — final photo selection and crop approval, item 02-08]
                  </div>
                </div>

                {/* Founder Info Bar */}
                <div className="p-6 bg-[#0B1320] border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Founder &amp; Convener</span>
                    <span className="font-semibold text-white">Mi Udyojak Honarach</span>
                  </div>
                  <div className="mt-3">
                    <div className="pending-placeholder text-[11px] w-full text-center">
                      [PENDING CLIENT INPUT — founder designation &amp; biography, items 02-07, 04-04]
                    </div>
                  </div>
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
                <span className="inline-flex items-center gap-1 text-[11px] text-[#FFB783] font-medium bg-[#E27500]/15 px-2.5 py-1 rounded border border-[#E27500]/30">
                  <AlertCircle className="w-3 h-3 text-[#E27500]" />
                  [UNCONFIRMED ATTRIBUTION — pending client sign-off, item 04-06]
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
