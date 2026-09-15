import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  ChevronDown,
  MapPin,
  Car,
  Compass,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  tag: string;
}

const VARANASI_FAQS: FaqItem[] = [
  {
    id: 'kashi-vishwanath',
    question: 'How far is Hotel D C Grand from Kashi Vishwanath Temple Corridor?',
    answer:
      'Hotel D C Grand in Bhelupur is situated just 2.8 km (approx. 8–10 minutes) from Shri Kashi Vishwanath Temple and the Vishwanath Corridor Gate. Guests can easily take an e-rickshaw or taxi directly from the hotel gate, avoiding the congested pedestrian alleys while staying in a serene, accessible zone.',
    tag: 'Temple Darshan'
  },
  {
    id: 'ghats-ganga-aarti',
    question: 'How close is the hotel to Dashashwamedh Ghat and Assi Ghat for Ganga Aarti?',
    answer:
      'The hotel is conveniently situated midway between Varanasi’s two most iconic ghats: 2.2 km from Dashashwamedh Ghat (famous for the grand evening Ganga Aarti) and 2.1 km from Assi Ghat (renowned for Subah-e-Banaras morning rituals and cultural classical recitals). Our front desk can also assist with reserved morning sunrise boat rides.',
    tag: 'Ghat Proximity'
  },
  {
    id: 'bhelupur-advantage',
    question: 'Why choose Bhelupur over Godowlia or Chowk for staying in Varanasi?',
    answer:
      'Unlike Godowlia or narrow Old City gullies where vehicle entry is restricted and luggage must be dragged through crowded streets, Bhelupur offers broad road connectivity with direct vehicular drop-off right at the hotel porch. You enjoy peaceful nights, superior hygiene, modern elevator access, and effortless connectivity to temples and the railway station.',
    tag: 'Location Advantage'
  },
  {
    id: 'dining-food-express',
    question: 'Does Hotel D C Grand offer pure vegetarian dining and room service?',
    answer:
      'Yes. Our in-house restaurant, Food Express, serves authentic North Indian, South Indian, Mughlai, and Continental cuisines with dedicated pure vegetarian and Jain preparation protocols upon request. In-room dining is accessible 24 hours a day for our guests.',
    tag: 'Dining & Food'
  },
  {
    id: 'cantt-and-airport',
    question: 'What is the travel distance to Varanasi Cantt Railway Station and Babatpur Airport?',
    answer:
      'Hotel D C Grand is 4.1 km (about 12–15 minutes) from Varanasi Junction (Varanasi Cantt / BSB Railway Station) and 24 km from Lal Bahadur Shastri International Airport (VNS Babatpur). Pre-arranged station pickups and airport cab transfers are handled smoothly by our 24/7 concierge.',
    tag: 'Transit & Pickup'
  },
  {
    id: 'senior-citizens-amenities',
    question: 'Is Hotel D C Grand suitable for elderly pilgrims and family groups?',
    answer:
      'Absolutely. Hotel D C Grand is equipped with a smooth, modern passenger elevator/lift serving all guest floors, 100% generator power backup, wheel-chair accessible entry, spacious air-conditioned rooms, and dedicated banquet halls for family gatherings and spiritual groups.',
    tag: 'Pilgrim Comfort'
  }
];

const LOCAL_KEYWORD_HIGHLIGHTS = [
  { name: 'Kashi Vishwanath Corridor', dist: '2.8 km', drive: '8 mins' },
  { name: 'Dashashwamedh Ghat (Aarti)', dist: '2.2 km', drive: '7 mins' },
  { name: 'Assi Ghat (Subah-e-Banaras)', dist: '2.1 km', drive: '6 mins' },
  { name: 'Sankat Mochan Temple', dist: '2.4 km', drive: '7 mins' },
  { name: 'Banaras Hindu University (BHU)', dist: '3.2 km', drive: '9 mins' },
  { name: 'Varanasi Cantt Railway Stn', dist: '4.1 km', drive: '12 mins' },
  { name: 'Varanasi Airport (VNS)', dist: '24 km', drive: '35 mins' }
];

