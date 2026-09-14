import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Phone, Sparkles } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const FinalCtaScene: React.FC = () => {
  const { openBookingModal } = useHotel();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-[#08090b] via-[#0e1017] to-[#0c0d10] overflow-hidden text-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-[#c5a880]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Monogram emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-16 h-16 rounded-full border border-[#c5a880]/50 flex items-center justify-center bg-[#151720] shadow-[0_0_30px_rgba(197,168,128,0.2)] mb-6"
        >
          <span className="font-display text-[#c5a880] text-2xl font-semibold tracking-widest">
            DC
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl text-[#f3e5d0] font-normal leading-tight mb-4"
        >
          Your Varanasi Stay Starts Here.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-xl text-[#cbc6bc] font-light max-w-xl mx-auto mb-10 tracking-wide"
        >
          D C Grand — Comfortable hospitality in Bhelupur, Varanasi.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => openBookingModal()}
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#c5a880] via-[#dfcaaa] to-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(197,168,128,0.4)] hover:shadow-[0_0_40px_rgba(197,168,128,0.6)] hover:scale-105 transition-all flex items-center justify-center gap-2"
            id="final-cta-request-booking-btn"
          >
            <Calendar className="w-4 h-4" />
            <span>Request Booking</span>
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto px-10 py-4 rounded-full border border-[#c5a880]/60 text-[#f3e5d0] hover:bg-[#151720] text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
            id="final-cta-contact-btn"
          >
            <Phone className="w-4 h-4 text-[#c5a880]" />
            <span>Contact Front Desk</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
