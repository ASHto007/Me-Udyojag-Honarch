import React, { useId } from 'react';
import { Modal } from './ui/Modal';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const titleId = useId();

  if (!type) return null;

  return (
    <Modal
      onClose={onClose}
      labelledBy={titleId}
      className="flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden max-h-[90dvh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-[#111923] text-white p-6 relative shrink-0 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E27500]/20 text-[#FFB783] flex items-center justify-center">
              {type === 'privacy' ? <Shield className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#FFB783] tracking-widest block">
                LEGAL INFORMATION
              </span>
              <h2 id={titleId} className="text-lg sm:text-xl font-extrabold text-white">
                {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-full bg-white/10 hover:bg-[#E27500] text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p className="font-semibold text-gray-900">
                Last updated: October 2026 • Mi Udyojak Honarach (मी उद्योजक होणारच)
              </p>
              <h3 className="text-sm font-bold text-gray-900 pt-2">1. Information We Collect</h3>
              <p>
                When you submit an expression of interest, join enquiry, or event registration form on our website, we collect your name, mobile number, email address, city/district in Maharashtra, business stage, and area of primary interest.
              </p>
              <h3 className="text-sm font-bold text-gray-900 pt-2">2. Purpose of Collection</h3>
              <p>
                Your information is used solely to coordinate entrepreneurial mentorship, evaluate event participation, communicate relevant business guidance seminars, and connect you with program coordinators.
              </p>
              <h3 className="text-sm font-bold text-gray-900 pt-2">3. Data Protection &amp; Confidentiality</h3>
              <p>
                We do not sell, rent, or trade your personal data to commercial advertisers or third-party marketers. Submissions are processed with access restricted to authorized initiative coordinators.
              </p>
              <h3 className="text-sm font-bold text-gray-900 pt-2">4. Contact &amp; Consent</h3>
              <p>
                By checking the consent box on our forms, you permit our coordination team to contact you via telephone, SMS, or WhatsApp regarding your requested guidance and event updates. You may opt out at any time.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-gray-900">
                Last updated: October 2026 • Mi Udyojak Honarach (मी उद्योजक होणारच)
              </p>
              <h3 className="text-sm font-bold text-gray-900 pt-2">1. Community Movement Scope</h3>
              <p>
                Mi Udyojak Honarach is an entrepreneurial guidance and inspiration movement founded by Nilesh More. All seminars, masterclasses, and mentor sessions are designed for educational, networking, and developmental purposes.
              </p>
              <h3 className="text-sm font-bold text-gray-900 pt-2">2. Independent Business Decisions</h3>
              <p>
                Participation in our forums or mentorship programs does not constitute commercial partnership, financial underwriting, or guarantee of commercial success. All business decisions, investments, and regulatory filings remain the sole responsibility of each entrepreneur.
              </p>
              <h3 className="text-sm font-bold text-gray-900 pt-2">3. Event Participation &amp; Attendance</h3>
              <p>
                Submitting an event join request expresses interest and is subject to venue capacity and coordination team verification. Formal confirmation is provided prior to the scheduled date.
              </p>
              <h3 className="text-sm font-bold text-gray-900 pt-2">4. Intellectual Property</h3>
              <p>
                All brand identity assets, the title "मी उद्योजक होणारच / Mi Udyojak Honarach", logo, and original event documentation are the intellectual property of the initiative.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#111923] hover:bg-[#E27500] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
