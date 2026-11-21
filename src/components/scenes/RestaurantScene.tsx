import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Clock,
  ArrowRight,
  Check,
  PhoneCall
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

const FALLBACK_RESTAURANT_IMG =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80';

export const RestaurantScene: React.FC = () => {
  const { restaurant, contact, openEnquiryModal } = useHotel();
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  if (!restaurant.isVisible) return null;

  const validImages = (restaurant.images || []).filter((img) => img && img.trim().length > 0);
  const featuredImgSrc =
    validImages[activeImgIdx] ||
    validImages[0] ||
    FALLBACK_RESTAURANT_IMG;

  return (
    <section
      id="restaurant"
      className="relative py-16 sm:py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#161412] text-[#F5F1E9] overflow-hidden border-b border-[#D9D1C5]/15"
    >
      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-10 sm:mb-16">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-3.5 sm:mb-4"
            >
              <span className="w-8 h-[1px] bg-[#B69A69]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.24em] text-[#B69A69] font-medium">
                Gastronomy · In-House Multi-Cuisine Dining
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-serif-luxury heading-section-fluid text-[#F5F1E9] font-normal"
            >
              {restaurant.name} — Culinary Craft in Bhelupur.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="lg:col-span-5 lg:pb-1"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[#B69A69]">
              {restaurant.tagline}
            </p>
            <p className="text-sm text-[#D9D1C5]/75 mt-2 font-light">
              Pure Vegetarian & Jain-friendly preparations available alongside signature North Indian, Tandoori, and Oriental fare.
            </p>
          </motion.div>
        </div>

        {/* Main 12-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
          {/* Left 7 Columns: Large Photography & Angle Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden bg-[#201D19] border border-[#D9D1C5]/15">
              <img
                src={featuredImgSrc}
                alt={`${restaurant.name} Dining Hall at Hotel D.C. Grand`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== FALLBACK_RESTAURANT_IMG) target.src = FALLBACK_RESTAURANT_IMG;
                }}
                className="w-full h-[270px] min-[400px]:h-[330px] sm:h-[480px] object-cover transition-transform duration-1000 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161412]/90 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#B69A69] block mb-1">
                    Signature Dining Atmosphere
                  </span>
                  <p className="text-xs sm:text-sm text-[#F5F1E9] font-light">
                    Plush velvet seating, back-lit amber buffet counter, and intimate mezzanine family booths.
                  </p>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {validImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-2.5 sm:mt-3">
                {validImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIdx(idx)}
                    aria-label={`View dining image ${idx + 1}`}
                    className={`relative h-16 sm:h-24 overflow-hidden border transition-all cursor-pointer ${
                      activeImgIdx === idx
                        ? 'border-[#B69A69] opacity-100'
                        : 'border-[#D9D1C5]/15 opacity-55 hover:opacity-90'
                    }`}
                  >
                    <img
                      src={img.trim()}
                      alt={`${restaurant.name} perspective ${idx + 1}`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== FALLBACK_RESTAURANT_IMG) target.src = FALLBACK_RESTAURANT_IMG;
                      }}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right 5 Columns: Culinary Narrative, Unboxed Cuisine Ledger & Service Timings */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.12 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <p className="text-sm sm:text-lg text-[#D9D1C5] font-light leading-relaxed mb-6 sm:mb-8">
                {restaurant.description}
              </p>

              {/* Unboxed Cuisine Specialities Ledger (Zero Pill Clutter) */}
              <div className="py-5 sm:py-6 border-t border-[#D9D1C5]/15">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#B69A69] font-medium block mb-2">
                  Culinary Repertoire
                </span>
                <p className="font-serif-luxury text-xl sm:text-2xl text-[#F5F1E9] leading-relaxed">
                  {restaurant.cuisines.join(' · ')}
                </p>
              </div>

              {/* Service Timings Ledger */}
              <div className="py-5 sm:py-6 border-t border-[#D9D1C5]/15">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#B69A69] font-medium mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Daily Service Hours</span>
                </div>
                <p className="text-xs sm:text-sm text-[#F5F1E9] leading-relaxed tabular-nums">
                  {restaurant.timings}
                </p>
              </div>

              {/* Dining & Room Service Appointments */}
              <div className="py-5 sm:py-6 border-y border-[#D9D1C5]/15 mb-6 sm:mb-8">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#B69A69] font-medium block mb-3.5">
                  Dining & Hospitality Highlights
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
                  {restaurant.facilities.map((fac) => (
                    <div key={fac} className="flex items-center gap-2.5 text-xs text-[#D9D1C5]/85">
                      <Check className="w-3.5 h-3.5 text-[#B69A69] shrink-0" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dining Reservation Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => openEnquiryModal('Restaurant Enquiry')}
                id="restaurant-enquiry-btn"
                className="flex-1 min-h-[48px] py-3.5 sm:py-4 px-6 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] text-xs font-semibold uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Reserve a Table / Dining Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${contact.phone}`}
                className="min-h-[48px] py-3.5 sm:py-4 px-5 border border-[#D9D1C5]/25 hover:border-[#B69A69] text-[#F5F1E9] hover:text-[#B69A69] text-xs font-medium uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#B69A69]" />
                <span>Room Service</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
