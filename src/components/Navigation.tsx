import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Calendar,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPhonePopoverOpen, setIsPhonePopoverOpen] = useState(false);

  const { openBookingModal, contact } = useHotel();
  const phoneRef = useRef<HTMLDivElement>(null);

  // Core navigation items in precise order matching Image 2
  const navItems: NavItem[] = [
    { id: 'hero', label: 'HOME', href: '#hero' },
    { id: 'rooms', label: 'ROOMS', href: '#rooms' },
    { id: 'restaurant', label: 'FOOD EXPRESS', href: '#restaurant' },
    { id: 'events', label: 'EVENTS', href: '#events' },
    { id: 'gallery', label: 'GALLERY', href: '#gallery' },
    { id: 'about', label: 'ABOUT', href: '#about' },
    { id: 'location', label: 'LOCATION', href: '#location' },
    { id: 'contact', label: 'CONTACT', href: '#contact' }
  ];

  // Handle scroll detection and active section spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Active section spy
      const sectionIds = ['hero', 'rooms', 'restaurant', 'events', 'gallery', 'about', 'location', 'contact'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close phone popover on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (phoneRef.current && !phoneRef.current.contains(e.target as Node)) {
        setIsPhonePopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const cleanPhone = contact.phone.replace(/[^0-9]/g, '');
  const cleanWhatsApp = contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      {/* 1. Top Concierge & Utility Ribbon (Matching Image 2) */}
      <div className="w-full bg-[#08090c] border-b border-[#1f212d]/80 text-[10px] sm:text-[11px] text-[#9b9589] py-1.5 px-2.5 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Location & Check-in info */}
          <div className="flex items-center gap-3 sm:gap-6 tracking-wide truncate">
            <div className="flex items-center gap-1.5 text-[#a8a295] truncate">
              <MapPin className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
              <span className="truncate">
                <strong className="font-medium text-[#c5a880]">Bhelupur, Varanasi</strong>
                <span className="text-[#686359] mx-1.5 hidden sm:inline">•</span>
                <span className="text-[#a8a295] hidden sm:inline">Newly Opened Hotel</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-[#888277]">
              <Clock className="w-3.5 h-3.5 text-[#c5a880]/70 shrink-0" />
              <span>Check-in: 12:00 PM</span>
            </div>
          </div>

          {/* Right: Hotline & WhatsApp Concierge */}
          <div className="flex items-center gap-2.5 sm:gap-6 shrink-0">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-1 text-[#c5a880] hover:text-[#e2caa8] transition-colors font-medium whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-[#c5a880] shrink-0" />
              <span className="hidden md:inline text-[#9b9589]">Reception:</span>
              <span className="hidden sm:inline">{contact.phone}</span>
              <span className="sm:hidden text-[10px]">Call</span>
            </a>

            <a
              href={`https://wa.me/${cleanWhatsApp}?text=Hello%20DC%20Grand%20Varanasi%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20stay.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#25D366] hover:text-[#45e080] transition-colors font-medium whitespace-nowrap"
            >
              <MessageCircle className="w-3 h-3 shrink-0" />
              <span className="hidden sm:inline">WhatsApp Concierge</span>
              <span className="sm:hidden text-[10px]">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Full-Width Navigation Bar (Matching Image 2) */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0c0d10]/95 backdrop-blur-xl border-b border-[#c5a880]/30 shadow-2xl shadow-black/60 py-2 sm:py-3'
            : 'bg-[#0c0d10]/90 backdrop-blur-md border-b border-[#c5a880]/20 py-2.5 sm:py-3.5'
        } px-2.5 sm:px-6 lg:px-8`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
          {/* Brand Crest & Monogram */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            className="flex items-center gap-2 sm:gap-3.5 group shrink-0 min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#c5a880]/60 flex items-center justify-center bg-[#13141b] shadow-[0_0_15px_rgba(197,168,128,0.15)] group-hover:border-[#c5a880] transition-all shrink-0">
              <span className="font-display text-[#c5a880] text-xs sm:text-sm font-semibold tracking-wider">DC</span>
            </div>
            <div className="flex flex-col truncate">
              <span className="font-serif-luxury text-base sm:text-2xl text-[#f3e5d0] tracking-wider uppercase leading-none group-hover:text-white transition-colors truncate">
                D C Grand
              </span>
              <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.18em] sm:tracking-[0.26em] text-[#c5a880] font-sans font-medium mt-0.5 sm:mt-1 truncate">
                Bhelupur • Varanasi
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links - Single Horizontal Axis (strictly non-wrapping) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-[11px] xl:text-xs tracking-[0.14em] font-medium">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                  className={`relative px-3 xl:px-4 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap uppercase flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1e1c18] text-[#f3e5d0] border border-[#c5a880]/40 font-semibold shadow-[0_0_12px_rgba(197,168,128,0.2)]'
                      : 'text-[#9e988c] hover:text-[#f3e5d0] hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] shadow-[0_0_6px_#c5a880]" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action Deck: Quick Call & Primary CTA */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Phone Quick Popover */}
            <div className="relative" ref={phoneRef}>
              <button
                type="button"
                onClick={() => setIsPhonePopoverOpen(!isPhonePopoverOpen)}
                aria-label="Front Desk Telephone"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#151720] border border-[#2b2824] text-[#c5a880] hover:border-[#c5a880] hover:text-[#f3e5d0] hover:bg-[#1a1c26] flex items-center justify-center transition-all shadow-sm shrink-0"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <AnimatePresence>
                {isPhonePopoverOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-64 p-4 rounded-2xl bg-[#0e1017] border border-[#2c2823] shadow-2xl shadow-black z-50 text-xs"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold">
                        Front Desk & Concierge
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <p className="text-[#a09a8e] text-[11px] mb-3 leading-relaxed">
                      Assistance with room reservations, banquet booking, and temple tours.
                    </p>
                    <a
                      href={`tel:${contact.phone}`}
                      className="block w-full py-2.5 px-3 rounded-xl bg-[#c5a880] hover:bg-[#d8bf9a] text-[#0c0d10] font-bold text-center text-xs uppercase tracking-wider transition-colors shadow-md"
                    >
                      Call {contact.phone}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Primary CTA: REQUEST STAY */}
            <button
              onClick={() => openBookingModal()}
              className="bg-gradient-to-r from-[#d8bf9a] via-[#c5a880] to-[#b3956c] text-[#0c0d10] font-bold text-[11px] sm:text-xs uppercase tracking-wider px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-[0_4px_20px_rgba(197,168,128,0.25)] hover:shadow-[0_6px_25px_rgba(197,168,128,0.4)] hover:brightness-105 active:scale-[0.98] transition-all flex items-center gap-1.5 shrink-0"
              id="header-request-stay-btn"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xs:inline">Request </span>
              <span>Stay</span>
            </button>

            {/* Mobile Menu Button (< lg) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#151720] border border-[#2b2824] text-[#f3e5d0] flex items-center justify-center hover:border-[#c5a880] transition-colors shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#0c0d10]/98 border-b border-[#2c2823] backdrop-blur-2xl px-5 py-6 space-y-5 shadow-2xl overflow-hidden"
          >
            {/* Nav list */}
            <div className="grid grid-cols-2 gap-2 text-xs uppercase tracking-wider font-medium">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.id);
                    }}
                    className={`p-3 rounded-xl flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-[#c5a880]/15 text-[#f3e5d0] border border-[#c5a880]/40 font-semibold'
                        : 'bg-[#12141c] text-[#a09a8e] hover:text-[#f3e5d0] border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-[#c5a880]" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-[#555]" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Mobile Actions */}
            <div className="pt-2 border-t border-[#1e2029] space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="w-full py-3 rounded-xl bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Request Room Booking</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${contact.phone}`}
                  className="py-2.5 px-3 rounded-xl bg-[#151720] border border-[#2b2824] text-[#c5a880] flex items-center justify-center gap-1.5 font-medium"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Desk</span>
                </a>
                <a
                  href={`https://wa.me/${cleanWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#151720] border border-[#2b2824] text-[#25D366] flex items-center justify-center gap-1.5 font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
