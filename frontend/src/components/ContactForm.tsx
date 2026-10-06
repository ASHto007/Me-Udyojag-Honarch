import { CONTACT_ENDPOINT } from '../data/submissionConfig';
import { submitEnquiry, PREVIEW_MESSAGE } from '../services/enquiryService';

interface SubmissionResult {
  success: boolean;
  isPreview?: boolean;
  message: string;
  errors?: Record<string, string>;
}
import { SectionBackdrop } from './SectionBackdrop';
import React, { useState, useRef } from 'react';
import { Send, Info } from 'lucide-react';

export const ContactForm: React.FC<{ endpoint?: string }> = ({ endpoint = CONTACT_ENDPOINT }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    stage: 'Aspiring Entrepreneur (Idea Stage)',
    interest: 'Mentorship & Guidance (Service 03)',
    message: '',
    consent: false,
  });

  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pendingRef = useRef(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingRef.current) return;
    setResult(null);
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!(phoneDigits.length === 10 || (phoneDigits.length === 12 && phoneDigits.startsWith("91")))) {
      errors.phone = 'Please enter a valid 10-digit mobile number.';
    }


    const email = formData.email.trim();
    if (!email) {
      errors.email = 'Email Address is required.';
    } else if ((email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email))) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.city.trim()) {
      errors.city = 'City / District is required.';
    }

    if (!formData.consent) {
      errors.consent = 'You must consent to being contacted regarding your inquiry.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    pendingRef.current = true;
    setIsSubmitting(true);
    setResult(await submitEnquiry(formData, endpoint));
    pendingRef.current = false;
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section-with-backdrop w-full py-16 sm:py-24 bg-white border-b border-[#EAEAEA]">
      <SectionBackdrop label="CONTACT" />
      <div id="register" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Inspiration */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
              Take the First Step Towards Your Own Enterprise
            </h2>

            <p className="text-sm sm:text-base text-[#6D6D6D] leading-relaxed">
              Whether you have an idea in your head, an artisanal product in your home, or an early-stage venture ready to scale, join our community of aspiring Maharashtra entrepreneurs.
            </p>

          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FCFBF9] rounded-3xl p-6 sm:p-10 border border-[#EAEAEA] shadow-lg">
              
              {!endpoint && <p role="status" className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><strong>Form preview.</strong> {PREVIEW_MESSAGE}</p>}
              {result && <p role={result.success ? 'status' : 'alert'} className="mb-5 rounded-xl border border-[#EAEAEA] bg-white p-4 text-sm text-[#4B5563]"><Info className="inline h-4 w-4 mr-2" />{result.message}</p>}
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-[#111827]">
                      Join the Movement &amp; Express Interest
                    </h3>
                    <p className="text-xs text-[#6D6D6D] mt-1">
                      Fields marked with <span className="text-red-500 font-bold">*</span> are required.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="contact-fullName" className="block text-xs font-bold text-[#374151] uppercase mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-fullName"
                        name="fullName"
                        type="text"
                        required
                        aria-required="true"
                        aria-invalid={Boolean(validationErrors.fullName)}
                        aria-describedby={validationErrors.fullName ? 'contact-fullName-error' : undefined}
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (validationErrors.fullName) setValidationErrors({ ...validationErrors, fullName: '' });
                        }}
                        placeholder="e.g. Ramesh Kadam"
                        className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm outline-none transition-all ${
                          validationErrors.fullName
                            ? 'border-red-500 bg-red-50/30'
                            : 'border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20'
                        }`}
                      />
                      {validationErrors.fullName && (
                        <p id="contact-fullName-error" className="text-[11px] text-red-600 mt-1 font-medium">
                          {validationErrors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold text-[#374151] uppercase mb-1.5">
                        Mobile Number / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        aria-required="true"
                        aria-invalid={Boolean(validationErrors.phone)}
                        aria-describedby={validationErrors.phone ? 'contact-phone-error' : undefined}
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (validationErrors.phone) setValidationErrors({ ...validationErrors, phone: '' });
                        }}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm outline-none transition-all ${
                          validationErrors.phone
                            ? 'border-red-500 bg-red-50/30'
                            : 'border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20'
                        }`}
                      />
                      {validationErrors.phone && (
                        <p id="contact-phone-error" className="text-[11px] text-red-600 mt-1 font-medium">
                          {validationErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>


                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-[#374151] uppercase mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      autoComplete="email"
                      maxLength={254}
                      aria-invalid={Boolean(validationErrors.email)}
                      aria-describedby={validationErrors.email ? 'contact-email-error' : undefined}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (validationErrors.email) setValidationErrors({ ...validationErrors, email: '' });
                      }}
                      placeholder="name@business.com"
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm outline-none transition-all ${validationErrors.email ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20'}`}
                    />
                    {validationErrors.email && (
                      <p id="contact-email-error" className="text-[11px] text-red-600 mt-1 font-medium">
                        {validationErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* City / District */}
                    <div>
                      <label htmlFor="contact-city" className="block text-xs font-bold text-[#374151] uppercase mb-1.5">
                        City / District (Maharashtra) <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-city"
                        name="city"
                        type="text"
                        required
                        aria-required="true"
                        aria-invalid={Boolean(validationErrors.city)}
                        aria-describedby={validationErrors.city ? 'contact-city-error' : undefined}
                        autoComplete="address-level2"
                        value={formData.city}
                        onChange={(e) => {
                          setFormData({ ...formData, city: e.target.value });
                          if (validationErrors.city) setValidationErrors({ ...validationErrors, city: '' });
                        }}
                        placeholder="e.g. Pune, Kolhapur, Solapur..."
                        className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm outline-none transition-all ${
                          validationErrors.city
                            ? 'border-red-500 bg-red-50/30'
                            : 'border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20'
                        }`}
                      />
                      {validationErrors.city && (
                        <p id="contact-city-error" className="text-[11px] text-red-600 mt-1 font-medium">
                          {validationErrors.city}
                        </p>
                      )}
                    </div>

                    {/* Current Business Stage */}
                    <div>
                      <label htmlFor="contact-stage" className="block text-xs font-bold text-[#374151] uppercase mb-1.5">
                        Current Business Stage
                      </label>
                      <select
                        id="contact-stage"
                        name="stage"
                        aria-label="Current Business Stage"
                        value={formData.stage}
                        onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20 bg-white text-sm outline-none transition-all"
                      >
                        <option value="Aspiring Entrepreneur (Idea Stage)">Aspiring Entrepreneur (Idea Stage)</option>
                        <option value="Early Stage / Bootstrapped (< 2 Years)">Early Stage / Bootstrapped (&lt; 2 Years)</option>
                        <option value="Established Micro/Small Business (MSME)">Established Micro/Small Business (MSME)</option>
                        
                        <option value="Prospective Mentor / Advisor">Prospective Mentor / Advisor</option>
                      </select>
                    </div>
                  </div>

                  {/* Area of Primary Interest */}
                  <div>
                    <label htmlFor="contact-interest" className="block text-xs font-bold text-[#374151] uppercase mb-1.5">
                      Area of Primary Interest
                    </label>
                    <select
                      id="contact-interest"
                      name="interest"
                      aria-label="Area of Primary Interest"
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20 bg-white text-sm outline-none transition-all"
                    >
                      <option value="Mentorship & Guidance (Service 03)">Mentorship &amp; Guidance (Service 03)</option>
                      <option value="Networking Events & Seminars (Service 01)">Networking Events &amp; Seminars (Service 01)</option>
                      <option value="Business Promotion & Exhibitions (Service 02)">Business Promotion &amp; Exhibitions (Service 02)</option>
                      <option value="Awards & Recognition Program (Service 04)">Awards &amp; Recognition Program (Service 04)</option>
                    </select>
                  </div>

                  {/* Business Idea or Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-[#374151] uppercase mb-1.5">
                      Your Business Idea or Message <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us briefly about your venture, sector, or guidance required..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20 bg-white text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Contact Consent Checkbox */}
                  <div>
                    <label htmlFor="contact-consent" className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        id="contact-consent"
                        name="consent"
                        type="checkbox"
                        required
                        aria-required="true"
                        aria-invalid={Boolean(validationErrors.consent)}
                        aria-describedby={validationErrors.consent ? 'contact-consent-error' : undefined}
                        checked={formData.consent}
                        onChange={(e) => {
                          setFormData({ ...formData, consent: e.target.checked });
                          if (validationErrors.consent) setValidationErrors({ ...validationErrors, consent: '' });
                        }}
                        className="mt-0.5 rounded text-[#E27500] focus:ring-[#E27500]"
                      />
                      <span className="text-xs text-[#4B5563] leading-relaxed">
                        I consent to being contacted regarding my enterprise inquiry and receiving community guidance updates. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {validationErrors.consent && (
                      <p id="contact-consent-error" className="text-[11px] text-red-600 mt-1 font-medium">
                        {validationErrors.consent}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full bg-[#E27500] hover:bg-[#C56300] active:bg-[#B35500] text-white text-sm font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27500] group"
                    >
                      <span>{isSubmitting ? 'Sending...' : endpoint ? 'Submit Inquiry' : 'Preview Inquiry'}</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactForm;
