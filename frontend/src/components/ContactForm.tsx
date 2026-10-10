import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { SectionBackdrop } from './SectionBackdrop';
import { Send, CheckCircle2, AlertCircle, Mail, Phone } from 'lucide-react';
import { apiClient } from '../services/apiClient';

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID || 'xzedgebd';

const INITIAL_FORM_DATA = {
  fullName: '',
  phone: '',
  email: '',
  city: '',
  stage: 'Aspiring Entrepreneur (Idea Stage)',
  interest: 'Mentorship & Guidance (Service 03)',
  message: '',
  consent: false,
};

export const ContactForm: React.FC<{ formId?: string }> = ({ formId = FORMSPREE_FORM_ID }) => {
  const [state, handleSubmit, reset] = useForm(formId);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!(phoneDigits.length === 10 || (phoneDigits.length === 12 && phoneDigits.startsWith('91')))) {
      errors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    const email = formData.email.trim();
    if (!email) {
      errors.email = 'Email Address is required.';
    } else if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
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

    // 1. Save directly to MongoDB backend REST API (persists in MongoDB & sends emails)
    apiClient.post('/enquiries', formData).then((res) => {
      console.log('[Backend Save Success]: Enquiry recorded in MongoDB database', res);
    }).catch((err) => {
      console.warn('[Backend Save Note]:', err?.message || err);
    });

    // 2. Submit to Formspree via @formspree/react hook
    await handleSubmit(e);
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

            {/* Official Contact Box */}
            <div className="p-5 rounded-2xl bg-[#FCFBF9] border border-[#EAEAEA] shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E27500]">
                <Mail className="w-4 h-4 text-[#E27500]" />
                <span>Direct Official Contact</span>
              </div>
              <p className="text-xs text-[#6D6D6D] leading-relaxed">
                For office communication, sponsorship, or conclave inquiries:
              </p>
              <div className="space-y-2 pt-0.5">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#111827]">
                  <Phone className="w-3.5 h-3.5 text-[#E27500] shrink-0" />
                  <a href="tel:+917400119436" className="hover:text-[#E27500] transition-colors">
                    +91 74001 19436
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#111827]">
                  <Mail className="w-3.5 h-3.5 text-[#E27500] shrink-0" />
                  <a
                    href="mailto:miudyojakhonarch@gmail.com"
                    className="hover:text-[#E27500] transition-colors"
                  >
                    miudyojakhonarch@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FCFBF9] rounded-3xl p-6 sm:p-10 border border-[#EAEAEA] shadow-lg">
              
              {state.succeeded ? (
                <div className="text-center py-8 sm:py-12 px-4 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="text-2xl font-extrabold text-[#111827]">
                      Inquiry Received Successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6D6D6D] leading-relaxed">
                      Thank you for expressing interest in Mi Udyojak Honarach. We have received your inquiry via Formspree, and our team will connect with you shortly.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        reset();
                        setFormData(INITIAL_FORM_DATA);
                        setValidationErrors({});
                      }}
                      className="px-6 py-2.5 rounded-full bg-[#E27500] hover:bg-[#C56300] text-white text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                  <input
                    type="hidden"
                    name="_subject"
                    value={`[Mi Udyojak Honarach Inquiry] ${formData.fullName || 'New Website Inquiry'}`}
                  />

                  <div>
                    <h3 className="text-xl font-bold text-[#111827]">
                      Join the Movement &amp; Express Interest
                    </h3>
                    <p className="text-xs text-[#6D6D6D] mt-1">
                      Fields marked with <span className="text-red-500 font-bold">*</span> are required.
                    </p>
                  </div>

                  {state.errors && !state.succeeded && (
                    <div
                      role="alert"
                      className="rounded-2xl border border-red-200 bg-red-50 text-red-900 p-4 text-xs sm:text-sm flex items-start gap-3 shadow-2xs"
                    >
                      <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                      <div className="flex-1 font-semibold leading-relaxed">
                        Unable to submit inquiry via Formspree. Please verify your details or try again.
                      </div>
                    </div>
                  )}

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
                      <ValidationError prefix="Full Name" field="fullName" errors={state.errors} className="text-[11px] text-red-600 mt-1 font-medium" />
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
                      <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-[11px] text-red-600 mt-1 font-medium" />
                    </div>
                  </div>

                  {/* Email */}
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
                      className={`w-full px-4 py-2.5 rounded-xl border bg-white text-sm outline-none transition-all ${
                        validationErrors.email ? 'border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20'
                      }`}
                    />
                    {validationErrors.email && (
                      <p id="contact-email-error" className="text-[11px] text-red-600 mt-1 font-medium">
                        {validationErrors.email}
                      </p>
                    )}
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-[11px] text-red-600 mt-1 font-medium" />
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
                      <ValidationError prefix="City" field="city" errors={state.errors} className="text-[11px] text-red-600 mt-1 font-medium" />
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
                      <ValidationError prefix="Stage" field="stage" errors={state.errors} className="text-[11px] text-red-600 mt-1 font-medium" />
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
                    <ValidationError prefix="Interest" field="interest" errors={state.errors} className="text-[11px] text-red-600 mt-1 font-medium" />
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
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-[11px] text-red-600 mt-1 font-medium" />
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
                      disabled={state.submitting}
                      className="w-full py-3.5 px-6 rounded-full bg-[#E27500] hover:bg-[#C56300] active:bg-[#B35500] text-white text-sm font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27500] disabled:opacity-60 disabled:cursor-not-allowed group"
                    >
                      <span>{state.submitting ? 'Sending...' : 'Submit Inquiry'}</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
