import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  UtensilsCrossed,
  Clock,
  Sparkles,
  MessageSquare,
  Wine,
  Heart,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const RestaurantScene: React.FC = () => {
  const { restaurant, openEnquiryModal } = useHotel();
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  if (!restaurant.isVisible) return null;

  return (
    <section
      id="restaurant"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0c0d10] via-[#141217] to-[#0c0d10] overflow-hidden"
    >
      {/* Warm Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-[#c5a880]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Gallery & Atmospheric Imagery */}
          <div className="lg:col-span-6 perspective-container">
            <motion.div
              initial={{ opacity: 0, x: -30, rotateY: 10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative preserve-3d"
            >
              {/* Back Drop Frame */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#c5a880]/15 to-transparent blur-md" />

              {/* Featured Image */}
              <div className="relative rounded-2xl overflow-hidden border border-[#c5a880]/30 shadow-2xl bg-[#151720]">
                <img
                  src={restaurant.images[activeImgIdx] || restaurant.images[0]}
                  alt="Food Express Dining at D C Grand"
                  className="w-full h-[420px] object-cover transition-all duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0c0d10]/80 backdrop-blur-md border border-[#c5a880]/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold flex items-center gap-1.5">
                      <Wine className="w-3.5 h-3.5" />
                      Amber Beverage Counter & Dining
                    </span>
                    <span className="text-[10px] text-[#a09a8e]">
                      Since 2004 Heritage
                    </span>
                  </div>
                  <p className="text-xs text-[#d1ccc0]">
                    Velvet upholstered dining, coffered ceiling lighting, and freshly prepared Banarasi delights.
                  </p>
                </div>
              </div>

              {/* Thumbnails */}
              {restaurant.images.length > 1 && (
                <div className="flex items-center gap-3 mt-4">
                  {restaurant.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIdx(idx)}
                      className={`relative flex-1 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImgIdx === idx
                          ? 'border-[#c5a880] scale-105 shadow-lg'
                          : 'border-[#2a2723] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Restaurant thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Culinary Narrative & Offerings */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Overline */}
              <div className="inline-flex items-center gap-2 mb-3 text-[#c5a880]">
                <UtensilsCrossed className="w-4 h-4" />
                <span className="text-xs uppercase tracking-[0.3em] font-medium font-sans">
                  Gastronomy
                </span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#f3e5d0] font-normal leading-tight mb-2">
                {restaurant.name}
              </h2>
              <p className="text-sm sm:text-base text-[#c5a880] uppercase tracking-widest font-sans mb-6">
                {restaurant.tagline}
              </p>

              <p className="text-base text-[#d1ccc0] font-light leading-relaxed mb-6">
                {restaurant.description}
              </p>

              {/* Operating Hours */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#161821] border border-[#2a2723] mb-6">
                <Clock className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#a09a8e] block">
                    Service Timings
                  </span>
                  <span className="text-xs font-semibold text-[#f3e5d0]">
                    {restaurant.timings}
                  </span>
                </div>
              </div>

              {/* Cuisines Pills */}
              <div className="mb-6">
                <h3 className="text-xs uppercase tracking-widest text-[#a09a8e] mb-3">
                  Cuisine Specialities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.cuisines.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1.5 rounded-full bg-[#1c1f2b] border border-[#c5a880]/30 text-xs text-[#e8d7be] font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {restaurant.facilities.map((fac) => (
                  <div key={fac} className="flex items-center gap-2 text-xs text-[#d1ccc0]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => openEnquiryModal('Restaurant Enquiry')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b39366] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(197,168,128,0.4)] transition-all flex items-center justify-center gap-2"
                  id="restaurant-enquiry-btn"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Reserve Table / Dine Enquiry</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
