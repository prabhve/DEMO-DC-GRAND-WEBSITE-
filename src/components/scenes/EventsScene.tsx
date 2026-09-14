import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  PartyPopper,
  CalendarDays,
  Sparkles,
  CheckCircle2,
  Layers,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { EventFacilityData } from '../../types/hotel';

export const EventsScene: React.FC = () => {
  const { events, openEnquiryModal } = useHotel();
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || '');

  const activeEvent: EventFacilityData =
    events.find((e) => e.id === selectedEventId) || events[0];

  return (
    <section
      id="events"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0c0d10] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#c5a880]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3 text-[#c5a880]"
          >
            <PartyPopper className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium font-sans">
              Banquets & Conferences
            </span>
            <PartyPopper className="w-4 h-4" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-[#f3e5d0] font-normal leading-tight mb-4"
          >
            Meet, Gather & Celebrate
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#a09a8e] font-light leading-relaxed max-w-2xl mx-auto"
          >
            Host unforgettable birthday parties, joyous anniversaries, family reunions, and executive business conclaves with tailored banquet support.
          </motion.p>
        </div>

        {/* Tab Switcher if multiple venues */}
        {events.length > 1 && (
          <div className="flex items-center justify-center gap-3 mb-12">
            {events.map((ev) => (
              <button
                key={ev.id}
                onClick={() => setSelectedEventId(ev.id)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  activeEvent?.id === ev.id
                    ? 'bg-[#c5a880] text-[#0c0d10] font-semibold shadow-[0_0_20px_rgba(197,168,128,0.35)]'
                    : 'bg-[#151720] text-[#a09a8e] border border-[#2a2723] hover:border-[#c5a880]/40 hover:text-[#f3e5d0]'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{ev.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Venue Showcase Card */}
        {activeEvent && (
          <div className="perspective-container">
            <motion.div
              key={activeEvent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-[#13151e] border border-[#c5a880]/30 overflow-hidden shadow-2xl preserve-3d"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Visual */}
                <div className="lg:col-span-6 relative bg-[#0c0d10] min-h-[350px]">
                  <img
                    src={activeEvent.images[0] || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80'}
                    alt={activeEvent.name}
                    className="w-full h-full object-cover min-h-[350px] lg:min-h-[440px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="px-3 py-1 rounded-full bg-[#0c0d10]/80 backdrop-blur-md border border-[#c5a880]/30 text-xs text-[#c5a880] uppercase tracking-wider inline-block mb-2">
                      Capacity: {activeEvent.capacity}
                    </span>
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f3e5d0] font-normal">
                      {activeEvent.name}
                    </h3>
                  </div>
                </div>

                {/* Details & Specs */}
                <div className="lg:col-span-6 p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-[#161823] to-[#0f1016]">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a880] font-sans font-semibold block mb-2">
                      Venue Specifications
                    </span>

                    <p className="text-sm text-[#d1ccc0] font-light leading-relaxed mb-6">
                      {activeEvent.description}
                    </p>

                    {/* Quick Meta */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#0c0d10]/60 border border-[#2a2723] mb-6">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-[#c5a880] shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#777166] block">Guest Limit</span>
                          <span className="text-xs font-semibold text-[#f3e5d0]">{activeEvent.capacity}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-[#c5a880] shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#777166] block">Availability</span>
                          <span className="text-xs font-semibold text-[#f3e5d0]">{activeEvent.timings}</span>
                        </div>
                      </div>
                    </div>

                    {/* Seating Formats */}
                    <div className="mb-6">
                      <h4 className="text-xs uppercase tracking-widest text-[#a09a8e] mb-2 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#c5a880]" />
                        Seating Arrangements
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeEvent.seatingArrangements.map((seat) => (
                          <span
                            key={seat}
                            className="px-3 py-1 rounded-full bg-[#1b1e2a] border border-[#c5a880]/20 text-xs text-[#e5e3dc]"
                          >
                            {seat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Facilities list */}
                    <div className="mb-6">
                      <h4 className="text-xs uppercase tracking-widest text-[#a09a8e] mb-2">
                        Included Facilities
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeEvent.facilities.map((fac) => (
                          <div key={fac} className="flex items-center gap-2 text-xs text-[#d1ccc0]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                            <span>{fac}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <div className="pt-6 border-t border-[#2a2723]">
                    <button
                      onClick={() => openEnquiryModal('Meeting / Event Enquiry')}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b39366] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(197,168,128,0.4)] transition-all flex items-center justify-center gap-2"
                      id="events-enquire-btn"
                    >
                      <CalendarDays className="w-4 h-4" />
                      <span>Enquire for Event / Banquet</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
