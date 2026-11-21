import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Clock,
  ArrowRight,
  Check
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { EventFacilityData } from '../../types/hotel';

const FALLBACK_EVENT_IMG =
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80';

export const EventsScene: React.FC = () => {
  const { events, openEnquiryModal } = useHotel();
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || '');

  const activeEvent: EventFacilityData =
    events.find((e) => e.id === selectedEventId) || events[0];

  if (!activeEvent) return null;

  const eventImageSrc =
    activeEvent.images?.find((img) => img && img.trim().length > 0)?.trim() ||
    FALLBACK_EVENT_IMG;

  return (
    <section
      id="events"
      className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#201D19] text-[#F5F1E9] overflow-hidden border-b border-[#D9D1C5]/15"
    >
      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-8 h-[1px] bg-[#B69A69]" />
              <span className="text-xs uppercase tracking-[0.24em] text-[#B69A69] font-medium">
                Banquets & Executive Gatherings
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-serif-luxury text-4xl sm:text-5xl lg:text-[56px] text-[#F5F1E9] font-normal leading-[1.08]"
            >
              Meet, Gather & Celebrate.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="lg:col-span-5 lg:pb-1"
          >
            <p className="text-sm sm:text-base text-[#D9D1C5]/80 font-light leading-relaxed">
              From intimate family milestones and wedding anniversaries to executive boardroom discussions, our tailored event venues offer seamless catering by Food Express.
            </p>
          </motion.div>
        </div>

        {/* Venue Tab Selector */}
        {events.length > 1 && (
          <div className="border-b border-[#D9D1C5]/15 mb-12 flex items-center gap-8 overflow-x-auto">
            {events.map((ev, idx) => {
              const isSelected = activeEvent.id === ev.id;
              return (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => setSelectedEventId(ev.id)}
                  className={`relative pb-4 text-xs sm:text-sm uppercase tracking-[0.18em] transition-colors cursor-pointer flex items-center gap-2.5 whitespace-nowrap ${
                    isSelected
                      ? 'text-[#F5F1E9] font-semibold'
                      : 'text-[#D9D1C5]/60 hover:text-[#F5F1E9]'
                  }`}
                >
                  <span className="font-mono text-[11px] text-[#B69A69] tabular-nums">
                    0{idx + 1}
                  </span>
                  <span>{ev.name}</span>
                  {isSelected && (
                    <motion.span
                      layoutId="activeEventTabIndicator"
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#B69A69]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Active Venue Editorial Split */}
        <motion.div
          key={activeEvent.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-1 lg:grid-cols-12 bg-[#161412] border border-[#D9D1C5]/15"
        >
          {/* Left 6 Columns: Venue Photography */}
          <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[460px] overflow-hidden bg-[#12100E]">
            <img
              src={eventImageSrc}
              alt={activeEvent.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== FALLBACK_EVENT_IMG) target.src = FALLBACK_EVENT_IMG;
              }}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161412] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#B69A69] mb-1">
                Capacity · {activeEvent.capacity}
              </div>
              <h3 className="font-serif-luxury text-3xl text-[#F5F1E9] font-normal">
                {activeEvent.name}
              </h3>
            </div>
          </div>

          {/* Right 6 Columns: Editorial Specifications */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#D9D1C5]/15">
            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#B69A69] font-medium block mb-3">
                Venue Profile
              </span>
              <p className="text-sm sm:text-base text-[#D9D1C5]/85 font-light leading-relaxed mb-8">
                {activeEvent.description}
              </p>

              {/* Capacity & Availability Ledger */}
              <div className="grid grid-cols-1 sm:grid-cols-2 border-y border-[#D9D1C5]/15 divide-y sm:divide-y-0 sm:divide-x divide-[#D9D1C5]/15 mb-8">
                <div className="py-4 sm:pr-4 flex items-start gap-3">
                  <Users className="w-4 h-4 text-[#B69A69] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D9D1C5]/55 block mb-1">
                      Guest Capacity
                    </span>
                    <span className="text-sm font-medium text-[#F5F1E9] tabular-nums">
                      {activeEvent.capacity}
                    </span>
                  </div>
                </div>

                <div className="py-4 sm:pl-4 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#B69A69] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D9D1C5]/55 block mb-1">
                      Booking Slots
                    </span>
                    <span className="text-sm font-medium text-[#F5F1E9]">
                      {activeEvent.timings}
                    </span>
                  </div>
                </div>
              </div>

              {/* Unboxed Seating Configurations */}
              <div className="mb-6">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#B69A69] font-medium block mb-2">
                  Seating Configurations
                </span>
                <p className="text-sm text-[#F5F1E9] font-normal">
                  {(activeEvent.seatingArrangements || []).join(' · ')}
                </p>
              </div>

              {/* Included Technical & Banquet Facilities */}
              <div className="mb-8">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#B69A69] font-medium block mb-3">
                  Included Event Support
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
                  {activeEvent.facilities.map((fac) => (
                    <div key={fac} className="flex items-center gap-2.5 text-xs text-[#D9D1C5]/85">
                      <Check className="w-3.5 h-3.5 text-[#B69A69] shrink-0" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#D9D1C5]/15">
              <button
                type="button"
                onClick={() => openEnquiryModal('Meeting / Event Enquiry')}
                id="events-enquire-btn"
                className="w-full sm:w-auto py-4 px-8 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] text-xs font-semibold uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Request Banquet / Event Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
