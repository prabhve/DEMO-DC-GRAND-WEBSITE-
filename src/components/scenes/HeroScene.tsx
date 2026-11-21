import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Users,
  BedDouble,
  ArrowRight,
  Eye,
  ChevronDown,
  ChevronUp,
  Star,
  ShieldCheck,
  MapPin,
  SlidersHorizontal
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

const FALLBACK_HERO_IMAGE =
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=85';

interface HeroPerspective {
  id: string;
  label: string;
  shortLabel: string;
  caption: string;
  image: string;
}

export const HeroScene: React.FC = () => {
  const { homeCms, rooms, gallery, openBookingModal, openVirtualTour } = useHotel();
  const prefersReducedMotion = useReducedMotion();

  const primaryCover =
    homeCms.heroCoverImage && homeCms.heroCoverImage.trim().length > 0
      ? homeCms.heroCoverImage.trim()
      : FALLBACK_HERO_IMAGE;

  const lobbyImage =
    gallery.find((g) => g.id === 'gal-2')?.url?.trim() ||
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80';

  const suiteImage =
    rooms.find((r) => r.isActive)?.coverImage?.trim() ||
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80';

  const perspectives: HeroPerspective[] = [
    {
      id: 'exterior',
      label: '01 · Dusk Arrival',
      shortLabel: '01 · Facade',
      caption: 'Illuminated Facade · Bhelupur, Varanasi',
      image: primaryCover
    },
    {
      id: 'foyer',
      label: '02 · Reception Foyer',
      shortLabel: '02 · Foyer',
      caption: 'Double-Height Lobby & Concierge Desk',
      image: lobbyImage
    },
    {
      id: 'sanctuary',
      label: '03 · Guest Chambers',
      shortLabel: '03 · Suites',
      caption: 'Super Deluxe Sanctuary & Custom Millwork',
      image: suiteImage
    }
  ];

  const [activePerspectiveIdx, setActivePerspectiveIdx] = useState<number>(0);
  const [mobileBookingExpanded, setMobileBookingExpanded] = useState<boolean>(false);
  const currentPerspective = perspectives[activePerspectiveIdx] || perspectives[0];

  // Quick Availability Bar State
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const twoDaysLater = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

  const [checkInDate, setCheckInDate] = useState<string>(tomorrow);
  const [checkOutDate, setCheckOutDate] = useState<string>(twoDaysLater);
  const [guests, setGuests] = useState<number>(2);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    rooms.find((r) => r.isActive)?.id || 'room-super-deluxe'
  );

  // Auto-advance checkOutDate if checkInDate moves past or equal to checkOutDate
  const handleCheckInChange = (newCheckIn: string) => {
    setCheckInDate(newCheckIn);
    if (newCheckIn && checkOutDate <= newCheckIn) {
      const nextDay = new Date(new Date(newCheckIn).getTime() + 86400000)
        .toISOString()
        .split('T')[0];
      setCheckOutDate(nextDay);
    }
  };

  // Subtle auto-cycle of hero architectural perspectives unless reduced motion is enabled
  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActivePerspectiveIdx((prev) => (prev + 1) % perspectives.length);
    }, 7500);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, perspectives.length]);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, prefersReducedMotion ? 1 : 1.05]);
  const yText = useTransform(scrollYProgress, [0, 0.25], [0, prefersReducedMotion ? 0 : 28]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const activeRooms = rooms.filter((r) => r.isActive);
  const selectedRoomName =
    activeRooms.find((r) => r.id === selectedRoomId)?.name || 'Super Deluxe Room';

  const handleQuickAvailabilitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openBookingModal({
      roomId: selectedRoomId,
      checkInDate,
      checkOutDate,
      guests
    });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-20 sm:pt-24 lg:pt-[88px] pb-8 sm:pb-12 bg-[#201D19]"
    >
      {/* Full-Bleed Architectural Hero Photograph with Crossfade & Atmospheric Scrim */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentPerspective.image}
            src={currentPerspective.image}
            alt={`Hotel D.C. Grand Varanasi — ${currentPerspective.caption}`}
            initial={{ opacity: 0.35, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1.01 }}
            exit={{ opacity: 0.35 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            fetchPriority="high"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== FALLBACK_HERO_IMAGE) {
                target.src = FALLBACK_HERO_IMAGE;
              }
            }}
            className="w-full h-full object-cover object-[60%_center] sm:object-center"
          />
        </AnimatePresence>
        {/* Layered Editorial Scrims for Legibility and Warm Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#201D19]/85 via-[#201D19]/55 to-[#201D19]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#201D19]/90 via-[#201D19]/45 to-transparent" />
      </motion.div>

      {/* Main Editorial Hero Content */}
      <motion.div
        style={{ y: yText }}
        className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 my-auto pt-4 sm:pt-5 lg:pt-4 pb-8 sm:pb-14 lg:pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          {/* Left 8 Columns: Editorial Headline & Primary CTAs */}
          <div className="lg:col-span-8">
            {/* 1. Unboxed Editorial Kicker & Verified Rating */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5 mb-4 sm:mb-5"
            >
              <span className="w-6 sm:w-8 h-[1px] bg-[#B69A69] hidden sm:inline-block" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#B69A69] font-medium">
                {homeCms.heroBadge || 'Bhelupur, Varanasi · Boutique Hospitality'}
              </span>
              <span className="text-[#D9D1C5]/40">·</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-[#F5F1E9]">
                <Star className="w-3.5 h-3.5 fill-[#B69A69] text-[#B69A69]" />
                <span className="tabular-nums font-medium">4.8 Google Rated</span>
              </span>
            </motion.div>

            {/* 2. Fluid Editorial Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif-luxury heading-hero-fluid text-[#F5F1E9] font-normal mb-4 sm:mb-6 max-w-3xl"
            >
              {homeCms.heroHeadline || 'Your Story of Comfort Begins in Varanasi.'}
            </motion.h1>

            {/* 3. Supporting Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-lg lg:text-xl text-[#D9D1C5]/90 font-light leading-relaxed max-w-[54ch] mb-6 sm:mb-9"
            >
              {homeCms.heroSupportingText ||
                'Discover thoughtful hospitality, inviting spaces and a memorable stay in the spiritual heart of Varanasi.'}
            </motion.p>

            {/* 4 & 5 & 6. Primary & Secondary Action Hierarchy (Touch-Optimized 48px Targets) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-3.5"
            >
              {/* Primary CTA: Full-width on mobile, inline on tablet/desktop */}
              <button
                type="button"
                onClick={() =>
                  openBookingModal({
                    roomId: selectedRoomId,
                    checkInDate,
                    checkOutDate,
                    guests
                  })
                }
                id="hero-request-booking-btn"
                className="w-full sm:w-auto min-h-[48px] px-7 sm:px-8 py-3.5 sm:py-4 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_12px_32px_rgba(182,154,105,0.28)] cursor-pointer group"
              >
                <span>{homeCms.heroBookingBtnText || 'Book Your Stay'}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Secondary & 360° Tour CTAs: 2-Column Touch Row on Mobile, Inline on sm+ */}
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => scrollToSection('rooms')}
                  id="hero-explore-rooms-btn"
                  className="min-h-[48px] px-3 sm:px-8 py-3.5 sm:py-4 border border-[#D9D1C5]/35 hover:border-[#B69A69] text-[#F5F1E9] hover:text-[#B69A69] bg-[#201D19]/50 backdrop-blur-xs text-[11px] sm:text-xs font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{homeCms.heroExploreBtnText || 'Explore the Hotel'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => openVirtualTour(selectedRoomId)}
                  className="min-h-[48px] px-3 sm:px-5 py-3.5 sm:py-4 border border-[#D9D1C5]/20 sm:border-transparent bg-[#201D19]/35 sm:bg-transparent text-[#D9D1C5] hover:text-[#B69A69] text-[11px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.18em] transition-colors flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#B69A69] shrink-0" />
                  <span>360° Room Tour</span>
                </button>
              </div>
            </motion.div>

            {/* Compact Mobile & Tablet Perspective Switcher (< lg) */}
            <div className="mt-6 pt-4 border-t border-[#D9D1C5]/15 flex items-center justify-between gap-2 lg:hidden">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#B69A69] font-medium shrink-0">
                View:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {perspectives.map((p, idx) => {
                  const isActive = idx === activePerspectiveIdx;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActivePerspectiveIdx(idx)}
                      className={`min-h-[36px] px-2.5 py-1.5 text-[10px] uppercase tracking-[0.14em] whitespace-nowrap border transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#B69A69]/20 border-[#B69A69] text-[#F5F1E9] font-semibold'
                          : 'bg-[#161412]/70 border-[#D9D1C5]/15 text-[#D9D1C5]/70'
                      }`}
                    >
                      {p.shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Interactive Desktop Architectural Perspective Switcher (Preserved on lg+) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32 }}
            className="lg:col-span-4 border-l border-[#D9D1C5]/20 pl-6 hidden lg:flex flex-col justify-end space-y-4"
          >
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#B69A69] font-medium">
              Architectural Perspectives
            </span>
            <div className="space-y-2.5">
              {perspectives.map((p, idx) => {
                const isActive = idx === activePerspectiveIdx;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePerspectiveIdx(idx)}
                    className={`w-full text-left py-2 transition-colors cursor-pointer group ${
                      isActive ? 'text-[#F5F1E9]' : 'text-[#D9D1C5]/55 hover:text-[#F5F1E9]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] font-medium">
                      <span>{p.label}</span>
                      <span
                        className={`h-[1.5px] transition-all duration-300 ${
                          isActive ? 'w-8 bg-[#B69A69]' : 'w-0 bg-transparent group-hover:w-4 group-hover:bg-[#D9D1C5]/40'
                        }`}
                      />
                    </div>
                    <p className="text-[11px] text-[#D9D1C5]/70 font-light mt-0.5">
                      {p.caption}
                    </p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Dock: Direct Booking Availability Bar & Immediate Hospitality Trust Strip */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* A. Mobile & Tablet Compact Expandable Booking Panel (< lg) */}
        <div className="lg:hidden bg-[#161412]/95 backdrop-blur-md border border-[#D9D1C5]/20 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
          {/* Compact Summary Row (Always Visible on Mobile) */}
          <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setMobileBookingExpanded((prev) => !prev)}
              aria-expanded={mobileBookingExpanded}
              aria-controls="mobile-hero-booking-panel"
              className="flex items-center justify-between gap-3 text-left w-full sm:w-auto min-h-[44px] cursor-pointer"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#B69A69] font-medium">
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>Direct Booking · Best Rate</span>
                </div>
                <div className="text-xs sm:text-sm text-[#F5F1E9] font-medium truncate mt-0.5 tabular-nums">
                  {checkInDate} → {checkOutDate} · {guests} {guests === 1 ? 'Guest' : 'Guests'}
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-[#D9D1C5]/20 text-[10px] uppercase tracking-[0.14em] text-[#D9D1C5] shrink-0">
                <span>{mobileBookingExpanded ? 'Hide' : 'Edit Dates'}</span>
                {mobileBookingExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5 text-[#B69A69]" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-[#B69A69]" />
                )}
              </span>
            </button>

            {!mobileBookingExpanded && (
              <button
                type="button"
                onClick={handleQuickAvailabilitySubmit}
                className="w-full sm:w-auto min-h-[46px] px-5 py-3 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] font-semibold text-xs uppercase tracking-[0.16em] transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Check Availability</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Expandable Mobile Vertical Booking Form */}
          <AnimatePresence initial={false}>
            {mobileBookingExpanded && (
              <motion.form
                id="mobile-hero-booking-panel"
                onSubmit={handleQuickAvailabilitySubmit}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="border-t border-[#D9D1C5]/15 overflow-hidden"
              >
                <div className="p-4 space-y-3.5">
                  <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-3">
                    {/* Mobile Check-In */}
                    <div className="p-3 bg-[#201D19] border border-[#D9D1C5]/15">
                      <label
                        htmlFor="mobile-hero-checkin"
                        className="text-[10px] uppercase tracking-[0.18em] text-[#B69A69] font-medium mb-1 flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Check-In</span>
                      </label>
                      <input
                        id="mobile-hero-checkin"
                        type="date"
                        min={todayStr}
                        value={checkInDate}
                        onChange={(e) => handleCheckInChange(e.target.value)}
                        className="w-full min-h-[36px] bg-transparent text-[#F5F1E9] text-xs sm:text-sm font-medium focus:outline-none tabular-nums [color-scheme:dark]"
                        required
                      />
                    </div>

                    {/* Mobile Check-Out */}
                    <div className="p-3 bg-[#201D19] border border-[#D9D1C5]/15">
                      <label
                        htmlFor="mobile-hero-checkout"
                        className="text-[10px] uppercase tracking-[0.18em] text-[#B69A69] font-medium mb-1 flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Check-Out</span>
                      </label>
                      <input
                        id="mobile-hero-checkout"
                        type="date"
                        min={
                          checkInDate
                            ? new Date(new Date(checkInDate).getTime() + 86400000)
                                .toISOString()
                                .split('T')[0]
                            : tomorrow
                        }
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full min-h-[36px] bg-transparent text-[#F5F1E9] text-xs sm:text-sm font-medium focus:outline-none tabular-nums [color-scheme:dark]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Mobile Guests */}
                    <div className="p-3 bg-[#201D19] border border-[#D9D1C5]/15">
                      <label
                        htmlFor="mobile-hero-guests"
                        className="text-[10px] uppercase tracking-[0.18em] text-[#B69A69] font-medium mb-1 flex items-center gap-1.5"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Guests</span>
                      </label>
                      <select
                        id="mobile-hero-guests"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full min-h-[36px] bg-transparent text-[#F5F1E9] text-xs sm:text-sm font-medium focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num} className="bg-[#201D19] text-[#F5F1E9]">
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Mobile Accommodation */}
                    <div className="p-3 bg-[#201D19] border border-[#D9D1C5]/15">
                      <label
                        htmlFor="mobile-hero-room"
                        className="text-[10px] uppercase tracking-[0.18em] text-[#B69A69] font-medium mb-1 flex items-center gap-1.5"
                      >
                        <BedDouble className="w-3.5 h-3.5" />
                        <span>Accommodation</span>
                      </label>
                      <select
                        id="mobile-hero-room"
                        value={selectedRoomId}
                        onChange={(e) => setSelectedRoomId(e.target.value)}
                        className="w-full min-h-[36px] bg-transparent text-[#F5F1E9] text-xs sm:text-sm font-medium focus:outline-none truncate"
                      >
                        {activeRooms.map((room) => (
                          <option key={room.id} value={room.id} className="bg-[#201D19] text-[#F5F1E9]">
                            {room.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[48px] bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] font-semibold text-xs uppercase tracking-[0.18em] px-5 py-3.5 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Check Availability · {selectedRoomName}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* B. Desktop Horizontal 12-Column Direct Booking Bar (Preserved on lg+) */}
        <motion.form
          onSubmit={handleQuickAvailabilitySubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Direct Room Availability & Booking Bar"
          className="hidden lg:grid bg-[#161412]/95 backdrop-blur-md border border-[#D9D1C5]/20 shadow-[0_24px_60px_rgba(0,0,0,0.65)] lg:grid-cols-12 divide-x divide-[#D9D1C5]/15"
        >
          {/* Check-In Date */}
          <div className="lg:col-span-3 p-5 flex flex-col justify-center">
            <label
              htmlFor="hero-checkin-date"
              className="text-[10px] uppercase tracking-[0.2em] text-[#B69A69] font-medium mb-1.5 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Check-In Date</span>
            </label>
            <input
              id="hero-checkin-date"
              type="date"
              min={todayStr}
              value={checkInDate}
              onChange={(e) => handleCheckInChange(e.target.value)}
              className="bg-transparent text-[#F5F1E9] text-sm font-medium focus:outline-none tabular-nums cursor-pointer [color-scheme:dark]"
              required
            />
          </div>

          {/* Check-Out Date */}
          <div className="lg:col-span-3 p-5 flex flex-col justify-center">
            <label
              htmlFor="hero-checkout-date"
              className="text-[10px] uppercase tracking-[0.2em] text-[#B69A69] font-medium mb-1.5 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Check-Out Date</span>
            </label>
            <input
              id="hero-checkout-date"
              type="date"
              min={
                checkInDate
                  ? new Date(new Date(checkInDate).getTime() + 86400000).toISOString().split('T')[0]
                  : tomorrow
              }
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="bg-transparent text-[#F5F1E9] text-sm font-medium focus:outline-none tabular-nums cursor-pointer [color-scheme:dark]"
              required
            />
          </div>

          {/* Guests */}
          <div className="lg:col-span-2 p-5 flex flex-col justify-center">
            <label
              htmlFor="hero-guests-select"
              className="text-[10px] uppercase tracking-[0.2em] text-[#B69A69] font-medium mb-1.5 flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Guests</span>
            </label>
            <select
              id="hero-guests-select"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="bg-transparent text-[#F5F1E9] text-sm font-medium focus:outline-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num} className="bg-[#201D19] text-[#F5F1E9]">
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>

          {/* Room Selection */}
          <div className="lg:col-span-2 p-5 flex flex-col justify-center">
            <label
              htmlFor="hero-room-select"
              className="text-[10px] uppercase tracking-[0.2em] text-[#B69A69] font-medium mb-1.5 flex items-center gap-1.5"
            >
              <BedDouble className="w-3.5 h-3.5" />
              <span>Accommodation</span>
            </label>
            <select
              id="hero-room-select"
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
              className="bg-transparent text-[#F5F1E9] text-sm font-medium focus:outline-none truncate cursor-pointer"
            >
              {activeRooms.map((room) => (
                <option key={room.id} value={room.id} className="bg-[#201D19] text-[#F5F1E9]">
                  {room.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Availability Inquiry */}
          <div className="lg:col-span-2 p-3 flex items-stretch">
            <button
              type="submit"
              className="w-full bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] font-semibold text-xs uppercase tracking-[0.16em] px-4 py-3.5 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Check Availability</span>
            </button>
          </div>
        </motion.form>

        {/* Immediate Trust & Verified Property Credentials Strip */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.16em] text-[#D9D1C5]/75">
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-1.5">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B69A69] shrink-0" />
              <span>Direct Cab Access · Bhelupur</span>
            </span>
            <span className="hidden sm:inline text-[#B69A69]">·</span>
            <span className="hidden sm:inline tabular-nums">2.0 km to Sankat Mochan & Assi Ghat</span>
            <span className="hidden md:inline text-[#B69A69]">·</span>
            <span className="hidden md:inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B69A69]" />
              <span>All-Floor Lift · 100% Power Backup · Food Express Dining</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('intro')}
            className="min-h-[36px] flex items-center gap-2 text-[#F5F1E9] hover:text-[#B69A69] transition-colors cursor-pointer ml-auto"
          >
            <span>Discover the Sanctuary</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#B69A69]" />
          </button>
        </div>
      </div>
    </section>
  );
};
