import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const FinalCtaScene: React.FC = () => {
  const { openBookingModal, homeCms, contact } = useHotel();

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#201D19] text-[#F5F1E9] overflow-hidden text-center border-b border-[#D9D1C5]/15">
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.26em] text-[#B69A69] font-medium mb-4"
        >
          Hotel D.C. Grand · Bhelupur, Varanasi
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="font-serif-luxury text-4xl sm:text-6xl lg:text-[64px] text-[#F5F1E9] font-normal leading-[1.08] mb-5"
        >
          {homeCms.finalCtaHeading || 'Your Story of Comfort Begins in Varanasi.'}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.14 }}
          className="text-base sm:text-lg text-[#D9D1C5]/80 font-light max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {homeCms.finalCtaSubtitle ||
            'Reserve directly with our front desk for personalized assistance, verified rates, and warm Banarasi hospitality.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
        >
          <button
            type="button"
            onClick={() => openBookingModal()}
            id="final-cta-request-booking-btn"
            className="px-9 py-4 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>{homeCms.finalCtaBookingBtnText || 'Book Your Stay'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={`tel:${contact.phone}`}
            id="final-cta-contact-btn"
            className="px-9 py-4 border border-[#D9D1C5]/30 hover:border-[#B69A69] text-[#F5F1E9] hover:text-[#B69A69] text-xs font-medium uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2.5"
          >
            <Phone className="w-3.5 h-3.5 text-[#B69A69]" />
            <span>Call {contact.phone}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
