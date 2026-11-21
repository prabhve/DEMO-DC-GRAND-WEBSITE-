import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  MapPin,
  Check,
  Phone,
  MessageCircle
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
    question: 'How far is Hotel D.C. Grand from Kashi Vishwanath Temple Corridor?',
    answer:
      'Hotel D.C. Grand in Bhelupur is situated 2.8 km (approx. 10–12 minutes by auto or cab) from Shri Kashi Vishwanath Temple and the Vishwanath Corridor Gate. Guests can take a cab or e-rickshaw directly from our front entrance, avoiding the vehicle-restricted Old City lanes while staying in a serene, accessible neighborhood.',
    tag: 'Temple Darshan'
  },
  {
    id: 'ghats-ganga-aarti',
    question: 'How close is the hotel to Dashashwamedh Ghat and Assi Ghat for Ganga Aarti?',
    answer:
      'The hotel is positioned between Varanasi’s two primary ghats: 2.2 km from Dashashwamedh Ghat (home of the evening Ganga Aarti) and 2.1 km from Assi Ghat (renowned for Subah-e-Banaras morning rituals). Our front desk can also coordinate private sunrise and evening wooden boat rides.',
    tag: 'Ghat Proximity'
  },
  {
    id: 'bhelupur-advantage',
    question: 'Why choose Bhelupur over Godowlia or Chowk for staying in Varanasi?',
    answer:
      'Unlike Godowlia or narrow Old City gullies where car entry is restricted and luggage must be carried on foot through crowded streets, Bhelupur offers wide road connectivity with direct vehicular drop-off right at the hotel entrance—alongside modern elevator access and 100% power backup.',
    tag: 'Location Advantage'
  },
  {
    id: 'dining-food-express',
    question: 'Does Hotel D.C. Grand offer pure vegetarian dining and room service?',
    answer:
      'Yes. Our in-house restaurant, Food Express, serves freshly prepared North Indian, Tandoori, and Oriental cuisines with dedicated pure vegetarian and customized Jain meal options available on request, plus in-room dining service.',
    tag: 'Dining & Food'
  },
  {
    id: 'cantt-and-airport',
    question: 'What is the travel distance to Varanasi Cantt Railway Station and Babatpur Airport?',
    answer:
      'Hotel D.C. Grand is 4.1 km (approx. 15 minutes drive) from Varanasi Junction (Varanasi Cantt Railway Station) and 24 km from Lal Bahadur Shastri International Airport (VNS Babatpur). Station and airport transfers can be arranged through our 24/7 front desk.',
    tag: 'Transit & Pickup'
  },
  {
    id: 'senior-citizens-amenities',
    question: 'Is Hotel D.C. Grand suitable for elderly pilgrims and family groups?',
    answer:
      'Yes. Hotel D.C. Grand features a smooth passenger elevator/lift connecting all floors, 100% heavy-duty generator power backup, climate-controlled air-conditioned rooms, and family room configurations.',
    tag: 'Pilgrim Comfort'
  }
];

const LOCAL_PROXIMITY_LEDGER = [
  { name: 'Sankat Mochan Temple', dist: '2.0 km', drive: '~7 mins' },
  { name: 'Assi Ghat (Morning Aarti)', dist: '2.1 km', drive: '~8 mins' },
  { name: 'Dashashwamedh Ghat', dist: '2.2 km', drive: '~10 mins' },
  { name: 'Kashi Vishwanath Corridor', dist: '2.8 km', drive: '~12 mins' },
  { name: 'BHU University Campus', dist: '3.0 km', drive: '~10 mins' },
  { name: 'Varanasi Cantt Station', dist: '4.1 km', drive: '~15 mins' },
  { name: 'Varanasi Airport (VNS)', dist: '24 km', drive: '~40 mins' }
];

