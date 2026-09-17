import React from 'react';
import { Network, Megaphone, GraduationCap, Award, Handshake, ArrowRight } from 'lucide-react';
import { LayoutGrid } from './ui/layout-grid';

/* ─── Per-card content overlays ─── */

const ServiceOverlay = ({
  num,
  icon: Icon,
  title,
  marathiTitle,
  desc,
}: {
  num: string;
  icon: React.ElementType;
  title: string;
  marathiTitle: string;
  desc: string;
}) => (
  <div className="text-white space-y-2">
    <div className="flex items-center gap-2 flex-wrap">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#E27500]/30 border border-[#E27500]/50 text-[#FFB783]">
        <Icon className="w-3.5 h-3.5" />
      </span>
      <span className="text-[10px] font-extrabold text-[#FFB783] uppercase tracking-widest">
        SERVICE {num}
      </span>
    </div>
    <h3 className="text-lg sm:text-xl font-extrabold leading-snug drop-shadow-lg">
      {title}
    </h3>
    <p className="text-xs font-marathi text-[#FFB783] font-semibold">
      {marathiTitle}
    </p>
    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed line-clamp-3">
      {desc}
    </p>
    <a
      href="#contact"
      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFB783] hover:text-white transition-colors pt-1 group"
    >
      <span>Inquire for program</span>
      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
    </a>
  </div>
);

/* ─── Card data ─── */
const cards = [
  {
    id: 1,
    className: 'md:col-span-2 md:row-span-2',
    thumbnail:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80&fit=crop',
    content: (
      <ServiceOverlay
        num="01"
        icon={Network}
        title="Networking Events & Forums"
        marathiTitle="व्यावसायिक नेटवर्किंग आणि परिसंवाद"
        desc="Meet fellow entrepreneurs and exchange experience, opening doorways to collaborative business ventures and partnerships across Maharashtra's thriving MSME ecosystem."
      />
    ),
  },
  {
    id: 2,
    className: 'md:col-span-1 md:row-span-1',
    thumbnail:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80&fit=crop',
    content: (
      <ServiceOverlay
        num="02"
        icon={Megaphone}
        title="Business Promotion Platform"
        marathiTitle="व्यवसाय प्रसिद्धी आणि व्यासपीठ"
        desc="Gain visibility through state-level exhibitions, festive showcases, media interviews, and high-impact showcase events."
      />
    ),
  },
  {
    id: 3,
    className: 'md:col-span-1 md:row-span-1',
    thumbnail:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80&fit=crop',
    content: (
      <ServiceOverlay
        num="03"
        icon={GraduationCap}
        title="Mentorship & Guidance"
        marathiTitle="अनुभवी उद्योजकांचे मार्गदर्शन"
        desc="Learn directly from seasoned industry veterans and business experts across operations, compliance, and growth."
      />
    ),
  },
  {
    id: 4,
    className: 'md:col-span-1 md:row-span-1',
    thumbnail:
      'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80&fit=crop',
    content: (
      <ServiceOverlay
        num="04"
        icon={Award}
        title="Awards & Recognition"
        marathiTitle="उद्योजक सन्मान आणि पुरस्कार"
        desc="Celebrate entrepreneurial achievement and grassroots innovation, honoring standout contributions to Maharashtra's economy."
      />
    ),
  },
  {
    id: 5,
    className: 'md:col-span-2 md:row-span-1',
    thumbnail:
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&q=80&fit=crop',
    content: (
      <ServiceOverlay
        num="05"
        icon={Handshake}
        title="Collaborations"
        marathiTitle="संस्थात्मक आणि व्यावसायिक सहयोग"
        desc="Connect entrepreneurs, industry associations, venue partners, and institutional organisations for mutual growth and long-term strategic alliances."
      />
    ),
  },
];

/* ─── Section ─── */
export const Programs: React.FC = () => {
  return (
    <section id="programs" className="w-full py-16 sm:py-24 bg-[#FCFBF9] border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Services &amp; Core Initiatives
          </h2>
          <p className="text-sm sm:text-base text-[#6D6D6D] mt-2">
            Five structured pathways to empower aspiring and emerging entrepreneurs with skills, visibility, and direct business linkages. Click any card to explore.
          </p>
        </div>

        {/* LayoutGrid — masonry layout with animated click-expand */}
        <LayoutGrid cards={cards} />

      </div>
    </section>
  );
};

export default Programs;
