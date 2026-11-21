import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'motion/react';
import { Calendar, Users, BedDouble, ArrowRight, Eye, ChevronDown, Star, ShieldCheck, MapPin } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

const FALLBACK_HERO_IMAGE =
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=85';

interface HeroPerspective {
  id: string;
  label: string;
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
      caption: 'Illuminated Facade · Bhelupur, Varanasi',
      image: primaryCover
    },
    {
      id: 'foyer',
      label: '02 · Reception Foyer',
      caption: 'Double-Height Lobby & Concierge Desk',
      image: lobbyImage
    },
    {
      id: 'sanctuary',
      label: '03 · Guest Chambers',
      caption: 'Super Deluxe Sanctuary & Custom Millwork',
      image: suiteImage
    }
  ];

  const [activePerspectiveIdx, setActivePerspectiveIdx] = useState<number>(0);
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
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, prefersReducedMotion ? 1 : 1.06]);
  const yText = useTransform(scrollYProgress, [0, 0.25], [0, prefersReducedMotion ? 0 : 36]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const activeRooms = rooms.filter((r) => r.isActive);

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
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-20 sm:pt-24 lg:pt-[88px] pb-8 sm:pb-12 bg-[#201D19]"
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
            initial={{ opacity: 0.35, scale: 1.04 }}
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
            className="w-full h-full object-cover object-center"
          />
        </AnimatePresence>
        {/* Layered Editorial Scrims for Legibility and Warm Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#201D19]/85 via-[#201D19]/50 to-[#201D19]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#201D19]/90 via-[#201D19]/45 to-transparent" />
      </motion.div>

      {/* Main Editorial Hero Content */}
      <motion.div
        style={{ y: yText }}
        className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 my-auto pt-4 sm:pt-5 lg:pt-4 pb-10 sm:pb-14 lg:pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          {/* Left 8 Columns: Editorial Headline & Primary CTAs */}
          <div className="lg:col-span-8">
            {/* Unboxed Editorial Kicker & Verified Rating */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5"
            >
              <span className="w-8 h-[1px] bg-[#B69A69] hidden sm:inline-block" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#B69A69] font-medium">
                {homeCms.heroBadge || 'Bhelupur, Varanasi · Boutique Hospitality'}
              </span>
              <span className="text-[#D9D1C5]/40">·</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[#F5F1E9]">
                <Star className="w-3.5 h-3.5 fill-[#B69A69] text-[#B69A69]" />
                <span className="tabular-nums font-medium">4.8 Google Rated</span>
              </span>
            </motion.div>

            {/* Editorial Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif-luxury text-4xl sm:text-6xl lg:text-[68px] text-[#F5F1E9] font-normal leading-[1.05] tracking-[-0.015em] mb-6 max-w-3xl"
            >
              {homeCms.heroHeadline || 'Your Story of Comfort Begins in Varanasi.'}
            </motion.h1>

            {/* Supporting Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg lg:text-xl text-[#D9D1C5]/90 font-light leading-relaxed max-w-[56ch] mb-9"
            >
              {homeCms.heroSupportingText ||
                'Discover thoughtful hospitality, inviting spaces and a memorable stay in the spiritual heart of Varanasi.'}
            </motion.p>

            {/* Primary & Secondary Action Hierarchy */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row sm:items-center gap-3.5"
            >
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
                className="px-8 py-4 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_12px_32px_rgba(182,154,105,0.28)] cursor-pointer group"
              >
                <span>{homeCms.heroBookingBtnText || 'Book Your Stay'}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('rooms')}
                id="hero-explore-rooms-btn"
                className="px-8 py-4 border border-[#D9D1C5]/35 hover:border-[#B69A69] text-[#F5F1E9] hover:text-[#B69A69] bg-[#201D19]/45 backdrop-blur-sm text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>{homeCms.heroExploreBtnText || 'Explore the Hotel'}</span>
              </button>

              <button
                type="button"
                onClick={() => openVirtualTour(selectedRoomId)}
                className="px-5 py-4 text-[#D9D1C5] hover:text-[#B69A69] text-xs uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#B69A69]" />
                <span>360° Room Tour</span>
              </button>
            </motion.div>
          </div>

          {/* Right 4 Columns: Interactive First-5-Second Architectural Perspective Switcher */}
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
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <motion.form
          onSubmit={handleQuickAvailabilitySubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Direct Room Availability & Booking Bar"
          className="bg-[#161412]/95 backdrop-blur-md border border-[#D9D1C5]/20 shadow-[0_24px_60px_rgba(0,0,0,0.65)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 divide-y sm:divide-y-0 sm:divide-x divide-[#D9D1C5]/15"
        >
          {/* Check-In Date */}
          <div className="lg:col-span-3 p-4 sm:p-5 flex flex-col justify-center">
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
          <div className="lg:col-span-3 p-4 sm:p-5 flex flex-col justify-center">
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
          <div className="lg:col-span-2 p-4 sm:p-5 flex flex-col justify-center">
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
          <div className="lg:col-span-2 p-4 sm:p-5 flex flex-col justify-center">
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
          <div className="sm:col-span-2 lg:col-span-2 p-2.5 sm:p-3 flex items-stretch">
            <button
              type="submit"
              className="w-full bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] font-semibold text-xs uppercase tracking-[0.16em] px-4 py-3.5 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Check Availability</span>
            </button>
          </div>
        </motion.form>

        {/* Immediate Trust & Verified Property Credentials Strip */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.16em] text-[#D9D1C5]/75">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B69A69]" />
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
            className="flex items-center gap-2 text-[#F5F1E9] hover:text-[#B69A69] transition-colors cursor-pointer ml-auto"
          >
            <span>Discover the Sanctuary</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#B69A69]" />
          </button>
        </div>
      </div>
    </section>
  );
};
