import { SectionBackdrop } from './SectionBackdrop';
import React from 'react';
import { Users, BookOpen, Award, MapPin, Calendar, GraduationCap, Briefcase, Clock, Compass } from 'lucide-react';
import { APPROVED_STATISTICS, type VerifiedStatistic } from '../data/statisticsData';

const STAT_ICONS: Record<VerifiedStatistic['label'], React.ComponentType<{ className?: string }>> = {
  'Entrepreneurs Connected': Users,
  'Districts Reached': MapPin,
  'Events Conducted': Calendar,
  'Mentors': GraduationCap,
  'Businesses Supported': Briefcase,
  'Years of Journey': Clock,
};

export const Stats: React.FC = () => {
  // If verified statistics exist, show only the provided ones (no invented values).
  const verifiedStats = APPROVED_STATISTICS.filter(stat => stat.value && stat.value.trim().length > 0);

  // If no verified metrics are supplied by client yet, cleanly present qualitative foundation pillars.
  const foundationPillars = [
    { id: 'mentorship', label: 'Mentorship', sublabel: 'Find guidance from experienced entrepreneurs.', icon: Users },
    { id: 'skills', label: 'Business Skills', sublabel: 'Practical learning from business models to cash-flow.', icon: BookOpen },
    { id: 'community', label: 'Community', sublabel: 'Connect with motivated founders across Maharashtra.', icon: Compass },
    { id: 'opportunity', label: 'Opportunity', sublabel: 'Access new markets, exhibitions, and partnerships.', icon: Award },
  ];

  return (
    <section id="stats" className="section-with-backdrop w-full py-12 bg-[#F9F9FB] border-b border-[#EAEAEA]">
      <SectionBackdrop label="IMPACT" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {verifiedStats.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {verifiedStats.map((item) => {
              const IconComponent = STAT_ICONS[item.label] || Award;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 shadow-xs border border-[#EAEAEA] hover:border-[#E27500]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-1.5 h-6 bg-[#E27500] rounded-full" />
                    <IconComponent className="w-5 h-5 text-[#E27500] stroke-[1.75]" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight mb-1">
                      {item.value}
                    </div>
                    <div className="text-xs font-semibold text-[#4B5563] leading-snug">
                      {item.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {foundationPillars.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 shadow-xs border border-[#EAEAEA] hover:border-[#E27500]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-1.5 h-6 bg-[#E27500] rounded-full" />
                    <IconComponent className="w-5 h-5 text-[#E27500] stroke-[1.75]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1F2937] mb-1">{item.label}</h3>
                    <p className="text-xs text-[#6D6D6D] leading-relaxed">{item.sublabel}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Stats;
