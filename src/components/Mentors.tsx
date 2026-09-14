import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import AccordionGallery, { type MentorGalleryItem } from './AccordionGallery';

export const Mentors: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Real Mentor Profile Cards (Photo, Name, Designation, Specialization, Experience & Description)
  const mentorsList: MentorGalleryItem[] = [
    {
      name: 'Pravin Mane',
      role: 'MD, Precision Tooling & Engineering',
      tag: 'Manufacturing & Industrial',
      experience: '22+ Yrs Exp',
      description: 'Mentors entrepreneurs on lean manufacturing, CNC shop-floor robotics, factory compliance, and scalable production units.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
      link: '#contact'
    },
    {
      name: 'Dr. Sunil Kulkarni',
      role: 'Founder & Chairman, AgriVenture Labs',
      tag: 'Agro-Processing & Food Tech',
      experience: '18+ Yrs Exp',
      description: 'Guides founders in cold chain logistics, post-harvest value addition, FSSAI certifications, and domestic food brand scaling.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1000&q=80',
      link: '#contact'
    },
    {
      name: 'CA Rajesh Deshmukh',
      role: 'Senior Financial & MSME Credit Advisor',
      tag: 'MSME Capital & Subsidies',
      experience: '20+ Yrs Exp',
      description: 'Specializes in working capital syndication, CGTMSE credit access, state capital subsidy filing, and financial structuring.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80',
      link: '#contact'
    },
    {
      name: 'Aniket Shinde',
      role: 'Co-Founder, RetailPulse Networks',
      tag: 'D2C Brands & Distribution',
      experience: '15+ Yrs Exp',
      description: 'Helps consumer product startups build super-stockist distribution networks, modern retail placement, and D2C marketing.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80',
      link: '#contact'
    },
    {
      name: 'Mahesh Patil',
      role: 'Director, Global Gateway Logistics',
      tag: 'Export Protocols & Trade',
      experience: '24+ Yrs Exp',
      description: 'Advises regional manufacturers on international trade documentation, customs clearance, FTA benefits, and global B2B matchmaking.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
      link: '#contact'
    }
  ];

  const categories = [
    'All Specializations',
    'Manufacturing',
    'Agro-Tech',
    'MSME Finance',
    'D2C Retail',
    'Global Exports'
  ];

  return (
    <section id="mentors" className="w-full py-16 sm:py-24 bg-[#0B1320] text-white border-b border-gray-800 relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E27500]/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12 gap-5 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Learn Directly from Proven Industry Titans
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Hover over any mentor to expand their profile, leadership background, and specialized 1-on-1 enterprise guidance areas.
          </p>

          {/* Specialization Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {categories.map((cat, idx) => {
              const isSelected = (cat === 'All Specializations' && activeCategory === 'All') || activeCategory === cat;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat === 'All Specializations' ? 'All' : cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#E27500] text-white shadow-lg shadow-[#E27500]/30'
                      : 'bg-white/10 text-gray-300 border border-white/10 hover:border-[#E27500] hover:text-[#FFB783]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mentor Profile Accordion Gallery */}
        <div className="w-full">
          <AccordionGallery
            items={mentorsList}
            defaultIndex={0}
            expandRatio={0.5}
            trigger="hover"
            height={520}
            gap={14}
            radius={24}
            accentColor="#E27500"
            overlayColor="#070D18"
            textColor="#ffffff"
            tilt={5}
            parallax={0.4}
            duration={0.5}
          />
        </div>

      </div>
    </section>
  );
};

export default Mentors;