export const VaranasiSeoFaqSection: React.FC = () => {
  const { contact } = useHotel();
  const [openFaqId, setOpenFaqId] = useState<string>('kashi-vishwanath');

  return (
    <section
      id="varanasi-guide"
      className="relative py-16 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 bg-[#161412] text-[#F5F1E9] border-b border-[#D9D1C5]/15 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-10 sm:mb-14">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-3.5 sm:mb-4">
              <span className="w-8 h-[1px] bg-[#B69A69]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.24em] text-[#B69A69] font-medium">
                Varanasi Travel & Stay Guide
              </span>
            </div>
            <h2 className="font-serif-luxury heading-section-fluid text-[#F5F1E9] font-normal">
              Frequently Asked Questions for Your Kashi Stay.
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pb-1">
            <p className="text-sm text-[#D9D1C5]/75 font-light leading-relaxed">
              Essential travel times, temple darshan logistics, and property specifications for guests planning their visit to Hotel D.C. Grand in Bhelupur.
            </p>
          </div>
        </div>

        {/* Verified Distance Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 border-t border-l border-[#D9D1C5]/15 mb-12 sm:mb-16">
          {LOCAL_PROXIMITY_LEDGER.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-4 border-r border-b border-[#D9D1C5]/15 bg-[#201D19] flex flex-col justify-between"
            >
              <span className="text-[11px] text-[#D9D1C5]/70 block mb-2 leading-snug">
                {item.name}
              </span>
              <div className="tabular-nums">
                <span className="text-base font-serif-luxury text-[#B69A69] font-medium block">
                  {item.dist}
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#D9D1C5]/55">
                  {item.drive}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 12-Column Split: Bhelupur Advantage Ledger & Interactive Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left 4 Columns */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-7 bg-[#201D19] border border-[#D9D1C5]/15">
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#B69A69] font-medium block mb-2">
                The Bhelupur Advantage
              </span>
              <h3 className="font-serif-luxury text-2xl text-[#F5F1E9] mb-4">
                Seamless Road Access & Modern Comfort
              </h3>
              <ul className="space-y-3 text-xs text-[#D9D1C5]/80 mb-7">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#B69A69] shrink-0 mt-0.5" />
                  <span>Direct car & cab drop-off at our front entrance in Bhelupur</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#B69A69] shrink-0 mt-0.5" />
                  <span>7–12 minutes to Sankat Mochan, Assi Ghat, and Kashi Vishwanath</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#B69A69] shrink-0 mt-0.5" />
                  <span>All-floor modern passenger elevator (ideal for elders & families)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#B69A69] shrink-0 mt-0.5" />
                  <span>Food Express: In-house North Indian, Tandoori & Pure Veg dining</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#B69A69] shrink-0 mt-0.5" />
                  <span>100% generator power backup & high-speed Wi-Fi</span>
                </li>
              </ul>

              <div className="pt-5 border-t border-[#D9D1C5]/15 flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex-1 min-h-[46px] py-3 px-4 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] font-semibold text-xs uppercase tracking-[0.16em] text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Desk</span>
                </a>
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    'Hello Hotel D.C. Grand, I have an enquiry regarding a stay in Varanasi.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] py-3 px-4 border border-[#536E68] bg-[#536E68]/20 hover:bg-[#536E68]/40 text-[#F5F1E9] font-semibold text-xs uppercase tracking-[0.16em] text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#B69A69]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="p-5 bg-[#201D19] border border-[#D9D1C5]/15 text-xs text-[#D9D1C5]/75 space-y-1.5">
              <div className="flex items-center gap-2 text-[#F5F1E9] font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#B69A69]" />
                <span>Hotel D.C. Grand · Bhelupur</span>
              </div>
              <p>{contact.address}</p>
              <p className="text-[11px] text-[#D9D1C5]/50 tabular-nums">
                Coordinates: 25.3005° N, 82.9972° E · PIN 221010
              </p>
            </div>
          </div>

          {/* Right 8 Columns: Accordion Ledger */}
          <div className="lg:col-span-8 divide-y divide-[#D9D1C5]/15 border-y border-[#D9D1C5]/15">
            {VARANASI_FAQS.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;

              return (
                <div key={faq.id} className="bg-[#161412]">
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                    className="w-full py-5 px-4 sm:px-6 flex items-center justify-between gap-4 text-left hover:bg-[#201D19]/60 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <span className="font-mono text-xs text-[#B69A69] tabular-nums pt-0.5 sm:pt-0">
                        0{idx + 1}
                      </span>
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#B69A69] block mb-1">
                          {faq.tag}
                        </span>
                        <h4 className="font-serif-luxury text-xl sm:text-2xl text-[#F5F1E9] font-normal leading-snug">
                          {faq.question}
                        </h4>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#B69A69] transition-transform shrink-0 duration-300 ${
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
                        <div className="px-4 sm:px-14 pb-6 pt-1 text-sm text-[#D9D1C5]/80 font-light leading-relaxed">
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
