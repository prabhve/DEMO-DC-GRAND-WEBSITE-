import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { VaranasiInteractiveMap } from './VaranasiInteractiveMap';

export const LocationScene: React.FC = () => {
  const { contact } = useHotel();

  return (
    <section
      id="location"
      className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#201D19] text-[#F5F1E9] overflow-hidden border-b border-[#D9D1C5]/15"
    >
      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Header */}
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
                Sacred Geography & Interactive Map
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-serif-luxury text-4xl sm:text-5xl lg:text-[56px] text-[#F5F1E9] font-normal leading-[1.08]"
            >
              Connected to Every Corner of Kashi.
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
              Select any temple, ghat, or transit hub below to inspect verified travel distances from our Bhelupur address and launch direct turn-by-turn navigation.
            </p>
          </motion.div>
        </div>

        {/* Interactive Varanasi Map */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <VaranasiInteractiveMap />
        </motion.div>

        {/* Travel Assistance & Concierge Transfers Ledger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 bg-[#161412] border border-[#D9D1C5]/15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#B69A69] font-medium block mb-1.5">
              Airport, Railway & Boat Concierge
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F5F1E9] font-normal mb-2">
              Chauffeur Pickups & Private Ganga Boat Arrangements
            </h3>
            <p className="text-xs sm:text-sm text-[#D9D1C5]/75 font-light max-w-2xl leading-relaxed">
              Our 24/7 front desk in Bhelupur coordinates private cab pickups from Varanasi Junction (Cantt · 4.1 km) and Lal Bahadur Shastri Airport (24 km), as well as sunrise and evening Ganga Aarti boat charters.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
            <a
              href={`tel:${contact.phone}`}
              className="px-6 py-3.5 border border-[#D9D1C5]/25 hover:border-[#B69A69] text-[#F5F1E9] hover:text-[#B69A69] text-xs font-medium uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#B69A69]" />
              <span>Call Concierge</span>
            </a>
            <a
              href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Hello Hotel D.C. Grand, I would like assistance with travel directions and cab/boat transfers in Varanasi.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] font-semibold text-xs uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Travel Desk</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
