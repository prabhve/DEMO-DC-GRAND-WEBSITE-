import React from 'react';
import { motion } from 'motion/react';
import { Building2, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const IntroScene: React.FC = () => {
  const { homeCms } = useHotel();

  return (
    <section
      id="intro"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0c0d10] via-[#101217] to-[#0c0d10] overflow-hidden"
    >
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#c5a880]/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[950px] rounded-full border border-[#c5a880]/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 3D Layered Visual Showcase */}
          <div className="lg:col-span-5 perspective-container">
            <motion.div
              initial={{ opacity: 0, rotateY: 15, x: -30 }}
              whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative preserve-3d"
            >
              {/* Back Layer Frame */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-[#c5a880]/20 to-transparent blur-sm transform -rotate-2" />

              {/* Main Image Card */}
              <div className="relative rounded-xl overflow-hidden border border-[#c5a880]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#15171e]">
                <img
                  src={homeCms.introImage || 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80'}
                  alt="D C Grand Hotel Lobby and Reception"
                  className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-[#0c0d10]/80 backdrop-blur-md border border-[#c5a880]/20">
                  <div className="flex items-center gap-2 text-[#c5a880] mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest font-semibold">
                      {homeCms.introImageBadgeTitle || 'Grand Welcome'}
                    </span>
                  </div>
                  <p className="text-xs text-[#d1ccc0]">
                    {homeCms.introImageBadgeDesc || 'Double-height reception foyer with crystal chandeliers and warm hospitality.'}
                  </p>
                </div>
              </div>

              {/* Floating Accent Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 p-3 rounded-xl bg-[#1a1c24] border border-[#c5a880]/40 shadow-xl hidden sm:flex items-center gap-3 backdrop-blur-md"
              >
                <div className="w-8 h-8 rounded-full bg-[#c5a880]/20 flex items-center justify-center text-[#c5a880]">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#a09a8e] block">Status</span>
                  <span className="text-xs font-semibold text-[#f3e5d0] tracking-wide">Newly Opened</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Story & Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 mb-4 text-[#c5a880]">
                <span className="w-8 h-[1px] bg-[#c5a880]" />
                <span className="text-xs uppercase tracking-[0.3em] font-medium font-sans">
                  {homeCms.introBadge || 'The Sanctuary'}
                </span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-[#f3e5d0] font-normal leading-tight mb-6">
                {homeCms.introHeading}
              </h2>

              <p className="text-lg sm:text-xl text-[#d1ccc0] font-light leading-relaxed mb-8">
                {homeCms.introText}
              </p>

              {/* Key Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#2a2723]">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-[#15171e] border border-[#c5a880]/30 text-[#c5a880] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#f3e5d0] uppercase tracking-wider mb-1">
                      {homeCms.introPillar1Title || 'Peace of Mind'}
                    </h3>
                    <p className="text-xs text-[#a09a8e] leading-relaxed">
                      {homeCms.introPillar1Desc || '24/7 dedicated security, CCTV surveillance, continuous power backup, and pristine hygiene protocols.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-[#15171e] border border-[#c5a880]/30 text-[#c5a880] shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#f3e5d0] uppercase tracking-wider mb-1">
                      {homeCms.introPillar2Title || 'Personalized Service'}
                    </h3>
                    <p className="text-xs text-[#a09a8e] leading-relaxed">
                      {homeCms.introPillar2Desc || 'Warm, traditional Banarasi care paired with prompt attention for your spiritual itinerary and temple visits.'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
