import { EVENT_ENDPOINT } from '../data/submissionConfig';
import { PREVIEW_MESSAGE } from '../services/submissionService';
import React, { useState, useRef, useId } from 'react';
import { Modal } from './ui/Modal';
import { X, Calendar, MapPin, Send, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { submitEventJoinRequest } from '../services/eventRegistrationService';
import type { EventItem } from '../data/eventsData';

export interface EventEnquiryModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
  triggerElementRef?: HTMLElement | null;
}

export const EventEnquiryModal: React.FC<EventEnquiryModalProps> = ({
  event,
  isOpen,
  onClose,
  triggerElementRef,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    businessName: '',
    cityDistrict: '',
    message: '',
    consent: false,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: 'info' | 'error' | 'success';
  } | null>(null);

  const titleId = useId();
  const pendingRef = useRef(false);
  if (!isOpen || !event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingRef.current) return;
    pendingRef.current = true;

    setIsSubmitting(true);
    setToastMessage(null);
    setFieldErrors({});

    const result = await submitEventJoinRequest({
      eventId: event.id,
      eventTitle: event.title,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      businessName: formData.businessName,
      cityDistrict: formData.cityDistrict,
      message: formData.message,
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
      setToastMessage({ text: result.message, type: 'success' });
    } else {
      setToastMessage({ text: result.message, type: 'error' });
    }
  };

  return (
    <Modal
      onClose={onClose} labelledBy={titleId} trigger={triggerElementRef}
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
            onClick={onClose}
            aria-label="Close enquiry modal"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-[#E27500] text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27500]"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#FFB783] bg-[#E27500]/25 px-2.5 py-0.5 rounded-full border border-[#E27500]/40 mb-2">
            Event Join Enquiry
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
              <span className="truncate max-w-[240px]">{event.location}</span>
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto min-h-0 overscroll-contain space-y-4">
          {!EVENT_ENDPOINT && <p role="status" className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"><strong>Form preview.</strong> {PREVIEW_MESSAGE}</p>}
          {/* Participation Notice */}
          <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200/80 text-[11px] text-[#92400E] leading-relaxed">
            <strong>Participation Note:</strong> Submitting an enquiry expresses interest in this event and does not confirm attendance.
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
                placeholder="name@example.com"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20 text-xs sm:text-sm outline-none transition-all"
              />
              {fieldErrors.email && <p id="enquiry-email-error" className="text-[11px] text-red-600 mt-1">{fieldErrors.email}</p>}
            </div>
          </div>

          {/* Business & City Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor="enquiry-businessName" className="block text-xs font-bold text-[#374151] mb-1">
                Business / Organization <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                id="enquiry-businessName"
                name="businessName"
                type="text"
                autoComplete="organization"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="Enterprise Name"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20 text-xs sm:text-sm outline-none transition-all"
              />
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
                placeholder="e.g. Pune, Kolhapur..."
                className={`w-full px-3.5 py-2 rounded-xl border text-xs sm:text-sm outline-none transition-all ${
                  fieldErrors.cityDistrict ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20'
                }`}
              />
              {fieldErrors.cityDistrict && (
                <p className="text-[11px] text-red-600 mt-1">{fieldErrors.cityDistrict}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="enquiry-message" className="block text-xs font-bold text-[#374151] mb-1">
              Message <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              id="enquiry-message"
              name="message"
              rows={2}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Brief note about your business activity or reason for joining..."
              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20 text-xs sm:text-sm outline-none transition-all"
            />
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
                I consent to being contacted by the Mi Udyojak Honarach coordination team regarding this event. <span className="text-red-500">*</span>
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
              <span>{isSubmitting ? 'Processing Request...' : 'Send Join Request'}</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EventEnquiryModal;
