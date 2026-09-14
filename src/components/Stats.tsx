import React, { useState } from 'react';
import { Users, BookOpen, IndianRupee, Award, ShieldCheck, ChevronRight, Info } from 'lucide-react';
import CountUp from './ui/count-up';

export const Stats: React.FC = () => {
  const [showDetailedAudit, setShowDetailedAudit] = useState(false);

  // Each stat broken into prefix / numeric value / suffix for CountUp animation
  const displayStats = [
    {
      id: 'mentored',
      prefix: '',
      from: 24500,
      value: 25000,
      suffix: '+',
      separator: ',',
      duration: 0.15,
      label: 'Entrepreneurs Mentored',
      sublabel: 'Across diverse business verticals',
      icon: Users,
      badge: 'Client-reported (item 03-08)',
    },
    {
      id: 'districts',
      prefix: '',
      from: 0,
      value: 36,
      suffix: '',
      separator: '',
      duration: 0.2,
      label: 'Districts Covered',
      sublabel: 'Active chapters throughout Maharashtra',
      icon: BookOpen,
      badge: 'Client-reported (item 03-08)',
    },
    {
      id: 'capital',
      prefix: '₹',
      from: 0,
      value: 150,
      suffix: ' Cr+',
      separator: '',
      duration: 0.2,
      label: 'Capital & Market Value',
      sublabel: 'Cumulative revenue and credit enabled',
      icon: IndianRupee,
      badge: 'Client-reported (item 03-08)',
    },
    {
      id: 'mentors',
      prefix: '',
      from: 0,
      value: 450,
      suffix: '+',
      separator: '',
      duration: 0.2,
      label: 'Veteran Mentors',
      sublabel: 'Experienced industry leaders & advisors',
      icon: Award,
      badge: 'Client-reported (item 03-08)',
    },
  ];

  // Verified breakdown points per client submission tracker item 03-08 / 04-03
  const verifiedBreakdown = [
    { label: 'Nearly 17 Years', detail: 'Active grassroots movement history' },
    { label: '185+ Total Seminars', detail: '60+ auditoriums, 100+ hotels, 25+ colleges' },
    { label: '2.5 Million+ Reach', detail: 'Estimated cumulative reach via digital & social media' },
    { label: 'Key Programs', detail: '6 Ganesh festival meets, 6 B2B sessions, 1 Taj Palace conclave' },
  ];

  return (
    <section id="stats" className="w-full py-12 bg-[#F9F9FB] border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E27500] animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6D6D6D]">
              Movement Reach &amp; Impact Metrics
            </h3>
          </div>
          <button
            onClick={() => setShowDetailedAudit(!showDetailedAudit)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E27500] hover:text-[#C56300] bg-[#FEF3C7] hover:bg-[#FDE68A] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{showDetailedAudit ? 'Hide Audit Breakdown' : 'View Audit Breakdown'}</span>
            <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${showDetailedAudit ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#EAEAEA] hover:border-[#E27500]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Row: Left orange bar + Right icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-1.5 h-6 bg-[#E27500] rounded-full" />
                  <IconComponent className="w-5 h-5 text-gray-400 stroke-[1.75]" />
                </div>

                {/* Animated Stat */}
                <div>
                  <div className="text-3xl sm:text-[2.25rem] font-extrabold text-[#111827] tracking-tight mb-1 font-sans tabular-nums">
                    {item.prefix}
                    <CountUp
                      from={item.from}
                      to={item.value}
                      separator={item.separator}
                      duration={item.duration}
                      delay={0}
                    />
                    {item.suffix}
                  </div>
                  <h4 className="text-sm font-bold text-[#1F2937] mb-1">{item.label}</h4>
                  <p className="text-xs text-[#6D6D6D] leading-relaxed">{item.sublabel}</p>
                </div>

                {/* Bottom verification footnote */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-[#92400E]">
                  <span className="bg-[#FEF3C7] px-2 py-0.5 rounded font-medium">
                    {item.badge}
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E27500]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Expandable Breakdown Drawer */}
        {showDetailedAudit && (
          <div className="mt-6 p-6 rounded-2xl bg-white border border-[#E27500]/30 shadow-md animate-fadeIn">
            <div className="flex items-center gap-2 mb-4 text-[#E27500] font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Client-Reported Figures Breakdown (Item 03-08 &amp; 04-03)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {verifiedBreakdown.map((b, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FCFBF9] border border-gray-100">
                  <div className="text-base font-bold text-[#111827] mb-1">{b.label}</div>
                  <div className="text-xs text-[#6D6D6D]">{b.detail}</div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-500 mt-4 italic">
              Notice: Figures are based on submissions from founder Nilesh More and internal documentation. Pending third-party independent audit confirmation.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