export const VaranasiSeoFaqSection: React.FC = () => {
  const { contact } = useHotel();
  const [openFaqId, setOpenFaqId] = useState<string>('kashi-vishwanath');

  return (
    <section
      id="varanasi-guide"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0e1017] border-t border-[#1f2330] overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#c5a880]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with high-ranking Varanasi keywords */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e2230] border border-[#c5a880]/30 text-[#c5a880] mb-4"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold">
              Varanasi Travel & Stay Guide
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#f3e5d0] font-normal leading-tight mb-4"
          >
            Stay in the Cultural Heart of Varanasi
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-[#a09a8e] font-light leading-relaxed max-w-2xl mx-auto"
          >
            Located at Bhelupur, Hotel D C Grand offers the prime balance between peaceful, accessible luxury and immediate proximity to the sacred Ghats, Kashi Vishwanath Temple, and premier transit hubs.
          </motion.p>
        </div>

        {/* Proximity Quick Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-12"
        >
          {LOCAL_KEYWORD_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#141620] border border-[#232738] hover:border-[#c5a880]/40 transition-colors flex flex-col justify-between text-center"
            >
              <span className="text-[10px] text-[#8e897e] font-medium block truncate mb-1" title={item.name}>
                {item.name}
              </span>
              <div>
                <span className="text-sm font-semibold text-[#c5a880] block">
                  {item.dist}
                </span>
                <span className="text-[10px] text-[#a09a8e]">
                  {item.drive}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Why Bhelupur / Hotel Advantage summary */}
          <div className="lg:col-span-4 space-y-5">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#151824] to-[#12141c] border border-[#262a3a] shadow-xl">
              <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-bold block mb-2">
                Why Travelers Choose Us
              </span>
              <h3 className="font-serif-luxury text-xl text-[#f3e5d0] mb-3">
                Seamless Road Access & Modern Hospitality
              </h3>
              <ul className="space-y-2.5 text-xs text-[#b8b2a5] mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>Direct vehicle porch drop-off (no lugging bags through congested alleyways)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>Only 8–10 minutes to Kashi Vishwanath & Dashashwamedh Ghat</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>High-speed elevator connecting all floors (elderly friendly)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>Food Express: In-house multi-cuisine & pure veg dining</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span>100% generator backup & uninterrupted high-speed Wi-Fi</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-[#232738] flex flex-col sm:flex-row gap-2.5">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider text-center hover:bg-[#d8bf9a] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {contact.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Hotel%20D%20C%20Grand,%20I%20have%20an%20enquiry%20regarding%20stay%20in%20Varanasi.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#1e2230] text-[#25D366] border border-[#25D366]/30 font-bold text-xs uppercase tracking-wider text-center hover:bg-[#25D366]/10 transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Local NAP (Name, Address, Phone) snippet */}
            <div className="p-4 rounded-xl bg-[#12141c] border border-[#202330] text-[11px] text-[#a09a8e] space-y-1">
              <div className="flex items-center gap-1.5 text-[#f3e5d0] font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                <span>Hotel D C Grand, Bhelupur</span>
              </div>
              <p>{contact.address}</p>
              <p className="text-[10px] text-[#736e65]">Coordinates: 25.3005° N, 82.9972° E • PIN 221010</p>
            </div>
          </div>

          {/* Right Column: Interactive Accordion */}
          <div className="lg:col-span-8 space-y-3">
            {VARANASI_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? 'bg-[#151824] border-[#c5a880]/50 shadow-lg'
                      : 'bg-[#12141c] border-[#222533] hover:border-[#33384a]'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                    className="w-full py-4 px-5 sm:px-6 flex items-center justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#1e2230] text-[#c5a880] border border-[#c5a880]/20 shrink-0 hidden sm:inline-block">
                        {faq.tag}
                      </span>
                      <h4 className="text-xs sm:text-sm font-medium text-[#f3e5d0] leading-snug">
                        {faq.question}
                      </h4>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#c5a880] transition-transform shrink-0 duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-xs text-[#a8a296] leading-relaxed border-t border-[#1e2230]/60">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
