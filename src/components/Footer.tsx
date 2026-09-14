import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#111923] text-white pt-16 pb-28 sm:pb-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="Mi Udyojak Honarach Logo"
                className="h-12 w-auto object-contain bg-white rounded-lg p-1"
              />
              <div>
                <div className="font-bold text-base text-white leading-tight">
                  Mi Udyojak Honarach!
                </div>
                <div className="text-xs font-marathi text-[#FFB783] font-semibold">
                  मी उद्योजक होणारच!
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              An entrepreneurial guidance initiative founded by Nilesh More, inspiring young people and aspiring founders to develop confidence, determination, and enterprise acumen across Maharashtra.
            </p>

            <div className="pt-2">
              <span className="text-[11px] text-gray-400 italic">
                Working Translation Tagline: "I Will Become an Entrepreneur"
              </span>
            </div>
          </div>

          {/* Nav Anchors */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFB783]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-300 font-medium">
              <li><a href="#founder-vision" className="hover:text-[#E27500] transition-colors">About Nilesh More</a></li>
              <li><a href="#programs" className="hover:text-[#E27500] transition-colors">5 Core Services</a></li>
              <li><a href="#achievements" className="hover:text-[#E27500] transition-colors">Milestones</a></li>
              <li><a href="#community" className="hover:text-[#E27500] transition-colors">NSE Expo 2026</a></li>
              <li><a href="#stories" className="hover:text-[#E27500] transition-colors">Success Stories</a></li>
              <li><a href="#mentors" className="hover:text-[#E27500] transition-colors">Mentors</a></li>
              <li><a href="#gallery" className="hover:text-[#E27500] transition-colors">Moments Gallery</a></li>
            </ul>
          </div>

          {/* Core Support Pillars */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFB783]">
              Core Pillars
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>• Practical Business Guidance</li>
              <li>• State-Level Networking Forums</li>
              <li>• Grassroots MSME Enablement</li>
              <li>• Recognition & Industry Felicitations</li>
              <li>• Inter-Enterprise Collaborations</li>
            </ul>
          </div>

          {/* Public Inquiries & Social */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFB783]">
              Contact Desk
            </h4>
            <div className="space-y-2">
              <div className="pending-placeholder text-[10px] w-full">
                [PENDING CLIENT INPUT — public email, item 09-12]
              </div>
              <div className="pending-placeholder text-[10px] w-full">
                [PENDING CLIENT INPUT — official helpline, item 09-13]
              </div>
              <div className="pending-placeholder text-[10px] w-full">
                [PENDING CLIENT INPUT — verified social profiles]
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Mi Udyojak Honarach. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Content Compliance Master Audit Applied</span>
            <span>•</span>
            <a href="#contact" className="hover:text-white transition-colors">Join Us</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
