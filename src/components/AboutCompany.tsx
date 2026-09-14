import React from 'react';
import { Target, Compass, Sparkles, Building2, TrendingUp, Users, ShieldCheck, ArrowRight, Award, Lightbulb } from 'lucide-react';

export const AboutCompany: React.FC = () => {
  const pillars = [
    {
      icon: Lightbulb,
      marathiTitle: 'उद्योजकीय प्रेरणा आणि कौशल्य',
      title: 'Grassroots Inspiration & Skill Building',
      desc: 'Demystifying business fundamentals through practical workshops, masterclasses, and hands-on bootcamps for regional youth.',
      highlight: 'Grassroots Reach'
    },
    {
      icon: Users,
      marathiTitle: 'अनुभवी मार्गदर्शकांचे नेटवर्क',
      title: 'Mentor & Industry Ecosystem',
      desc: 'Direct access to 450+ seasoned business leaders, industry titans, and domain veterans for real-world guidance.',
      highlight: '450+ Mentors'
    },
    {
      icon: TrendingUp,
      marathiTitle: 'प्रकल्प व वित्त सहाय्यता',
      title: 'Project Finance & MSME Handholding',
      desc: 'Step-by-step assistance with business plan formulation, government subsidies, loan facilitation, and regulatory compliance.',
      highlight: '₹150 Cr+ Impact'
    },
    {
      icon: Building2,
      marathiTitle: 'बाजारपेठ आणि व्यावसायिक सहकार्य',
      title: 'Market Linkages & B2B Growth',
      desc: 'Connecting regional manufacturers and service providers with statewide trade channels, corporate supply chains, and B2B buyers.',
      highlight: '36 Districts'
    },
  ];

  const values = [
    {
      badge: 'आत्मनिर्भरता',
      title: 'Self-Reliance',
      desc: 'Transforming ambitious job-seekers into confident, sustainable job-creators across Maharashtra.'
    },
    {
      badge: 'विश्वासार्हता',
      title: 'Ethical Enterprise',
      desc: 'Instilling strong governance, customer-first mindsets, and resilient operational disciplines.'
    },
    {
      badge: 'सर्वसमावेशकता',
      title: 'Inclusive Growth',
      desc: 'Equally empowering rural youth, women founders, and first-generation entrepreneurs from Tier 2/3 cities.'
    },
    {
      badge: 'कृतीशीलता',
      title: 'Action-Driven',
      desc: 'Moving beyond theoretical talk to concrete business launches, unit setups, and revenue milestones.'
    }
  ];

  return (
    <section id="about-company" className="w-full py-16 sm:py-24 bg-white border-b border-[#EAEAEA] relative overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E27500]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#111827]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight leading-tight mb-6">
            Building Maharashtra's Most Resilient Entrepreneurial Movement
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            <strong className="text-[#111827] font-semibold">Mi Udyojak Honarach (मी उद्योजक होणारच)</strong> is an expansive socio-economic initiative dedicated to unlocking the entrepreneurial potential of Maharashtra's youth, fostering self-reliance, and driving regional industrial growth.
          </p>
        </div>

        {/* Vision & Mission Double Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Mission Card */}
          <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FCFBF9] to-white border border-[#EAEAEA] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#E27500]/10 text-[#E27500] flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold tracking-widest text-[#E27500] uppercase mb-1">
              OUR MISSION • आमचे ध्येय
            </div>
            <h3 className="text-2xl font-bold text-[#111827] mb-4">
              To ignite and empower 100,000+ new enterprises
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              To provide accessible, high-caliber entrepreneurial mentorship, industry insights, financial guidance, and peer networks to every motivated individual in Maharashtra — dismantling socio-economic and geographical barriers.
            </p>
            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3 text-xs font-medium text-gray-500">
              <ShieldCheck className="w-4 h-4 text-[#E27500]" />
              <span>Structured handholding from ideation to scale</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#111827] to-[#0A0F1D] text-white border border-gray-800 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#E27500]/20 text-[#FFB783] flex items-center justify-center mb-6 border border-[#E27500]/30">
              <Compass className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold tracking-widest text-[#FFB783] uppercase mb-1">
              OUR VISION • आमची दूरदृष्टी
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              A self-reliant Maharashtra with thriving regional economies
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              To build a state where youth from every village, town, and metro area have the confidence, resources, and ecosystem backing to create world-class enterprises and generate sustainable local employment.
            </p>
            <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3 text-xs font-medium text-gray-400">
              <Award className="w-4 h-4 text-[#FFB783]" />
              <span>Inspiring economic leadership across all 36 districts</span>
            </div>
          </div>

        </div>

        {/* Strategic Pillars Grid */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-3">
              How the Movement Operates
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Our 4-part framework turns entrepreneurial ambition into practical, scalable businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-[#FCFBF9] border border-[#EAEAEA] hover:border-[#E27500]/50 hover:bg-white transition-all duration-300 group shadow-sm hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#E27500]/10 text-[#E27500] flex items-center justify-center group-hover:bg-[#E27500] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#E27500] bg-[#E27500]/10 px-2.5 py-1 rounded-full border border-[#E27500]/20">
                      {pillar.highlight}
                    </span>
                  </div>

                  <div className="text-xs font-marathi font-bold text-[#E27500] mb-1">
                    {pillar.marathiTitle}
                  </div>
                  <h4 className="text-base font-bold text-[#111827] mb-2 leading-snug">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Values Strip */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#080E18] text-white border border-[#1a2540] relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-white/10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFB783]">OUR GUIDING PRINCIPLES</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Core Values &amp; Culture</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 max-w-md">
                The non-negotiable principles that drive our seminars, mentor engagements, and community initiatives.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-[#0D1829] border border-white/10">
                  <div className="inline-block font-marathi font-bold text-xs text-[#FFB783] bg-[#E27500]/20 px-2.5 py-0.5 rounded border border-[#E27500]/30 mb-3">
                    {v.badge}
                  </div>
                  <h5 className="text-base font-bold text-white mb-2">{v.title}</h5>
                  <p className="text-xs text-gray-300 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>

            {/* Bottom Call to Action strip */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm font-semibold text-white">
                  Ready to take the leap into entrepreneurship?
                </p>
                <p className="text-xs text-gray-400">
                  Join thousands of motivated business owners across Maharashtra.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#E27500] hover:bg-[#c96800] text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all shadow-md hover:shadow-lg hover:gap-3"
              >
                <span>Connect With Us</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
