import React from 'react';
import { Calendar, Clock, MapPin, Building, Award, ArrowUpRight } from 'lucide-react';

export const Events: React.FC = () => {
  return (
    <section id="community" className="w-full py-16 sm:py-24 bg-white border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Community & Major Conclaves
          </h2>
          <p className="text-sm sm:text-base text-[#6D6D6D] mt-2">
            High-impact gatherings connecting regional entrepreneurs, crore-scale business leaders, and enterprise partners.
          </p>
        </div>

        {/* Featured Upcoming Event Card */}
        <div className="rounded-3xl overflow-hidden border-2 border-[#E27500] bg-gradient-to-br from-[#FFFBEB] via-white to-orange-50/40 p-6 sm:p-10 shadow-lg mb-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
                Global Marathi Entrepreneurship Expo 2026
              </h3>
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                A landmark gathering of <strong>100+ Marathi entrepreneurs</strong> running established crore-level enterprises. A historic forum for trade linkages, joint ventures, and inspiring future enterprise leaders.
              </p>

              {/* Event Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-orange-200/60 shadow-xs">
                  <Calendar className="w-5 h-5 text-[#E27500] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold text-gray-500 uppercase">Date</div>
                    <div className="text-xs font-extrabold text-[#111827]">Tuesday, 27 Oct 2026</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-orange-200/60 shadow-xs">
                  <Clock className="w-5 h-5 text-[#E27500] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold text-gray-500 uppercase">Timing</div>
                    <div className="text-xs font-extrabold text-[#111827]">9:00 AM – 9:00 PM</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-orange-200/60 shadow-xs">
                  <Building className="w-5 h-5 text-[#E27500] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] font-bold text-gray-500 uppercase">Venue</div>
                    <div className="text-xs font-extrabold text-[#111827]">NSE India, Mumbai</div>
                  </div>
                </div>
              </div>

              {/* Placeholders for exact details */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <div className="pending-placeholder text-[11px]">
                  [PENDING CLIENT INPUT — exact hall / address / map link, item 06-03]
                </div>
                <div className="pending-placeholder text-[11px]">
                  [PENDING CLIENT INPUT — registration process & invite criteria, item 06-05]
                </div>
              </div>
            </div>

            {/* Right Action Block */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-orange-200 text-center shadow-sm">
              <span className="text-xs font-bold text-[#E27500] uppercase tracking-wider mb-2">
                Participation Protocol
              </span>
              <div className="text-lg font-bold text-[#111827] mb-2">
                By Invitation & Vetted Application
              </div>
              <p className="text-xs text-gray-500 mb-6">
                Direct access reserved for active business founders and verified enterprise delegates.
              </p>
              <a
                href="#contact"
                className="w-full py-3 px-5 rounded-full bg-[#1F2937] hover:bg-[#E27500] text-white text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Request Invitation Details</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Past Landmark Event Card */}
        <div className="rounded-2xl bg-[#FCFBF9] border border-[#EAEAEA] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#E27500]" />
              <h4 className="text-lg font-bold text-[#111827]">
                Global Maharashtrian Entrepreneurship Conclave 2018
              </h4>
            </div>
            <span className="text-xs font-bold text-[#6D6D6D] bg-white px-3 py-1 rounded-full border border-gray-200">
              Historical Milestone
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
            Held on <strong>15 October 2018</strong> at the historic <strong>Hotel Taj Mahal Palace, Mumbai</strong>, bringing together Maharashtra’s respected industrial veterans, policy observers, and emerging enterprise creators for a day of high-level dialogue and strategic direction.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#6D6D6D]">
            <MapPin className="w-3.5 h-3.5 text-[#E27500]" />
            <span>The Taj Mahal Palace, Colaba, Mumbai</span>
            <span>•</span>
            <span>Verified Record (item 04-03)</span>
          </div>
        </div>

      </div>
    </section>
  );
};
