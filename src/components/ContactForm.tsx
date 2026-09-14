import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    stage: 'Aspiring Entrepreneur',
    interest: 'Mentorship & Guidance',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full py-16 sm:py-24 bg-white border-b border-[#EAEAEA]">
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

            {/* Direct Contact Notice */}
            <div className="p-5 rounded-2xl bg-[#FCFBF9] border border-[#EAEAEA] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111827]">
                <AlertCircle className="w-4 h-4 text-[#E27500]" />
                <span>Public Communications Channels</span>
              </div>
              <div className="pending-placeholder text-[11px] w-full">
                [PENDING CLIENT INPUT — public phone, email, WhatsApp integration, section 09]
              </div>
              <div className="pending-placeholder text-[11px] w-full">
                [PENDING CLIENT INPUT — official head office address, item 09-11]
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#1B2A3A] text-white">
              <h4 className="text-base font-bold text-white mb-2">
                Upcoming Flagship: NSE Mumbai 2026
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                If applying for an invite to the Global Marathi Entrepreneurship Expo at NSE India (27 Oct 2026), please specify your annual turnover in the message field below.
              </p>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FCFBF9] rounded-3xl p-6 sm:p-10 border border-[#EAEAEA] shadow-lg">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#111827]">
                    Inquiry Received!
                  </h3>
                  <p className="text-sm text-[#4B5563] max-w-md mx-auto">
                    Thank you, <strong>{formData.fullName}</strong>. Your details have been submitted to the Mi Udyojak Honarach coordination desk.
                  </p>
                  <div className="pending-placeholder text-[11px] max-w-sm mx-auto">
                    [PENDING CLIENT INPUT — submission routing & autoresponder message]
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-full bg-[#1F2937] text-white text-xs font-semibold hover:bg-black transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-[#111827] mb-2">
                    Join the Movement & Express Interest
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#374151] uppercase mb-1.5">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Ramesh Kadam"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20 bg-white text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#374151] uppercase mb-1.5">
                        Mobile Number / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20 bg-white text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#374151] uppercase mb-1.5">
                        City / District (Maharashtra) *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Pune, Kolhapur, Solapur..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20 bg-white text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#374151] uppercase mb-1.5">
                        Current Business Stage
                      </label>
                      <select
                        value={formData.stage}
                        onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20 bg-white text-sm outline-none transition-all"
                      >
                        <option>Aspiring Entrepreneur (Idea Stage)</option>
                        <option>Early Stage / Bootstrapped (&lt; 2 Years)</option>
                        <option>Established Micro/Small Business (MSME)</option>
                        <option>Crore-Level Business (Seeking Expo 2026 Access)</option>
                        <option>Prospective Mentor / Advisor</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] uppercase mb-1.5">
                      Area of Primary Interest
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20 bg-white text-sm outline-none transition-all"
                    >
                      <option>Mentorship & Guidance (Service 03)</option>
                      <option>Networking Events & Seminars (Service 01)</option>
                      <option>Business Promotion & Exhibitions (Service 02)</option>
                      <option>Awards & Recognition Program (Service 04)</option>
                      <option>Global Marathi Entrepreneurship Expo 2026</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] uppercase mb-1.5">
                      Your Business Idea or Message
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us briefly about your venture, sector, or what guidance you need..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#E27500] focus:ring-2 focus:ring-[#E27500]/20 bg-white text-sm outline-none transition-all"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-full bg-[#E27500] hover:bg-[#C56300] text-white text-sm font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <span>Submit Details</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="pt-2">
                    <div className="pending-placeholder text-[11px] w-full text-center">
                      [PENDING CLIENT INPUT — submission routing, WhatsApp integration, section 09]
                    </div>
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
