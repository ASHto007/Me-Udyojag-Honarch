import { hasEventPhotos } from '../data/galleryData';
import { SectionBackdrop } from './SectionBackdrop';
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Building, Award, ArrowUpRight, Image, ChevronRight } from 'lucide-react';
import { EVENTS_DATA, type EventItem } from '../data/eventsData';
import { EventEnquiryModal } from './EventEnquiryModal';

export const Events: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [enquiryEvent, setEnquiryEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);

  const upcomingEvents = EVENTS_DATA.filter((e) => e.type === 'upcoming' && (!e.endsAt || Date.parse(e.endsAt) > Date.now()));
  const pastEvents = EVENTS_DATA.filter((e) => (e.type === 'past' || Boolean(e.endsAt && Date.parse(e.endsAt) <= Date.now())));

  const featuredUpcoming = upcomingEvents.find((e) => e.isFeatured) || upcomingEvents[0];
  const supportingUpcoming = upcomingEvents.filter((e) => e.id !== featuredUpcoming?.id);

  const handleOpenEnquiry = (event: EventItem, e: React.MouseEvent<HTMLElement>) => {
    if (!event.allowsEnquiry || event.type === 'past' || Boolean(event.endsAt && Date.parse(event.endsAt) <= Date.now())) return;
    setTriggerElement(e.currentTarget);
    setEnquiryEvent(event);
    setIsModalOpen(true);
  };

  return (
    <section id="community" className="section-with-backdrop w-full py-16 sm:py-24 bg-white border-b border-[#EAEAEA]">
      <SectionBackdrop label="EVENTS" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Community &amp; Major Conclaves
          </h2>
          <p className="text-sm sm:text-base text-[#6D6D6D] mt-2">
            Community gatherings and entrepreneurship events.
          </p>
          {/* Accessible Tab Switcher */}
          <div
            role="tablist"
            aria-label="Events Selection"
            onKeyDown={(e) => {
              if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
              e.preventDefault();
              const next = e.key === 'Home' ? 'upcoming' : e.key === 'End' ? 'past' : activeTab === 'upcoming' ? 'past' : 'upcoming';
              setActiveTab(next);
              document.getElementById('tab-' + next)?.focus();
            }}
            className="inline-flex p-1.5 rounded-full bg-[#F3F4F6] border border-gray-200 mt-6"
          >
            <button
              id="tab-upcoming"
              role="tab"
              type="button"
              aria-selected={activeTab === 'upcoming'}
              aria-controls="panel-upcoming"
              tabIndex={activeTab === 'upcoming' ? 0 : -1}
              onClick={() => setActiveTab('upcoming')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27500] ${
                activeTab === 'upcoming'
                  ? 'bg-[#E27500] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upcoming Events ({upcomingEvents.length})
            </button>
            <button
              id="tab-past"
              role="tab"
              type="button"
              aria-selected={activeTab === 'past'}
              aria-controls="panel-past"
              tabIndex={activeTab === 'past' ? 0 : -1}
              onClick={() => setActiveTab('past')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27500] ${
                activeTab === 'past'
                  ? 'bg-[#E27500] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Past Events ({pastEvents.length})
            </button>
          </div>
        </div>

        {/* ─── TAB PANEL: UPCOMING EVENTS ─── */}
        {activeTab === 'upcoming' && (
          <div
            id="panel-upcoming"
            role="tabpanel"
            aria-labelledby="tab-upcoming"
            className="space-y-8 animate-in fade-in duration-200"
          >
            {!upcomingEvents.length && <p className="rounded-2xl border border-[#EAEAEA] bg-[#FCFBF9] p-8 text-center text-sm text-gray-600">Upcoming events will be published here once confirmed.</p>}
            {/* Prominent Featured Event Card */}
            {featuredUpcoming && (
              <div className="rounded-3xl overflow-hidden border-2 border-[#E27500] bg-gradient-to-br from-[#FFFBEB] via-white to-orange-50/40 p-6 sm:p-10 shadow-lg relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="inline-flex items-center gap-2">
                      <span className="text-[10px] uppercase font-extrabold px-3 py-1 rounded-full bg-[#E27500] text-white tracking-wider">
                        {featuredUpcoming.category || "UPCOMING EVENT"}
                      </span>
                      {featuredUpcoming.marathiTitle && (
                        <span className="text-xs font-marathi text-[#B45309] font-bold">
                          {featuredUpcoming.marathiTitle}
                        </span>
                      )}
                    </div>

                    {featuredUpcoming.image && <img src={featuredUpcoming.image} alt={featuredUpcoming.imageAlt || featuredUpcoming.title} loading="lazy" decoding="async" width={900} height={506} className="mb-5 aspect-video w-full rounded-xl object-cover" />}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
                      {featuredUpcoming.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                      {featuredUpcoming.description}
                    </p>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-orange-200/70 shadow-xs">
                        <Calendar className="w-5 h-5 text-[#E27500] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date</div>
                          <div className="text-xs font-extrabold text-[#111827]">{featuredUpcoming.date}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-orange-200/70 shadow-xs">
                        <Clock className="w-5 h-5 text-[#E27500] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Timing</div>
                          <div className="text-xs font-extrabold text-[#111827]">{featuredUpcoming.time}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-orange-200/70 shadow-xs">
                        <Building className="w-5 h-5 text-[#E27500] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Venue</div>
                          <div className="text-xs font-extrabold text-[#111827] break-words">{featuredUpcoming.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Action Block */}
                  <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-orange-200 text-center shadow-sm">
                    <span className="text-xs font-bold text-[#E27500] uppercase tracking-wider mb-2">
                      Participation Protocol
                    </span>
                    <div className="text-lg font-bold text-[#111827] mb-2">
                      {featuredUpcoming.statusBadge}
                    </div>
                    <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                      Enquire about participation in this event.
                    </p>
                    <button
                      type="button"
                      disabled={!featuredUpcoming.allowsEnquiry}
                      onClick={(e) => handleOpenEnquiry(featuredUpcoming, e)}
                      className="disabled:opacity-60 disabled:cursor-not-allowed w-full py-3 px-5 rounded-full bg-[#1F2937] hover:bg-[#E27500] text-white text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27500]"
                    >
                      <span>Join Event</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Smaller Supporting Upcoming Events Grid */}
            {supportingUpcoming.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {supportingUpcoming.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#FCFBF9] rounded-2xl border border-[#EAEAEA] hover:border-[#E27500]/50 p-6 transition-all duration-300 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-100 text-[#B45309]">
                          {item.statusBadge}
                        </span>
                        <span className="text-xs font-mono text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#E27500]" />
                          {item.date}
                        </span>
                      </div>

                      {item.image && <img src={item.image} alt={item.imageAlt || item.title} loading="lazy" decoding="async" width={600} height={338} className="mb-4 aspect-video w-full rounded-xl object-cover" />}
                      <h3 className="text-lg font-bold text-[#111827] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-[#6D6D6D] mb-4">
                        <MapPin className="w-3.5 h-3.5 text-[#E27500] shrink-0" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">
                        {item.time}
                      </span>
                      <button
                        type="button"
                        disabled={!item.allowsEnquiry}
                        onClick={(e) => handleOpenEnquiry(item, e)}
                        className="disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-1 text-xs font-bold text-[#E27500] hover:text-[#C56300] cursor-pointer"
                      >
                        <span>Join Event</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── TAB PANEL: PAST EVENTS ─── */}
        {activeTab === 'past' && (
          <div
            id="panel-past"
            role="tabpanel"
            aria-labelledby="tab-past"
            className="space-y-6 animate-in fade-in duration-200"
          >
            {!pastEvents.length && <p className="rounded-2xl border border-[#EAEAEA] bg-[#FCFBF9] p-8 text-center text-sm text-gray-600">Past event records will be published here once confirmed.</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastEvents.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#FCFBF9] border border-[#EAEAEA] p-6 sm:p-7 flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#E27500]" />
                        <span className="text-xs font-bold text-[#6D6D6D] bg-white px-2.5 py-0.5 rounded-full border border-gray-200">
                          {item.date}
                        </span>
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                        {item.statusBadge}
                      </span>
                    </div>

                    {item.image && <img src={item.image} alt={item.imageAlt || item.title} loading="lazy" decoding="async" width={600} height={338} className="mb-4 aspect-video w-full rounded-xl object-cover" />}
                    <h3 className="text-lg font-bold text-[#111827] mb-2">
                      {item.title}
                    </h3>

                    {item.marathiTitle && (
                      <div className="text-xs font-marathi text-[#B45309] font-medium mb-3">
                        {item.marathiTitle}
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-[#6D6D6D] mb-4">
                      <MapPin className="w-3.5 h-3.5 text-[#E27500] shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Past events do NOT offer active registration; instead offer Gallery view if photos exist */}
                  <div className="pt-4 border-t border-gray-200/80 flex items-center justify-between">
                    <span className="text-xs text-gray-500 italic">
                      {item.recapNote || 'Archived historical event record.'}
                    </span>
                    {item.recapUrl && <a href={item.recapUrl} className="inline-flex min-h-11 items-center text-xs font-bold text-[#9A4D00]">View Recap</a>}
                    {hasEventPhotos(item.id) && (
                      <a
                        href={`?galleryEvent=${encodeURIComponent(item.id)}#gallery`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-gray-50 border border-gray-300 text-xs font-bold text-[#1F2937] transition-colors shadow-2xs"
                      >
                        <Image className="w-3.5 h-3.5 text-[#E27500]" />
                        <span>View Photos</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Event Enquiry Modal */}
      <EventEnquiryModal
        key={enquiryEvent?.id ?? "closed"}
        event={enquiryEvent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEnquiryEvent(null);
        }}
        triggerElementRef={triggerElement}
      />
    </section>
  );
};

export default Events;
