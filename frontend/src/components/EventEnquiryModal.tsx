import { EVENT_ENDPOINT } from '../data/submissionConfig';
import { PREVIEW_MESSAGE, submitEventJoinRequest } from '../services/eventRegistrationService';
import React, { useState, useRef, useId, useEffect } from 'react';
import { Modal } from './ui/Modal';
import { X, Calendar, MapPin, Send, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { isEventPassed, type EventItem } from '../data/eventsData';

export interface EventEnquiryModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
  triggerElementRef?: HTMLElement | null;
}

const INITIAL_FORM_DATA = {
  fullName: '',
  phone: '',
  email: '',
  businessName: '',
  netWorth: '',
  customNetWorth: '',
  cityDistrict: '',
  message: '',
  consent: false,
};

export const EventEnquiryModal: React.FC<EventEnquiryModalProps> = ({
  event,
  isOpen,
  onClose,
  triggerElementRef,
}) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: 'info' | 'error' | 'success';
  } | null>(null);

  const titleId = useId();
  const pendingRef = useRef(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const handleClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setFormData(INITIAL_FORM_DATA);
    setFieldErrors({});
    setToastMessage(null);
    setIsSubmittedSuccess(false);
    onClose();
  };

  if (!isOpen || !event || isEventPassed(event)) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingRef.current) return;
    pendingRef.current = true;

    setIsSubmitting(true);
    setToastMessage(null);
    setFieldErrors({});

    const finalNetWorth = formData.netWorth === 'Other'
      ? formData.customNetWorth.trim()
      : formData.netWorth.trim();

    const localErrors: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      localErrors.fullName = 'Full Name is required (minimum 2 characters).';
    }
    const digits = formData.phone.replace(/\D/g, '');
    if (!(digits.length === 10 || (digits.length === 12 && digits.startsWith('91')))) {
      localErrors.phone = 'Valid 10-digit mobile number is required.';
    }
    if (!formData.email.trim() || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(formData.email.trim())) {
      localErrors.email = 'Valid email address is required.';
    }
    if (!formData.businessName.trim() || formData.businessName.trim().length < 2) {
      localErrors.businessName = 'Business or organization name is required.';
    }
    if (!finalNetWorth) {
      localErrors.netWorth = 'Please select or enter your net worth / turnover.';
    }
    if (!formData.cityDistrict.trim() || formData.cityDistrict.trim().length < 2) {
      localErrors.cityDistrict = 'City / District is required.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      localErrors.message = 'Please provide details about your business and why you want to join (minimum 10 characters).';
    }
    if (!formData.consent) {
      localErrors.consent = 'Consent is required to proceed.';
    }

    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      setToastMessage({ text: 'Please complete all required fields for invitation review.', type: 'error' });
      pendingRef.current = false;
      setIsSubmitting(false);
      return;
    }

    const result = await submitEventJoinRequest({
      eventId: event.id,
      eventTitle: event.title,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      businessName: formData.businessName.trim(),
      netWorth: finalNetWorth,
      cityDistrict: formData.cityDistrict.trim(),
      message: formData.message.trim(),
      consent: formData.consent,
    }, EVENT_ENDPOINT);

    pendingRef.current = false;
    setIsSubmitting(false);

    if (result.errors) {
      setFieldErrors(result.errors);
      setToastMessage({ text: result.message, type: 'error' });
      return;
    }

    if (result.isPreview) {
      setToastMessage({ text: result.message, type: 'info' });
    } else if (result.success) {
      // Clear all input fields
      setFormData(INITIAL_FORM_DATA);
      setFieldErrors({});
      setToastMessage({ text: result.message, type: 'success' });
      setIsSubmittedSuccess(true);

      // Auto-close modal after brief duration so user sees confirmation
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      closeTimerRef.current = setTimeout(() => {
        handleClose();
      }, 1800);
    } else {
      setToastMessage({ text: result.message, type: 'error' });
    }
  };

  return (
    <Modal
      onClose={handleClose} labelledBy={titleId} trigger={triggerElementRef}
      className=" flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-xs"
    >
      {/* Modal Dialog Shell (Bottom Sheet on Mobile, Centered Modal on Desktop) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden max-h-[92dvh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="bg-[#1B2A3A] text-white p-5 sm:p-6 relative shrink-0">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close enquiry modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-[#E27500] text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27500]"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#FFB783] bg-[#E27500]/25 px-2.5 py-0.5 rounded-full border border-[#E27500]/40 mb-2">
            By Invitation & Screening Only
          </span>
          <h2 id={titleId} className="text-lg sm:text-xl font-extrabold text-white leading-snug pr-8">
            {event.title}
          </h2>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-300">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#E27500]" />
              <span>{event.date}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E27500]" />
              <span className="leading-relaxed">{event.location}</span>
            </span>
          </div>
        </div>

        {/* Dismissible Toast Banner */}
        {toastMessage && (
          <div
            role="alert"
            className={`px-5 py-3 text-xs flex items-start justify-between gap-2 shrink-0 ${
              toastMessage.type === 'info'
                ? 'bg-amber-50 text-amber-900 border-b border-amber-200'
                : toastMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border-b border-emerald-200'
                : 'bg-red-50 text-red-900 border-b border-red-200'
            }`}
          >
            <div className="flex items-start gap-2">
              {toastMessage.type === 'info' && <Info className="w-4 h-4 text-[#E27500] shrink-0 mt-0.5" />}
              {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
              {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />}
              <span className="font-semibold">{toastMessage.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-gray-400 hover:text-gray-700 cursor-pointer p-0.5"
              aria-label="Dismiss message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Scrollable Body: Dedicated Success Screen OR Registration Form */}
        {isSubmittedSuccess ? (
          <div className="p-8 sm:p-12 text-center space-y-5 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-sm">
              <h3 className="text-xl font-extrabold text-[#111827]">
                Registration Request Received!
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                {toastMessage?.text || 'Your registration request has been submitted successfully.'}
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 rounded-full bg-[#1B2A3A] hover:bg-[#E27500] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer shadow-xs"
              >
                Close Window Now
              </button>
            </div>
            <p className="text-[11px] text-gray-400">
              Closing window automatically in a moment...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto min-h-0 overscroll-contain space-y-4">
          {!EVENT_ENDPOINT && <p role="status" className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"><strong>Form preview.</strong> {PREVIEW_MESSAGE}</p>}

          {/* Full Venue Address Card */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#E27500] shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                  Venue & Official Address
                </div>
                <div className="font-bold text-[#0F172A] text-xs sm:text-sm">
                  {event.location}
                </div>
                {event.venueAddress && (
                  <div className="text-gray-600 text-[11px] sm:text-xs mt-1 leading-relaxed">
                    {event.venueAddress}
                  </div>
                )}
                {event.landmark && (
                  <div className="text-[10px] text-[#9A3412] mt-1 font-medium">
                    📍 Landmark: {event.landmark}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="enquiry-fullName" className="block text-xs font-bold text-[#374151] mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="enquiry-fullName"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Ramesh Kadam"
              className={`w-full px-3.5 py-2 rounded-xl border text-xs sm:text-sm outline-none transition-all ${
                fieldErrors.fullName ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20'
              }`}
            />
            {fieldErrors.fullName && (
              <p className="text-[11px] text-red-600 mt-1">{fieldErrors.fullName}</p>
            )}
          </div>

          {/* Phone & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="enquiry-phone" className="block text-xs font-bold text-[#374151] mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                id="enquiry-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className={`w-full px-3.5 py-2 rounded-xl border text-xs sm:text-sm outline-none transition-all ${
                  fieldErrors.phone ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20'
                }`}
              />
              {fieldErrors.phone && (
                <p className="text-[11px] text-red-600 mt-1">{fieldErrors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="enquiry-email" className="block text-xs font-bold text-[#374151] mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="enquiry-email"
                name="email"
                type="email"
                required
                aria-required="true"
                maxLength={254}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'enquiry-email-error' : undefined}
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@business.com"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20 text-xs sm:text-sm outline-none transition-all"
              />
              {fieldErrors.email && <p id="enquiry-email-error" className="text-[11px] text-red-600 mt-1">{fieldErrors.email}</p>}
            </div>
          </div>

          {/* Business & City Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="enquiry-businessName" className="block text-xs font-bold text-[#374151] mb-1">
                Business / Enterprise Name <span className="text-red-500">*</span>
              </label>
              <input
                id="enquiry-businessName"
                name="businessName"
                type="text"
                required
                autoComplete="organization"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="Enterprise / Firm Name"
                className={`w-full px-3.5 py-2 rounded-xl border text-xs sm:text-sm outline-none transition-all ${
                  fieldErrors.businessName ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20'
                }`}
              />
              {fieldErrors.businessName && (
                <p className="text-[11px] text-red-600 mt-1">{fieldErrors.businessName}</p>
              )}
            </div>

            <div>
              <label htmlFor="enquiry-cityDistrict" className="block text-xs font-bold text-[#374151] mb-1">
                City / District <span className="text-red-500">*</span>
              </label>
              <input
                id="enquiry-cityDistrict"
                name="cityDistrict"
                type="text"
                required
                autoComplete="address-level2"
                value={formData.cityDistrict}
                onChange={(e) => setFormData({ ...formData, cityDistrict: e.target.value })}
                placeholder="e.g. Pune, Kolhapur, Mumbai..."
                className={`w-full px-3.5 py-2 rounded-xl border text-xs sm:text-sm outline-none transition-all ${
                  fieldErrors.cityDistrict ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20'
                }`}
              />
              {fieldErrors.cityDistrict && (
                <p className="text-[11px] text-red-600 mt-1">{fieldErrors.cityDistrict}</p>
              )}
            </div>
          </div>

          {/* Business Turnover / Net Worth */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="enquiry-netWorth" className="block text-xs font-bold text-[#374151]">
                Business Turnover / Net Worth <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] text-[#E27500] font-semibold">
                Event Criteria: ₹50+ Cr / ₹100+ Cr
              </span>
            </div>
            <select
              id="enquiry-netWorth"
              name="netWorth"
              required
              value={formData.netWorth}
              onChange={(e) => setFormData({ ...formData, netWorth: e.target.value })}
              className={`w-full px-3.5 py-2 rounded-xl border text-xs sm:text-sm outline-none transition-all bg-white cursor-pointer ${
                fieldErrors.netWorth ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20'
              }`}
            >
              <option value="">Select Turnover Range (50+ Cr / 100+ Cr) *</option>
              <option value="₹50 Cr - ₹100 Cr">₹50 Cr - ₹100 Cr</option>
              <option value="₹100+ Cr">₹100+ Cr (Meets Event Criteria)</option>
              <option value="₹100 Cr - ₹250 Cr">₹100 Cr - ₹250 Cr</option>
              <option value="₹250 Cr - ₹500 Cr">₹250 Cr - ₹500 Cr</option>
              <option value="₹500+ Cr">₹500+ Cr</option>
              <option value="Other">Other (Specify custom turnover / net worth)</option>
            </select>
            {fieldErrors.netWorth && (
              <p className="text-[11px] text-red-600 mt-1">{fieldErrors.netWorth}</p>
            )}

            {formData.netWorth === 'Other' && (
              <div className="mt-2 animate-in fade-in duration-200">
                <input
                  type="text"
                  required
                  value={formData.customNetWorth}
                  onChange={(e) => setFormData({ ...formData, customNetWorth: e.target.value })}
                  placeholder="Specify turnover (e.g. ₹75 Cr, ₹120 Cr, ₹200+ Cr)"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20 text-xs sm:text-sm outline-none transition-all"
                />
              </div>
            )}
          </div>

          {/* About Your Business & Why You Want to Join */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="enquiry-message" className="block text-xs font-bold text-[#374151]">
                About Your Business & Why You Want To Join <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] text-gray-400">
                Min 10 characters
              </span>
            </div>
            <textarea
              id="enquiry-message"
              name="message"
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your business operations, products/services, and why you want to attend this exclusive conclave..."
              className={`w-full px-3.5 py-2 rounded-xl border text-xs sm:text-sm outline-none transition-all ${
                fieldErrors.message ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20'
              }`}
            />
            {fieldErrors.message && (
              <p className="text-[11px] text-red-600 mt-1">{fieldErrors.message}</p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-0.5 rounded text-[#E27500] focus:ring-[#E27500]"
              />
              <span className="text-xs text-[#4B5563] leading-relaxed">
                I consent to having my business credentials reviewed by the Mi Udyojak Honarach board for this event. <span className="text-red-500">*</span>
              </span>
            </label>
            {fieldErrors.consent && (
              <p className="text-[11px] text-red-600 mt-1">{fieldErrors.consent}</p>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-full bg-[#E27500] hover:bg-[#C56300] active:bg-[#B35500] text-white text-xs sm:text-sm font-bold tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27500]"
            >
              <span>{isSubmitting ? 'Submitting Application...' : 'Submit Invitation Request'}</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
        )}
      </div>
    </Modal>
  );
};

export default EventEnquiryModal;
