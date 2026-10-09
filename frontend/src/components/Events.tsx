import { hasEventPhotos } from '../data/galleryData';
import { SectionBackdrop } from './SectionBackdrop';
import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Building,
  CheckCircle2,
  ArrowUpRight,
  Image,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { EVENTS_DATA, isEventPassed, type EventItem } from '../data/eventsData';
import { EventEnquiryModal } from './EventEnquiryModal';

export const Events: React.FC = () => {
  const [enquiryEvent, setEnquiryEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
  const [now] = useState(() => Date.now());

  // Dynamically separate events into upcoming and completed based on event date & timestamp
  const { upcomingEvents, completedEvents } = useMemo(() => {
    const upcoming: EventItem[] = [];
    const completed: EventItem[] = [];

    for (const event of EVENTS_DATA) {
      if (isEventPassed(event, now)) {
        completed.push(event);
      } else {
        upcoming.push(event);
      }
    }

    return {
      upcomingEvents: upcoming,
      completedEvents: completed,
    };
  }, [now]);

  // Default active tab to 'upcoming' if any exist, otherwise 'completed'
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>(() => {
    return upcomingEvents.length > 0 ? 'upcoming' : 'completed';
  });

  const featuredUpcoming = upcomingEvents.find((e) => e.isFeatured) || upcomingEvents[0];
  const supportingUpcoming = upcomingEvents.filter((e) => e.id !== featuredUpcoming?.id);

  const handleOpenEnquiry = (event: EventItem, e: React.MouseEvent<HTMLElement>) => {
    if (!event.allowsEnquiry || isEventPassed(event, now)) return;
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-[#E27500] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>राज्यस्तरीय उपक्रम व परिषदा</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Community &amp; Major Conclaves
          </h2>
          <p className="text-sm sm:text-base text-[#6D6D6D] mt-2">
            State-level entrepreneurial gatherings, executive conclaves, and historical symposium archives.
          </p>

          {/* Tab Switcher: Always visible to effortlessly browse Upcoming & Completed events */}
          <div
            role="tablist"
            aria-label="Events Category Selection"
            onKeyDown={(e) => {
              if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
              e.preventDefault();
              const next =
                e.key === 'Home'
                  ? 'upcoming'
                  : e.key === 'End'
                  ? 'completed'
                  : activeTab === 'upcoming'
                  ? 'completed'
                  : 'upcoming';
              setActiveTab(next);
              document.getElementById('tab-' + next)?.focus();
            }}
            className="inline-flex p-1.5 rounded-full bg-[#F3F4F6] border border-gray-200 mt-6 shadow-inner"
          >
            <button
              id="tab-upcoming"
              role="tab"
              type="button"
              aria-selected={activeTab === 'upcoming'}
              aria-controls="panel-upcoming"
              tabIndex={activeTab === 'upcoming' ? 0 : -1}
              onClick={() => setActiveTab('upcoming')}
              className={`px-5 sm:px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27500] ${
                activeTab === 'upcoming'
                  ? 'bg-[#E27500] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Upcoming Events</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === 'upcoming' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {upcomingEvents.length}
              </span>
            </button>

            <button
              id="tab-completed"
              role="tab"
              type="button"
              aria-selected={activeTab === 'completed'}
              aria-controls="panel-completed"
              tabIndex={activeTab === 'completed' ? 0 : -1}
              onClick={() => setActiveTab('completed')}
              className={`px-5 sm:px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27500] ${
                activeTab === 'completed'
                  ? 'bg-[#E27500] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Completed Events</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === 'completed' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {completedEvents.length}
              </span>
            </button>
          </div>
        </div>

        {/* ─── TAB PANEL: UPCOMING EVENTS ─── */}
        {activeTab === 'upcoming' && (
          <div
            id="panel-upcoming"
            role="tabpanel"
            aria-labelledby="tab-upcoming"
            className="space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto"
          >
            {upcomingEvents.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-[#FCFBF9] p-10 text-center space-y-3">
                <Calendar className="w-10 h-10 text-gray-400 mx-auto" />
                <h3 className="text-base font-bold text-gray-800">
                  No Active Upcoming Events Scheduled
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                  New conclaves and state programs will be published here upon official announcement. You can explore archives in the Completed Events tab.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('completed')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors cursor-pointer mt-2"
                >
                  <span>View Completed Events ({completedEvents.length})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                {/* Featured Upcoming Event Card */}
                {featuredUpcoming && (
                  <div className="rounded-2xl overflow-hidden border border-orange-200/80 bg-gradient-to-br from-[#FFFBEB]/70 via-white to-orange-50/30 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all relative">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
                      {/* Left Column: Image with floating category badge */}
                      <div className="md:col-span-5 flex flex-col justify-center">
                        <div className="relative w-full h-64 sm:h-80 md:h-full min-h-[260px] md:min-h-[360px] rounded-xl overflow-hidden bg-white border border-orange-200/70 shadow-xs flex items-center justify-center p-2 group">
                          {featuredUpcoming.image ? (
                            <img
                              src={featuredUpcoming.image}
                              alt={featuredUpcoming.imageAlt || featuredUpcoming.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-contain max-h-[380px] transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                          ) : (
                            <div className="w-full h-full bg-orange-100/50 flex items-center justify-center">
                              <Calendar className="w-10 h-10 text-[#E27500]/50" />
                            </div>
                          )}
                          <div className="absolute top-3 left-3">
                            <span className="text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full bg-[#E27500] text-white shadow-xs tracking-wider">
                              {featuredUpcoming.category || 'UPCOMING CONCLAVE'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Details, metadata & CTA */}
                      <div className="md:col-span-7 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                            {featuredUpcoming.marathiTitle && (
                              <span className="text-xs font-marathi text-[#B45309] font-bold">
                                {featuredUpcoming.marathiTitle}
                              </span>
                            )}
                            <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-[#B45309] border border-orange-200/60 ml-auto">
                              {featuredUpcoming.statusBadge}
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight leading-snug">
                            {featuredUpcoming.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mt-1.5 line-clamp-3">
                            {featuredUpcoming.description}
                          </p>
                        </div>

                        {/* Metadata & Venue Grid */}
                        <div className="space-y-2 py-1">
                          {/* Date & Timing Row */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-orange-200/50 shadow-2xs">
                              <Calendar className="w-4 h-4 text-[#E27500] shrink-0" />
                              <div className="min-w-0">
                                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Date</div>
                                <div className="text-[12px] font-bold text-[#111827]">{featuredUpcoming.date}</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-orange-200/50 shadow-2xs">
                              <Clock className="w-4 h-4 text-[#E27500] shrink-0" />
                              <div className="min-w-0">
                                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Timing</div>
                                <div className="text-[12px] font-bold text-[#111827]">{featuredUpcoming.time}</div>
                              </div>
                            </div>
                          </div>

                          {/* Full Venue Address Card */}
                          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-orange-200/60 shadow-2xs">
                            <Building className="w-4 h-4 text-[#E27500] shrink-0 mt-0.5" />
                            <div className="min-w-0 flex-1">
                              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Venue &amp; Official Address</div>
                              <div className="text-xs sm:text-sm font-bold text-[#111827] leading-snug">
                                {featuredUpcoming.location}
                              </div>
                              {featuredUpcoming.venueAddress && (
                                <div className="text-[11px] sm:text-xs text-[#4B5563] mt-1 leading-relaxed">
                                  {featuredUpcoming.venueAddress}
                                </div>
                              )}
                              {featuredUpcoming.landmark && (
                                <div className="text-[10px] text-[#9A3412] mt-1 font-medium flex items-center gap-1">
                                  <span>📍 Landmark:</span> {featuredUpcoming.landmark}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action Row */}
                        <div className="pt-2 flex items-center justify-between gap-3 border-t border-orange-100">
                          <span className="text-[11px] text-gray-500 font-medium hidden sm:inline">
                            By invitation & screening for business leaders
                          </span>
                          <button
                            type="button"
                            disabled={!featuredUpcoming.allowsEnquiry}
                            onClick={(e) => handleOpenEnquiry(featuredUpcoming, e)}
                            className="disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1F2937] hover:bg-[#E27500] text-white text-xs font-bold tracking-wide transition-colors shadow-xs cursor-pointer ml-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27500]"
                          >
                            <span>Request Invitation</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Supporting Upcoming Events Grid */}
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

                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.imageAlt || item.title}
                              loading="lazy"
                              decoding="async"
                              width={600}
                              height={338}
                              className="mb-4 aspect-video w-full rounded-xl object-cover"
                            />
                          )}
                          <h3 className="text-lg font-bold text-[#111827] mb-2">{item.title}</h3>
                          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                            {item.description}
                          </p>

                          <div className="flex items-start gap-2 text-xs text-[#4B5563] mb-4 p-2.5 rounded-lg bg-orange-50/40 border border-orange-100">
                            <MapPin className="w-3.5 h-3.5 text-[#E27500] shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <span className="font-bold text-[#111827] block">{item.location}</span>
                              {item.venueAddress && (
                                <span className="text-[11px] text-gray-500 block mt-0.5 leading-relaxed">
                                  {item.venueAddress}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-500">{item.time}</span>
                          <button
                            type="button"
                            disabled={!item.allowsEnquiry}
                            onClick={(e) => handleOpenEnquiry(item, e)}
                            className="disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-1 text-xs font-bold text-[#E27500] hover:text-[#C56300] cursor-pointer"
                          >
                            <span>Request Invite</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ─── TAB PANEL: COMPLETED EVENTS ─── */}
        {activeTab === 'completed' && (
          <div
            id="panel-completed"
            role="tabpanel"
            aria-labelledby="tab-completed"
            className="space-y-6 animate-in fade-in duration-200 max-w-5xl mx-auto"
          >
            {completedEvents.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-[#FCFBF9] p-10 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h3 className="text-base font-bold text-gray-800">
                  No Completed Event Archives Yet
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                  When scheduled events pass their date, they automatically archive here with photos, attendee stats, and symposium documentation.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedEvents.map((item) => {
                  const hasPhotos = hasEventPhotos(item.id);

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-[#FCFBF9] border border-[#EAEAEA] hover:border-emerald-300/80 p-6 sm:p-7 flex flex-col justify-between shadow-xs transition-all duration-300 hover:shadow-md"
                    >
                      <div>
                        {/* Header Badges: Date & Concluded Status */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-2xs">
                            <Calendar className="w-3.5 h-3.5 text-[#E27500]" />
                            <span>{item.date}</span>
                          </div>

                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>संपन्न (Completed)</span>
                          </span>
                        </div>

                        {/* Banner Image with Category Pill */}
                        {item.image && (
                          <div className="relative mb-4 rounded-xl overflow-hidden aspect-video bg-gray-100 border border-gray-200 group">
                            <img
                              src={item.image}
                              alt={item.imageAlt || item.title}
                              loading="lazy"
                              decoding="async"
                              width={600}
                              height={338}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                            {item.category && (
                              <div className="absolute top-2.5 left-2.5">
                                <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-black/75 text-white backdrop-blur-xs tracking-wider">
                                  {item.category}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Marathi Title Headline */}
                        {item.marathiTitle && (
                          <div className="text-xs font-marathi text-[#B45309] font-bold mb-1">
                            {item.marathiTitle}
                          </div>
                        )}

                        {/* Main Event Title */}
                        <h3 className="text-lg font-bold text-[#111827] mb-2 leading-snug">
                          {item.title}
                        </h3>

                        {/* Event Description */}
                        <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Venue & Location Box */}
                        <div className="flex items-start gap-2.5 text-xs text-[#4B5563] mb-4 p-3 rounded-xl bg-gray-50 border border-gray-200/70">
                          <MapPin className="w-3.5 h-3.5 text-[#E27500] shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <span className="font-bold text-[#111827] block">{item.location}</span>
                            {item.venueAddress && (
                              <span className="text-[11px] text-gray-500 block mt-0.5 leading-relaxed">
                                {item.venueAddress}
                              </span>
                            )}
                            {item.landmark && (
                              <span className="text-[10px] text-gray-600 block mt-0.5 font-medium">
                                📍 {item.landmark}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Historical Note / Recap summary */}
                        {item.recapNote && (
                          <div className="text-[11px] text-amber-900 bg-amber-50/70 border border-amber-200/60 rounded-lg p-2.5 mb-4 leading-relaxed font-medium">
                            📝 {item.recapNote}
                          </div>
                        )}
                      </div>

                      {/* Bottom Footer Action Bar */}
                      <div className="pt-3.5 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Event Concluded</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {item.recapUrl && (
                            <a
                              href={item.recapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-bold text-[#9A4D00] hover:text-[#783C00]"
                            >
                              <span>View Recap</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          )}

                          {hasPhotos ? (
                            <a
                              href={`?galleryEvent=${encodeURIComponent(item.id)}#gallery`}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#111827] hover:bg-[#E27500] text-white text-xs font-bold transition-colors shadow-2xs group cursor-pointer"
                            >
                              <Image className="w-3.5 h-3.5 text-[#E27500] group-hover:text-white transition-colors" />
                              <span>View Photos</span>
                            </a>
                          ) : (
                            <a
                              href="#gallery"
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-xs font-medium text-gray-600 transition-colors shadow-2xs"
                            >
                              <Image className="w-3.5 h-3.5 text-gray-400" />
                              <span>Gallery Archive</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Event Enquiry Modal for active upcoming conclaves */}
      <EventEnquiryModal
        key={enquiryEvent?.id ?? 'closed'}
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
