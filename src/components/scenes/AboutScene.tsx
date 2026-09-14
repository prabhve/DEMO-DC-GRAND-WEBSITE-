import React from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, MapPin, CheckCircle } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const AboutScene: React.FC = () => {
  const { homeCms, contact } = useHotel();

  return (
    <section
      id="about"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0c0d10] via-[#10121a] to-[#0c0d10] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 mb-3 text-[#c5a880]">
                <Compass className="w-4 h-4" />
                <span className="text-xs uppercase tracking-[0.3em] font-medium font-sans">
                  Our Philosophy
                </span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-[#f3e5d0] font-normal leading-tight mb-6">
                A Gracious Base in the Eternal City
              </h2>

              <p className="text-base sm:text-lg text-[#d1ccc0] font-light leading-relaxed mb-6">
                {homeCms.aboutText}
              </p>

              <p className="text-sm sm:text-base text-[#a09a8e] font-light leading-relaxed mb-8">
                Varanasi is a sacred convergence of time, devotion, and timeless ghats. Situated in the well-connected neighbourhood of Bhelupur, D C Grand is designed to be your serene oasis—where contemporary comforts, dedicated power backup, and authentic culinary hospitality meet the warmth of Banarasi traditions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#2a2723]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c5a880]/15 flex items-center justify-center text-[#c5a880] shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#f3e5d0] font-medium">
                    2 km from Sankat Mochan Temple
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c5a880]/15 flex items-center justify-center text-[#c5a880] shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#f3e5d0] font-medium">
                    Close to Assi Ghat & BHU
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c5a880]/15 flex items-center justify-center text-[#c5a880] shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#f3e5d0] font-medium">
                    Modern Elevator & Generator Backup
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c5a880]/15 flex items-center justify-center text-[#c5a880] shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#f3e5d0] font-medium">
                    In-House Food Express Dining
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Collage with 3D Depth */}
          <div className="lg:col-span-5 perspective-container">
            <motion.div
              initial={{ opacity: 0, rotateY: -10, scale: 0.95 }}
              whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative preserve-3d"
            >
              <div className="rounded-2xl overflow-hidden border border-[#c5a880]/30 shadow-2xl bg-[#151720]">
                <img
                  src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80"
                  alt="Varanasi Ganga Ghats near D C Grand"
                  className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0c0d10]/80 backdrop-blur-md border border-[#c5a880]/20">
                  <div className="flex items-center gap-2 text-[#c5a880] mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest font-semibold">Bhelupur, Kashi</span>
                  </div>
                  <p className="text-xs text-[#d1ccc0]">
                    {contact.address}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
