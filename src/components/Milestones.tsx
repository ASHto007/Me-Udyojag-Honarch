import React from 'react';
import { Calendar, ShieldAlert } from 'lucide-react';

export const Milestones: React.FC = () => {
  // 5 verified timeline points per item 04-03 (Submitted)
  const timeline = [
    {
      period: '~17 Years Ago',
      title: 'Movement Inception',
      desc: 'Grassroots entrepreneurship guidance initiative founded by Nilesh More, addressing the lack of structured business mentorship in regional communities.',
      badge: 'Client-reported (item 04-03)',
    },
    {
      period: '15 Oct 2018',
      title: 'Global Maharashtrian Entrepreneurship Conclave',
      desc: 'Held at the iconic Hotel Taj Mahal Palace, Mumbai, bringing together prominent business personalities and emerging industrialists.',
      badge: 'Documented Landmark',
    },
    {
      period: '2020',
      title: 'Youth Guidance & Awards Programme',
      desc: 'Statewide awards and orientation series covered by regional press, honoring youth resilience and enterprise creation.',
      badge: 'Press-Documented',
    },
    {
      period: 'Ongoing',
      title: 'Statewide Participant Milestones',
      desc: 'Over 25,000 direct seminar participants, 185+ educational sessions (60+ auditoriums, 100+ hotels, 25+ colleges), and 2.5M+ digital impressions.',
      badge: 'Client-reported figures',
    },
    {
      period: '27 Oct 2026',
      title: 'Global Marathi Entrepreneurship Expo',
      desc: 'Historic gathering of 100+ Marathi entrepreneurs with crore-scale operations at the National Stock Exchange of India (NSE), Mumbai.',
      badge: 'Confirmed Upcoming Expo',
    },
  ];

  return (
    <section id="achievements" className="w-full py-20 bg-[#1B2A3A] text-white border-b border-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Milestones of a Grassroots Journey
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-2">
            Key verifiable dates and historical turning points in building an entrepreneurial mindset across Maharashtra.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative border-l-2 border-[#E27500]/30 ml-4 sm:ml-6 pl-6 sm:pl-10 space-y-12 max-w-4xl mx-auto">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#E27500] border-4 border-[#1B2A3A] group-hover:scale-125 transition-transform" />

              <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-extrabold text-[#FFB783] tracking-wider uppercase font-mono flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#E27500]" />
                    {item.period}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded bg-white/10 text-gray-300">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
