import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { PUBLIC_CONTACT } from '../data/publicContact';
import { LegalModal } from './LegalModal';

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="w-full bg-[#0D1520] text-white pt-16 pb-28 sm:pb-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="Mi Udyojak Honarach Logo"
                className="h-12 w-auto object-contain bg-white rounded-lg p-1"
                width={48}
                height={48}
                loading="lazy"
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
              An entrepreneurial guidance movement founded by Nilesh More, inspiring aspiring founders to develop confidence, determination, and enterprise acumen across Maharashtra.
            </p>

            {/* Direct WhatsApp CTA Button - hidden as requested */}
            {/*
            <div className="pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs group"
                aria-label="Connect via WhatsApp (opens in a new tab)"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Enquiry</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
            */}
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
              <li><a href="#community" className="hover:text-[#E27500] transition-colors">Events</a></li>
              {/* <li><a href="#stories" className="hover:text-[#E27500] transition-colors">Success Stories</a></li> */}
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
              <li>• Recognition &amp; Industry Felicitations</li>
              <li>• Inter-Enterprise Collaborations</li>
            </ul>
          </div>

          {/* Public Inquiries & Communication */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFB783]">
              Inquiries &amp; Contact
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              {PUBLIC_CONTACT.phone && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-3.5 h-3.5 text-[#E27500] shrink-0" />
                  <a
                    href={`tel:${PUBLIC_CONTACT.phone.replace(/[\s-]+/g, '')}`}
                    className="hover:text-[#FFB783] transition-colors"
                  >
                    {PUBLIC_CONTACT.phone}
                  </a>
                </div>
              )}
              {PUBLIC_CONTACT.email && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-3.5 h-3.5 text-[#E27500] shrink-0" />
                  <a
                    href={`mailto:${PUBLIC_CONTACT.email}`}
                    className="hover:text-[#FFB783] transition-colors"
                  >
                    {PUBLIC_CONTACT.email}
                  </a>
                </div>
              )}
              {PUBLIC_CONTACT.address && (
                <div className="flex items-start gap-2 text-gray-300">
                  <MapPin className="w-3.5 h-3.5 text-[#E27500] shrink-0 mt-0.5" />
                  <span>{PUBLIC_CONTACT.address}</span>
                </div>
              )}

              <p className="leading-relaxed text-gray-400">
                To submit an enterprise inquiry or register for an upcoming event, visit our registration desk.
              </p>
              <div className="pt-1">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFB783] hover:text-white transition-colors"
                >
                  <span>Go to Registration Desk →</span>
                </a>
              </div>

              {/* Conditional Social Media Channels (Rendered only when valid URLs exist) */}
              {(PUBLIC_CONTACT.instagram || PUBLIC_CONTACT.facebook || PUBLIC_CONTACT.youtube || PUBLIC_CONTACT.linkedin) && (
                <div className="flex items-center gap-3 pt-2">
                  {PUBLIC_CONTACT.instagram && (
                    <a href={PUBLIC_CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-[#E27500] transition-colors">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </a>
                  )}
                  {PUBLIC_CONTACT.facebook && (
                    <a href={PUBLIC_CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-[#E27500] transition-colors">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                  )}
                  {PUBLIC_CONTACT.youtube && (
                    <a href={PUBLIC_CONTACT.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 hover:text-[#E27500] transition-colors">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg>
                    </a>
                  )}
                  {PUBLIC_CONTACT.linkedin && (
                    <a href={PUBLIC_CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-[#E27500] transition-colors">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.62-1.63-1.62Z"/></svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Mi Udyojak Honarach. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>Founder &amp; Convener: Nilesh More</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer underline-offset-2 hover:underline"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-white transition-colors cursor-pointer underline-offset-2 hover:underline"
            >
              Terms &amp; Conditions
            </button>
            <span>•</span>
            <a href="#contact" className="hover:text-white transition-colors">Join Movement</a>
          </div>
        </div>

      </div>

      {/* Accessible Legal Dialog Modal */}
      <LegalModal
        type={legalModal}
        onClose={() => setLegalModal(null)}
      />
    </footer>
  );
};

export default Footer;
