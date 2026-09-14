import React from 'react';
import { UserCheck, Sparkles } from 'lucide-react';

export const Stories: React.FC = () => {
  return (
    <section id="stories" className="w-full py-16 sm:py-24 bg-white border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Success Stories & Founder Journeys
          </h2>
          <p className="text-sm sm:text-base text-[#6D6D6D] mt-2">
            Real-world accounts of Maharashtra founders who started with an ambition and grew resilient businesses with community guidance.
          </p>
        </div>

        {/* Structured Placeholder Showcase (Zero fabricated persona guarantee) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((slot) => (
            <div
              key={slot}
              className="pending-placeholder-card flex flex-col items-center justify-between min-h-[340px] text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#E27500] mb-4">
                <Sparkles className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-base font-bold text-[#1F2937] mb-2">
                  Featured Entrepreneur Story #{slot}
                </h3>
                <p className="text-xs text-[#6D6D6D] mb-4 max-w-xs mx-auto">
                  Founder background, venture focus, revenue milestones, and mentorship impact data will be slotted here upon client supply.
                </p>
              </div>

              <div className="pending-placeholder text-[11px] w-full text-center">
                [PENDING CLIENT INPUT — success stories to be supplied, section 07]
              </div>
            </div>
          ))}
        </div>

        {/* Invitation to Share Story */}
        <div className="mt-10 p-6 rounded-2xl bg-[#FCFBF9] border border-[#EAEAEA] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FEF3C7] text-[#E27500] flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#111827]">Are you a mentee or movement alumni?</h4>
              <p className="text-xs text-[#6D6D6D]">Submit your venture profile to be featured across our platforms.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="bg-[#1F2937] hover:bg-[#E27500] text-white px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Submit Your Story
          </a>
        </div>

      </div>
    </section>
  );
};
