import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { HOTEL_ASSETS } from '../../data/hotelAssets';

const FALLBACK_INTRO_IMG = HOTEL_ASSETS.receptionFrontDeskWide.optimizedPath;
const FALLBACK_SECONDARY_IMG = HOTEL_ASSETS.lobbyTealVelvetLounge.optimizedPath;

export const IntroScene: React.FC = () => {
  const { homeCms, openBookingModal } = useHotel();

  const primaryImage =
    homeCms.introImage && homeCms.introImage.trim().length > 0
      ? homeCms.introImage.trim()
      : FALLBACK_INTRO_IMG;

  const secondaryImage = FALLBACK_SECONDARY_IMG;

  return (
    <section
      id="intro"
      className="relative py-16 sm:py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#F5F1E9] text-[#201D19] overflow-hidden border-b border-[#201D19]/10"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Editorial Header Row: Asymmetric Magazine Lead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-end mb-12 sm:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="w-8 h-[1px] bg-[#536E68]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.24em] text-[#536E68] font-semibold">
                {homeCms.introBadge || 'Welcome to Hotel D.C. Grand · Bhelupur'}
              </span>
            </div>

            <h2 className="font-serif-luxury heading-section-fluid text-[#201D19] font-normal">
              {homeCms.introHeading ||
                'Thoughtful Hospitality in the Heart of Varanasi.'}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 lg:pb-2"
          >
            <p className="text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#201D19]/65 leading-relaxed">
              B 24/22-P, near Shri Ram Janki Temple · Kashmiri Ganj, Gurudham, Bhelupur
              <span className="block mt-1 text-[#536E68] font-medium">
                Varanasi, Uttar Pradesh 221005 · +91 70840 03000
              </span>
            </p>
          </motion.div>
        </div>

        {/* Asymmetrical Editorial Image & Narrative Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
          {/* Left 7 Columns: Offset Architectural Composition */}
          <div className="lg:col-span-7 relative sm:pb-12">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full sm:w-[86%] overflow-hidden bg-[#D9D1C5]"
            >
              <img
                src={primaryImage}
                alt="Hotel D.C. Grand Reception Desk and Lobby in Bhelupur, Varanasi"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== FALLBACK_INTRO_IMG) target.src = FALLBACK_INTRO_IMG;
                }}
                className="w-full h-[270px] min-[400px]:h-[320px] sm:h-[520px] object-cover transition-transform duration-1000 hover:scale-[1.03]"
              />
            </motion.div>

            {/* Overlapping Secondary Detail Image & Architectural Note */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 sm:mt-0 sm:absolute sm:-bottom-10 sm:right-0 sm:w-[52%] bg-[#201D19] text-[#F5F1E9] p-4 sm:p-6 shadow-[0_24px_50px_rgba(32,29,25,0.22)]"
            >
              <div className="overflow-hidden mb-3.5 sm:mb-4 h-36 sm:h-44 bg-[#161412]">
                <img
                  src={secondaryImage}
                  alt="Hotel D.C. Grand Reception Waiting Lounge"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== FALLBACK_SECONDARY_IMG) target.src = FALLBACK_SECONDARY_IMG;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#B69A69] mb-1">
                {homeCms.introImageBadgeTitle || '24/7 Front Desk & Concierge'}
              </div>
              <p className="text-xs text-[#D9D1C5] leading-relaxed font-light">
                {homeCms.introImageBadgeDesc ||
                  'Warm marble reception foyer with travel assistance, boat ride bookings, and daily dining service from 7 AM to 11 PM.'}
              </p>
            </motion.div>
          </div>

          {/* Right 5 Columns: Editorial Storytelling & Numbered Hospitality Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col justify-between sm:pt-4 lg:pt-8"
          >
            <div>
              <p className="font-serif-luxury text-xl sm:text-3xl text-[#201D19] leading-[1.35] mb-5 sm:mb-6">
                “A welcoming Bhelupur sanctuary where the spiritual rhythm of Kashi meets attentive contemporary comfort.”
              </p>

              <p className="text-sm sm:text-base text-[#201D19]/80 leading-relaxed font-normal mb-8 sm:mb-10 max-w-[60ch]">
                {homeCms.introText}
              </p>

              {/* Editorial Numbered Ledger (Zero Generic Cards) */}
              <div className="border-t border-[#201D19]/15 divide-y divide-[#201D19]/15">
                <div className="py-5 sm:py-6 flex items-start gap-4 sm:gap-5">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#536E68] font-semibold pt-1 tabular-nums">
                    01
                  </span>
                  <div>
                    <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#201D19] font-medium mb-1.5">
                      {homeCms.introPillar1Title || 'Well-Equipped Guest Rooms'}
                    </h3>
                    <p className="text-sm text-[#201D19]/75 leading-relaxed">
                      {homeCms.introPillar1Desc ||
                        'Air-conditioned Deluxe, Premium, Family, and Couple rooms featuring crafted wooden interiors, flat-screen TVs, and daily housekeeping.'}
                    </p>
                  </div>
                </div>

                <div className="py-5 sm:py-6 flex items-start gap-4 sm:gap-5">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#536E68] font-semibold pt-1 tabular-nums">
                    02
                  </span>
                  <div>
                    <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#201D19] font-medium mb-1.5">
                      {homeCms.introPillar2Title || 'Dedicated Varanasi Travel Desk'}
                    </h3>
                    <p className="text-sm text-[#201D19]/75 leading-relaxed">
                      {homeCms.introPillar2Desc ||
                        'On-site support for Ganga boat rides, local guides on demand, car/taxi service, money exchange, train & flight tickets, and doctor on call.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Link CTA */}
            <div className="pt-6 border-t border-[#201D19]/15 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs uppercase tracking-[0.16em] text-[#201D19]/70">
                5 Room Categories · Restaurant (7 AM – 11 PM) · Banquet Hall
              </div>

              <button
                type="button"
                onClick={() => openBookingModal()}
                className="min-h-[44px] inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#201D19] hover:text-[#536E68] transition-colors pb-1 border-b border-[#201D19] hover:border-[#536E68] cursor-pointer"
              >
                <span>Reserve Your Stay</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
