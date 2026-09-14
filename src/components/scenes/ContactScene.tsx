import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, Mail, MapPin, Send, ExternalLink, Sparkles } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const ContactScene: React.FC = () => {
  const { contact, openEnquiryModal } = useHotel();

  return (
    <section
      id="contact"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0c0d10] via-[#12141c] to-[#0c0d10] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3 text-[#c5a880]"
          >
            <Phone className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium font-sans">
              Front Desk & Concierge
            </span>
            <Phone className="w-4 h-4" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-[#f3e5d0] font-normal leading-tight mb-4"
          >
            Connect With Our Team
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#a09a8e] font-light leading-relaxed max-w-2xl mx-auto"
          >
            Whether planning a spiritual journey, booking a celebratory banquet, or seeking driving guidance, our front office is at your assistance 24/7.
          </motion.p>
        </div>

        {/* 3D Floating Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-container mb-12">
          {/* Card 1: Direct Voice Call */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-6 rounded-2xl bg-[#151720] border border-[#2a2723] hover:border-[#c5a880]/50 shadow-xl flex flex-col justify-between preserve-3d group transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1e212b] border border-[#c5a880]/20 flex items-center justify-center text-[#c5a880] mb-5 group-hover:bg-[#c5a880] group-hover:text-[#0c0d10] transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#777166] block mb-1">
                Direct Line
              </span>
              <h3 className="text-base font-semibold text-[#f3e5d0] mb-2 font-sans">
                Voice Telephone
              </h3>
              <p className="text-xs text-[#a09a8e] font-light leading-relaxed mb-6">
                Connect with our front desk managers for instant questions and availability.
              </p>
            </div>
            <a
              href={`tel:${contact.phone}`}
              className="w-full py-2.5 rounded-xl bg-[#1e212b] border border-[#c5a880]/30 text-[#e8d7be] hover:bg-[#c5a880] hover:text-[#0c0d10] text-xs font-semibold uppercase tracking-wider text-center transition-all"
              id="contact-call-btn"
            >
              Call {contact.phone}
            </a>
          </motion.div>

          {/* Card 2: WhatsApp Chat */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-6 rounded-2xl bg-[#151720] border border-[#2a2723] hover:border-[#25D366]/50 shadow-xl flex flex-col justify-between preserve-3d group transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1e212b] border border-[#25D366]/20 flex items-center justify-center text-[#25D366] mb-5 group-hover:bg-[#25D366] group-hover:text-[#0c0d10] transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#777166] block mb-1">
                Instant Chat
              </span>
              <h3 className="text-base font-semibold text-[#f3e5d0] mb-2 font-sans">
                WhatsApp Messaging
              </h3>
              <p className="text-xs text-[#a09a8e] font-light leading-relaxed mb-6">
                Receive room photos, directions, or confirmation details directly on WhatsApp.
              </p>
            </div>
            <a
              href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20D%20C%20Grand,%20I%20would%20like%20to%20inquire%20about%20a%20stay.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#1e212b] border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-[#0c0d10] text-xs font-semibold uppercase tracking-wider text-center transition-all"
              id="contact-whatsapp-btn"
            >
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Card 3: Email Inquiries */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-6 rounded-2xl bg-[#151720] border border-[#2a2723] hover:border-[#c5a880]/50 shadow-xl flex flex-col justify-between preserve-3d group transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1e212b] border border-[#c5a880]/20 flex items-center justify-center text-[#c5a880] mb-5 group-hover:bg-[#c5a880] group-hover:text-[#0c0d10] transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#777166] block mb-1">
                Electronic Mail
              </span>
              <h3 className="text-base font-semibold text-[#f3e5d0] mb-2 font-sans">
                Email Desk
              </h3>
              <p className="text-xs text-[#a09a8e] font-light leading-relaxed mb-6">
                Formal event RFPs, travel agency partnerships, and written confirmations.
              </p>
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="w-full py-2.5 rounded-xl bg-[#1e212b] border border-[#c5a880]/30 text-[#e8d7be] hover:bg-[#c5a880] hover:text-[#0c0d10] text-xs font-semibold uppercase tracking-wider text-center transition-all truncate"
              id="contact-email-btn"
            >
              {contact.email}
            </a>
          </motion.div>

          {/* Card 4: Postal Address & Visit */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="p-6 rounded-2xl bg-[#151720] border border-[#2a2723] hover:border-[#c5a880]/50 shadow-xl flex flex-col justify-between preserve-3d group transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1e212b] border border-[#c5a880]/20 flex items-center justify-center text-[#c5a880] mb-5 group-hover:bg-[#c5a880] group-hover:text-[#0c0d10] transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#777166] block mb-1">
                Property Address
              </span>
              <h3 className="text-base font-semibold text-[#f3e5d0] mb-2 font-sans">
                Visit In Person
              </h3>
              <p className="text-xs text-[#a09a8e] font-light leading-relaxed mb-6">
                22/24P, Kasmiganj Mohalla, Bhelupur, Varanasi, Uttar Pradesh.
              </p>
            </div>
            <a
              href={contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#1e212b] border border-[#c5a880]/30 text-[#e8d7be] hover:bg-[#c5a880] hover:text-[#0c0d10] text-xs font-semibold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5"
              id="contact-map-btn"
            >
              <span>View Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        </div>

        {/* Central Enquiry Trigger Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#171a25] via-[#1d202d] to-[#171a25] border border-[#c5a880]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a880] font-sans font-semibold block mb-1">
              Custom Requirements?
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f3e5d0] font-normal mb-2">
              Send a Specialized Enquiry to Management
            </h3>
            <p className="text-xs sm:text-sm text-[#a09a8e] font-light max-w-xl">
              From group pilgrimage bookings and customized dietary requirements to banquet decoration, we craft tailored solutions for your trip.
            </p>
          </div>

          <button
            onClick={() => openEnquiryModal('General Enquiry')}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b39366] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(197,168,128,0.4)] transition-all flex items-center gap-2 shrink-0"
            id="open-enquiry-modal-btn"
          >
            <Send className="w-4 h-4" />
            <span>Submit An Enquiry</span>
          </button>
        </div>
      </div>
    </section>
  );
};
