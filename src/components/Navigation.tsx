import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Lock, Phone, MessageSquare } from 'lucide-react';
import { useHotel } from '../context/HotelContext';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBookingModal, openEnquiryModal, setIsAdminMode, isAdminMode, contact } = useHotel();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Rooms', href: '#rooms' },
    { label: 'Food Express', href: '#restaurant' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0c0d10]/85 backdrop-blur-md border-b border-[#c5a880]/15 py-3 shadow-lg shadow-black/40'
            : 'bg-gradient-to-b from-[#0c0d10]/80 via-[#0c0d10]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo / Monogram */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="flex items-center gap-3 group focus:outline-none"
              id="brand-logo-link"
            >
              <div className="w-10 h-10 rounded-full border border-[#c5a880]/50 flex items-center justify-center bg-[#13141a]/90 group-hover:border-[#c5a880] transition-colors shadow-[0_0_15px_rgba(197,168,128,0.1)]">
                <span className="font-display text-[#c5a880] text-sm font-semibold tracking-wider">DC</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-xl sm:text-2xl text-[#f3e5d0] tracking-[0.18em] font-normal uppercase leading-tight group-hover:text-white transition-colors">
                  D C Grand
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#c5a880] font-sans font-medium">
                  Bhelupur • Varanasi
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="text-xs uppercase tracking-[0.18em] text-[#d1ccc0] hover:text-[#c5a880] transition-colors py-1 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c5a880] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Call */}
              <a
                href={`tel:${contact.phone}`}
                className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-[#c5a880]/30 text-[#c5a880] hover:bg-[#c5a880]/15 hover:border-[#c5a880] transition-all"
                title="Call Front Desk"
                id="header-call-button"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>

              {/* Admin Portal Toggle */}
              <button
                onClick={() => setIsAdminMode(!isAdminMode)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[11px] uppercase tracking-wider transition-all ${
                  isAdminMode
                    ? 'bg-[#c5a880] text-[#0c0d10] border-[#c5a880] font-semibold'
                    : 'border-[#c5a880]/30 text-[#a09a8e] hover:text-[#f3e5d0] hover:border-[#c5a880]/60'
                }`}
                title="Open Hotel Management CMS"
                id="admin-mode-toggle"
              >
                <Lock className="w-3 h-3" />
                <span className="hidden md:inline">{isAdminMode ? 'Exit Admin' : 'Admin CMS'}</span>
              </button>

              {/* Request Booking Primary CTA */}
              <button
                onClick={() => openBookingModal()}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#c5a880] to-[#b39366] text-[#0c0d10] font-semibold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(197,168,128,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                id="header-booking-button"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">Request Stay</span>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#e5e3dc] hover:text-[#c5a880] hover:bg-[#15171e] transition-colors focus:outline-none"
                aria-label="Toggle menu"
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0c0d10]/95 backdrop-blur-xl border-b border-[#c5a880]/20 px-6 py-6 shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="text-sm uppercase tracking-[0.2em] text-[#d1ccc0] hover:text-[#c5a880] py-1 border-b border-[#2a2723]/40"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBookingModal();
                  }}
                  className="w-full py-2.5 rounded-full bg-[#c5a880] text-[#0c0d10] font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Request Booking
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openEnquiryModal('General Enquiry');
                  }}
                  className="w-full py-2 rounded-full border border-[#c5a880]/40 text-[#f3e5d0] text-xs tracking-widest uppercase flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Make an Enquiry
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminMode(!isAdminMode);
                  }}
                  className="w-full py-2 rounded-full border border-[#a09a8e]/30 text-[#a09a8e] text-xs tracking-widest uppercase flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  {isAdminMode ? 'Close Admin Dashboard' : 'Open Admin CMS'}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
