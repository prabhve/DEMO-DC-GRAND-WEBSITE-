import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Lock, ExternalLink } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const Footer: React.FC = () => {
  const { contact, setIsAdminMode, isAdminMode, openBookingModal, openEnquiryModal } = useHotel();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cleanWhatsApp = contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#161412] text-[#D9D1C5] pt-16 sm:pt-20 pb-24 md:pb-14 px-5 sm:px-8 lg:px-12 border-t border-[#D9D1C5]/15">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-12 sm:pb-16 border-b border-[#D9D1C5]/15">
          {/* Column 1: Brand Identity */}
          <div className="lg:col-span-4">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('hero');
              }}
              className="font-serif-luxury text-3xl text-[#F5F1E9] tracking-[0.18em] uppercase block mb-2"
            >
              D.C. GRAND
            </a>
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#B69A69] block mb-5">
              Bhelupur · Varanasi · India
            </span>

            <p className="text-xs sm:text-sm text-[#D9D1C5]/75 leading-relaxed font-light mb-6 max-w-sm">
              Thoughtful boutique hospitality in the spiritual heart of Varanasi—offering climate-controlled rooms, all-floor elevator access, 100% power backup, and in-house Food Express dining.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${contact.phone}`}
                aria-label="Call Front Desk"
                className="w-11 h-11 border border-[#D9D1C5]/20 hover:border-[#B69A69] text-[#B69A69] flex items-center justify-center transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${cleanWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Concierge"
                className="w-11 h-11 border border-[#D9D1C5]/20 hover:border-[#B69A69] text-[#B69A69] flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${contact.email}`}
                aria-label="Email Reservations"
                className="w-11 h-11 border border-[#D9D1C5]/20 hover:border-[#B69A69] text-[#B69A69] flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps Directions"
                className="w-11 h-11 border border-[#D9D1C5]/20 hover:border-[#B69A69] text-[#B69A69] flex items-center justify-center transition-colors"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.22em] text-[#B69A69] font-semibold mb-5">
              Navigation
            </h4>
            <ul className="space-y-3 text-xs uppercase tracking-[0.15em]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('hero')}
                  className="text-[#D9D1C5]/80 hover:text-[#F5F1E9] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('intro')}
                  className="text-[#D9D1C5]/80 hover:text-[#F5F1E9] transition-colors cursor-pointer"
                >
                  About the Hotel
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('rooms')}
                  className="text-[#D9D1C5]/80 hover:text-[#F5F1E9] transition-colors cursor-pointer"
                >
                  Rooms & Suites
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('restaurant')}
                  className="text-[#D9D1C5]/80 hover:text-[#F5F1E9] transition-colors cursor-pointer"
                >
                  Food Express Dining
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('gallery')}
                  className="text-[#D9D1C5]/80 hover:text-[#F5F1E9] transition-colors cursor-pointer"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('contact')}
                  className="text-[#D9D1C5]/80 hover:text-[#F5F1E9] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Guest Services & Policies */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.22em] text-[#B69A69] font-semibold mb-5">
              Reservations & Services
            </h4>
            <ul className="space-y-3 text-xs uppercase tracking-[0.15em]">
              <li>
                <button
                  type="button"
                  onClick={() => openBookingModal()}
                  className="text-[#F5F1E9] hover:text-[#B69A69] font-semibold transition-colors cursor-pointer"
                >
                  Book Your Stay
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openEnquiryModal('Restaurant Enquiry')}
                  className="text-[#D9D1C5]/80 hover:text-[#F5F1E9] transition-colors cursor-pointer"
                >
                  Food Express Table Inquiry
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openEnquiryModal('Meeting / Event Enquiry')}
                  className="text-[#D9D1C5]/80 hover:text-[#F5F1E9] transition-colors cursor-pointer"
                >
                  Banquet & Hall Booking
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('location')}
                  className="text-[#D9D1C5]/80 hover:text-[#F5F1E9] transition-colors cursor-pointer"
                >
                  Varanasi Pilgrimage Map
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('policies')}
                  className="text-[#D9D1C5]/80 hover:text-[#F5F1E9] transition-colors cursor-pointer"
                >
                  Check-In: {contact.checkInTime || '12:00 PM'} · Check-Out: {contact.checkOutTime || '11:00 AM'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Contact & Portal */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.22em] text-[#B69A69] font-semibold mb-5">
              Address & Direct Desk
            </h4>
            <div className="space-y-3 text-xs text-[#D9D1C5]/80 mb-6">
              <p className="leading-relaxed flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B69A69] shrink-0 mt-0.5" />
                <span>{contact.address}</span>
              </p>
              <p className="flex items-center gap-2.5 tabular-nums">
                <Phone className="w-4 h-4 text-[#B69A69] shrink-0" />
                <a href={`tel:${contact.phone}`} className="hover:text-[#F5F1E9] transition-colors">
                  {contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B69A69] shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-[#F5F1E9] transition-colors truncate">
                  {contact.email}
                </a>
              </p>
              <p className="flex items-center gap-2.5 pt-1">
                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#B69A69] hover:underline inline-flex items-center gap-1.5 uppercase tracking-[0.15em]"
                >
                  <span>Get Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAdminMode(!isAdminMode)}
              id="footer-admin-btn"
              className={`min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] font-semibold transition-colors border cursor-pointer ${
                isAdminMode
                  ? 'bg-[#B69A69] text-[#201D19] border-[#B69A69]'
                  : 'bg-[#201D19] text-[#B69A69] border-[#D9D1C5]/20 hover:border-[#B69A69]'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isAdminMode ? 'Exit Admin Dashboard' : 'Admin CMS Portal'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Policies */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#D9D1C5]/60 gap-4 text-center md:text-left">
          <p>© {new Date().getFullYear()} Hotel D.C. Grand, Bhelupur, Varanasi. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 uppercase tracking-[0.14em] text-[11px]">
            <button
              type="button"
              onClick={() => scrollTo('policies')}
              className="py-1 hover:text-[#F5F1E9] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => scrollTo('policies')}
              className="py-1 hover:text-[#F5F1E9] transition-colors cursor-pointer"
            >
              Cancellation Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => scrollTo('policies')}
              className="py-1 hover:text-[#F5F1E9] transition-colors cursor-pointer"
            >
              Terms of Stay
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
