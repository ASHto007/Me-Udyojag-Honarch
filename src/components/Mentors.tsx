import React from 'react';
import AccordionGallery, { type MentorGalleryItem } from './AccordionGallery';

export const Mentors: React.FC = () => {
  // Real Mentor Profile Cards (Photo, Name, Designation, Specialization, Experience & Description)
  const mentorsList: MentorGalleryItem[] = [
    {
      name: 'Pravin Mane',
      role: 'MD, Precision Tooling & Industrial Engineering',
      tag: 'Manufacturing & Industrial',
      experience: '22+ Yrs Exp',
      description: 'Mentors entrepreneurs on lean manufacturing, CNC shop-floor robotics, factory compliance, and scalable production units.',
      image: '/assets/mentor-1.jpg',
      link: '#contact'
    },
    {
      name: 'Dr. Sunil Kulkarni',
      role: 'Founder & Chairman, AgriVenture Labs',
      tag: 'Agro-Processing & Food Tech',
      experience: '18+ Yrs Exp',
      description: 'Guides founders in cold chain logistics, post-harvest value addition, FSSAI certifications, and domestic food brand scaling.',
      image: '/assets/mentor-2.jpg',
      link: '#contact'
    },
    {
      name: 'Aniket Shinde',
      role: 'Co-Founder, RetailPulse Networks',
      tag: 'D2C Brands & Distribution',
      experience: '15+ Yrs Exp',
      description: 'Helps consumer product startups build super-stockist distribution networks, modern retail placement, and D2C marketing.',
      image: '/assets/mentor-3.jpg',
      link: '#contact'
    },
    {
      name: 'CA Rajesh Deshmukh',
      role: 'Senior Financial & MSME Credit Advisor',
      tag: 'MSME Capital & Subsidies',
      experience: '20+ Yrs Exp',
      description: 'Specializes in working capital syndication, CGTMSE credit access, state capital subsidy filing, and financial structuring.',
      image: '/assets/mentor-4.jpg',
      link: '#contact'
    },
    {
      name: 'Mahesh Patil',
      role: 'Director, Global Gateway Logistics',
      tag: 'Global Exports & Trade',
      experience: '24+ Yrs Exp',
      description: 'Advises regional manufacturers on international trade documentation, customs clearance, FTA benefits, and global B2B matchmaking.',
      image: '/assets/mentor-5.jpg',
      link: '#contact'
    },
    {
      name: 'Hanmantrao Gaikwad',
      role: 'Chairman & Managing Director, BVG India',
      tag: 'Enterprise Scaling & Leadership',
      experience: '30+ Yrs Exp',
      description: 'Inspires & guides entrepreneurs on grassroots scale, nationwide service operations, corporate governance, and empowering rural talent.',
      image: '/assets/mentor-6.jpg',
      link: '#contact'
    }
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
