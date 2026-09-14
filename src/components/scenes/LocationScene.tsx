import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageSquare } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { VaranasiInteractiveMap } from './VaranasiInteractiveMap';

export const LocationScene: React.FC = () => {
  const { contact } = useHotel();

  return (
    <section
      id="location"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0c0d10] overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#c5a880]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3 text-[#c5a880]"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium font-sans">
              Sacred Geography & Interactive Map
            </span>
            <MapPin className="w-4 h-4" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-[#f3e5d0] font-normal leading-tight mb-4"
          >
            Prime Location in Bhelupur
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#a09a8e] font-light leading-relaxed max-w-2xl mx-auto"
          >
            Explore our interactive map of Varanasi featuring real-time travel estimates, 3D parallax depth, and direct driving directions to iconic sacred shrines and the Ganga ghats.
          </motion.p>
        </div>

        {/* Enhanced Interactive Varanasi Map with 3D Elements, Parallax & Directions */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <VaranasiInteractiveMap />
        </motion.div>

        {/* Travel Assistance & Concierge Transfers Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#171a24] via-[#12141c] to-[#171a24] border border-[#c5a880]/30 flex flex-col md:flex-row items-center justify-between gap-5 shadow-2xl"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-bold block mb-1">
              Airport & Railway Transfers
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#f3e5d0] font-normal mb-1">
              Need Assistance with Varanasi Travel & Local Cab Booking?
            </h3>
            <p className="text-xs sm:text-sm text-[#a09a8e] font-light max-w-2xl">
              Our 24/7 Front Desk Concierge in Bhelupur assists guests with station pickups from Varanasi Junction (Cantt), airport cabs to Lal Bahadur Shastri Airport, and private Ganga boat tour arrangements.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`tel:${contact.phone}`}
              className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-[#0c0d10] text-[#f3e5d0] border border-[#c5a880]/40 hover:border-[#c5a880] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Call Front Desk</span>
            </a>
            <a
              href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20D%20C%20Grand,%20I%20would%20like%20assistance%20with%20travel%20directions%20and%20transfers.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

