import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Lock } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const Footer: React.FC = () => {
  const { contact, setIsAdminMode, isAdminMode, openBookingModal, openEnquiryModal } = useHotel();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07080a] border-t border-[#1e2029] text-[#a09a8e] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1b1c24]">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border border-[#c5a880]/50 flex items-center justify-center bg-[#13141a]">
                <span className="font-display text-[#c5a880] text-sm font-semibold">DC</span>
              </div>
              <div>
                <span className="font-serif-luxury text-2xl text-[#f3e5d0] tracking-wider uppercase block leading-none">
                  D C Grand
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#c5a880] font-sans">
                  Bhelupur • Varanasi
                </span>
              </div>
            </div>

            <p className="text-xs text-[#8f8a80] leading-relaxed font-light mb-6 max-w-sm">
              Newly opened boutique hospitality offering a peaceful, comfortable stay in Bhelupur, close to Kashi Vishwanath, Sankat Mochan Temple, and the holy Ghats.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${contact.phone}`}
                className="w-9 h-9 rounded-full bg-[#13151f] border border-[#2a2723] text-[#c5a880] flex items-center justify-center hover:bg-[#c5a880] hover:text-[#0c0d10] transition-colors"
                title="Call Front Desk"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#13151f] border border-[#2a2723] text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-[#0c0d10] transition-colors"
                title="WhatsApp Us"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="w-9 h-9 rounded-full bg-[#13151f] border border-[#2a2723] text-[#c5a880] flex items-center justify-center hover:bg-[#c5a880] hover:text-[#0c0d10] transition-colors"
                title="Email Desk"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#f3e5d0] font-semibold mb-4">
              Explore Property
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo('hero')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('rooms')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Suites & Accommodations
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('restaurant')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Food Express Dining
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('events')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Banquet & Celebrations
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('gallery')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  3D Visual Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('location')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Location & Map
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#f3e5d0] font-semibold mb-4">
              Guest Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => openBookingModal()}
                  className="text-[#c5a880] hover:underline"
                >
                  Request Room Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => openEnquiryModal('General Enquiry')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  General Inquiry
                </button>
              </li>
              <li>
                <button
                  onClick={() => openEnquiryModal('Restaurant Enquiry')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Restaurant Reservations
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('policies')}
                  className="hover:text-[#c5a880] transition-colors"
                >
                  Hotel Policies
                </button>
              </li>
            </ul>
          </div>

          {/* Address & Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#f3e5d0] font-semibold mb-4">
              Property Location
            </h4>
            <p className="text-xs text-[#8f8a80] leading-relaxed mb-3 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
              <span>{contact.address}</span>
            </p>
            <p className="text-xs text-[#c5a880] font-medium mb-4">
              ~2 km from Sankat Mochan Hanuman Temple
            </p>
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#777166] hover:text-[#c5a880] transition-colors"
              id="footer-admin-btn"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Management CMS</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6b665c] gap-4">
          <p>© {new Date().getFullYear()} D C Grand, Bhelupur, Varanasi. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => scrollTo('policies')} className="hover:text-[#a09a8e] transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => scrollTo('policies')} className="hover:text-[#a09a8e] transition-colors">
              Cancellation Policy
            </button>
            <span>•</span>
            <button onClick={() => scrollTo('policies')} className="hover:text-[#a09a8e] transition-colors">
              Terms of Stay
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
