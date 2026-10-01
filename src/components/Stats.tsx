import { SectionBackdrop } from './SectionBackdrop';
import React from 'react';
import { Users, BookOpen, IndianRupee, Award } from 'lucide-react';

export const Stats: React.FC = () => {
  // Reuse the approved hero pillars while numeric claims await documentation.
  const displayStats = [
    { id: 'mentorship', label: 'Mentorship', sublabel: 'Find guidance.', icon: Users },
    { id: 'skills', label: 'Business Skills', sublabel: 'Practical learning.', icon: BookOpen },
    { id: 'community', label: 'Community', sublabel: 'Connect with entrepreneurs.', icon: Award },
    { id: 'opportunity', label: 'Opportunity', sublabel: 'Take your next step in business.', icon: IndianRupee },
  ];

  return (
    <section id="stats" className="section-with-backdrop w-full py-12 bg-[#F9F9FB] border-b border-[#EAEAEA]">
      <SectionBackdrop label="IMPACT" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#EAEAEA] hover:border-[#E27500]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Row: Left orange bar + Right icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-1.5 h-6 bg-[#E27500] rounded-full" />
                  <IconComponent className="w-5 h-5 text-[#E27500] stroke-[1.75]" />
                </div>

                {/* Animated Stat */}
                <div>
                  <h4 className="text-sm font-bold text-[#1F2937] mb-1">{item.label}</h4>
                  <p className="text-xs text-[#6D6D6D] leading-relaxed">{item.sublabel}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
