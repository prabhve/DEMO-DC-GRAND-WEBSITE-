import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, Mail, MapPin, Send, ExternalLink, ArrowUpRight } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const ContactScene: React.FC = () => {
  const { contact, openEnquiryModal, openBookingModal } = useHotel();

  const cleanWhatsApp = contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#201D19] text-[#F5F1E9] overflow-hidden border-b border-[#D9D1C5]/15"
    >
      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-3.5 sm:mb-4"
            >
              <span className="w-8 h-[1px] bg-[#B69A69]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.24em] text-[#B69A69] font-medium">
                24/7 Front Desk & Reservations
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-serif-luxury heading-section-fluid text-[#F5F1E9] font-normal"
            >
              Connect With Our Concierge.
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
              Whether reserving a room for your family pilgrimage, planning a celebratory banquet, or requesting station pickup, our Bhelupur front desk is available around the clock.
            </p>
          </motion.div>
        </div>

        {/* 4-Column Architectural Contact Ledger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#D9D1C5]/15 mb-10 sm:mb-14">
          {/* 01: Direct Voice Line */}
          <div className="p-6 sm:p-8 border-r border-b border-[#D9D1C5]/15 bg-[#161412] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#B69A69] mb-5 sm:mb-6">
                <span className="font-mono">01</span>
                <span>Direct Line</span>
              </div>
              <Phone className="w-5 h-5 text-[#B69A69] mb-4" />
              <h3 className="font-serif-luxury text-2xl text-[#F5F1E9] font-normal mb-2">
                Front Desk Telephone
              </h3>
              <p className="text-xs text-[#D9D1C5]/75 leading-relaxed mb-6">
                Speak directly with our duty manager for room availability, tariff quotes, and arrival guidance.
              </p>
            </div>
            <a
              href={`tel:${contact.phone}`}
              id="contact-call-btn"
              className="min-h-[48px] py-3.5 px-4 border border-[#D9D1C5]/25 hover:border-[#B69A69] text-[#F5F1E9] hover:text-[#B69A69] text-xs font-semibold uppercase tracking-[0.16em] text-center transition-colors flex items-center justify-center gap-2 tabular-nums"
            >
              <span>Call {contact.phone}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 02: WhatsApp Concierge */}
          <div className="p-6 sm:p-8 border-r border-b border-[#D9D1C5]/15 bg-[#161412] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#B69A69] mb-5 sm:mb-6">
                <span className="font-mono">02</span>
                <span>Instant Messaging</span>
              </div>
              <MessageCircle className="w-5 h-5 text-[#B69A69] mb-4" />
              <h3 className="font-serif-luxury text-2xl text-[#F5F1E9] font-normal mb-2">
                WhatsApp Concierge
              </h3>
              <p className="text-xs text-[#D9D1C5]/75 leading-relaxed mb-6">
                Receive instant room photographs, live Google Maps location pins, and reservation assistance on WhatsApp.
              </p>
            </div>
            <a
              href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                'Hello Hotel D.C. Grand Varanasi, I would like to inquire about a room reservation.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              id="contact-whatsapp-btn"
              className="min-h-[48px] py-3.5 px-4 bg-[#536E68]/30 hover:bg-[#536E68]/50 border border-[#536E68] text-[#F5F1E9] text-xs font-semibold uppercase tracking-[0.16em] text-center transition-colors flex items-center justify-center gap-2"
            >
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 03: Electronic Mail */}
          <div className="p-6 sm:p-8 border-r border-b border-[#D9D1C5]/15 bg-[#161412] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#B69A69] mb-5 sm:mb-6">
                <span className="font-mono">03</span>
                <span>Written Inquiries</span>
              </div>
              <Mail className="w-5 h-5 text-[#B69A69] mb-4" />
              <h3 className="font-serif-luxury text-2xl text-[#F5F1E9] font-normal mb-2">
                Reservations Email
              </h3>
              <p className="text-xs text-[#D9D1C5]/75 leading-relaxed mb-6">
                Ideal for corporate bookings, group pilgrimage itineraries, banquet RFPs, and written confirmations.
              </p>
            </div>
            <a
              href={`mailto:${contact.email}`}
              id="contact-email-btn"
              className="min-h-[48px] py-3.5 px-4 border border-[#D9D1C5]/25 hover:border-[#B69A69] text-[#F5F1E9] hover:text-[#B69A69] text-xs font-semibold tracking-wider text-center transition-colors flex items-center justify-center truncate"
            >
              <span className="truncate">{contact.email}</span>
            </a>
          </div>

          {/* 04: Property Address */}
          <div className="p-6 sm:p-8 border-r border-b border-[#D9D1C5]/15 bg-[#161412] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#B69A69] mb-5 sm:mb-6">
                <span className="font-mono">04</span>
                <span>Bhelupur · Varanasi</span>
              </div>
              <MapPin className="w-5 h-5 text-[#B69A69] mb-4" />
              <h3 className="font-serif-luxury text-2xl text-[#F5F1E9] font-normal mb-2">
                Property Address
              </h3>
              <p className="text-xs text-[#D9D1C5]/75 leading-relaxed mb-6">
                {contact.address}
              </p>
            </div>
            <a
              href={contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="contact-map-btn"
              className="min-h-[48px] py-3.5 px-4 border border-[#D9D1C5]/25 hover:border-[#B69A69] text-[#F5F1E9] hover:text-[#B69A69] text-xs font-semibold uppercase tracking-[0.16em] text-center transition-colors flex items-center justify-center gap-2"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Custom Requirements & Direct Booking Action Banner */}
        <div className="p-6 sm:p-10 bg-[#161412] border border-[#D9D1C5]/15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#B69A69] font-medium block mb-1.5">
              Bespoke Requests & Group Stays
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F5F1E9] font-normal mb-2">
              Planning a Family Pilgrimage or Special Celebration?
            </h3>
            <p className="text-xs sm:text-sm text-[#D9D1C5]/75 font-light max-w-2xl leading-relaxed">
              Submit a customized inquiry for multi-room bookings, pure vegetarian/Jain catering at Food Express, or banquet hall decorations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => openEnquiryModal('General Enquiry')}
              id="open-enquiry-modal-btn"
              className="min-h-[48px] px-7 py-3.5 sm:py-4 border border-[#D9D1C5]/30 hover:border-[#B69A69] text-[#F5F1E9] hover:text-[#B69A69] text-xs font-semibold uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-[#B69A69]" />
              <span>Send Custom Inquiry</span>
            </button>

            <button
              type="button"
              onClick={() => openBookingModal()}
              className="min-h-[48px] px-7 py-3.5 sm:py-4 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] text-xs font-semibold uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Your Stay</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
