import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  MapPin,
  ArrowUpRight
} from 'lucide-react';
import { useHotel } from '../context/HotelContext';

interface NavItem {
  id: string;
  label: string;
  href: string;
  matchIds: string[];
}

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { openBookingModal, contact } = useHotel();

  const navItems: NavItem[] = [
    { id: 'hero', label: 'Home', href: '#hero', matchIds: ['hero'] },
    { id: 'intro', label: 'About', href: '#intro', matchIds: ['intro', 'about'] },
    { id: 'rooms', label: 'Rooms & Suites', href: '#rooms', matchIds: ['rooms'] },
    { id: 'restaurant', label: 'Experiences', href: '#restaurant', matchIds: ['restaurant', 'highlights', 'events', 'location'] },
    { id: 'gallery', label: 'Gallery', href: '#gallery', matchIds: ['gallery', 'reviews'] },
    { id: 'contact', label: 'Contact', href: '#contact', matchIds: ['contact'] }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 36);

      const sectionIds = [
        'hero',
        'intro',
        'rooms',
        'highlights',
        'restaurant',
        'events',
        'about',
        'location',
        'gallery',
        'reviews',
        'contact'
      ];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220 && rect.bottom >= 160) {
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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const cleanWhatsApp = contact.whatsapp.replace(/[^0-9]/g, '');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#201D19]/95 backdrop-blur-md border-b border-[#D9D1C5]/15 py-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.45)]'
          : 'bg-gradient-to-b from-[#201D19]/85 via-[#201D19]/40 to-transparent py-5 sm:py-6'
      }`}
    >
      <nav
        aria-label="Primary Navigation"
        className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4"
      >
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('hero');
          }}
          className="font-serif-luxury text-xl sm:text-2xl lg:text-[26px] text-[#F5F1E9] tracking-[0.18em] uppercase font-medium whitespace-nowrap shrink-0 hover:text-[#B69A69] transition-colors"
        >
          D.C. GRAND
        </a>

        {/* Zone 2: Primary Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7 xl:gap-9">
          {navItems.map((item) => {
            const isActive = item.matchIds.includes(activeSection);
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.id);
                }}
                className={`relative py-1.5 text-xs uppercase tracking-[0.16em] whitespace-nowrap transition-colors duration-300 group ${
                  isActive
                    ? 'text-[#F5F1E9] font-medium'
                    : 'text-[#D9D1C5]/80 hover:text-[#F5F1E9]'
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`absolute left-0 right-0 bottom-0 h-[1.5px] bg-[#B69A69] transition-transform duration-300 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Zone 3: Single Primary Action & Mobile Drawer Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => openBookingModal()}
            id="header-request-stay-btn"
            className="px-4 sm:px-6 py-2.5 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] whitespace-nowrap shrink-0 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(182,154,105,0.3)] active:scale-[0.99] cursor-pointer"
          >
            Book Now
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 border border-[#D9D1C5]/25 text-[#F5F1E9] flex items-center justify-center hover:border-[#B69A69] hover:text-[#B69A69] transition-colors shrink-0 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-[#201D19] border-b border-[#D9D1C5]/15 px-6 pt-6 pb-8 shadow-2xl"
          >
            <div className="flex flex-col divide-y divide-[#D9D1C5]/10">
              {navItems.map((item, idx) => {
                const isActive = item.matchIds.includes(activeSection);
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.id);
                    }}
                    className={`py-3.5 flex items-center justify-between text-sm uppercase tracking-[0.18em] transition-colors ${
                      isActive ? 'text-[#B69A69] font-semibold' : 'text-[#F5F1E9] hover:text-[#B69A69]'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-[#D9D1C5]/45 tabular-nums">
                        0{idx + 1}
                      </span>
                      <span>{item.label}</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#B69A69]/70" />
                  </a>
                );
              })}
            </div>

            {/* Direct Concierge Links inside Mobile Drawer */}
            <div className="mt-6 pt-6 border-t border-[#D9D1C5]/15 space-y-4">
              <div className="flex items-start gap-2.5 text-xs text-[#D9D1C5]/80">
                <MapPin className="w-4 h-4 text-[#B69A69] shrink-0 mt-0.5" />
                <span>{contact.address}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={`tel:${contact.phone}`}
                  className="py-3 px-4 border border-[#D9D1C5]/20 text-[#F5F1E9] hover:border-[#B69A69] text-xs uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#B69A69]" />
                  <span>Call Desk</span>
                </a>
                <a
                  href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                    'Hello Hotel D.C. Grand Varanasi, I would like to inquire about booking a stay.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 border border-[#536E68]/60 bg-[#536E68]/20 text-[#F5F1E9] hover:bg-[#536E68]/35 text-xs uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#B69A69]" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="w-full py-3.5 bg-[#B69A69] text-[#201D19] font-semibold text-xs uppercase tracking-[0.18em] text-center transition-colors"
              >
                Book Your Stay
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
