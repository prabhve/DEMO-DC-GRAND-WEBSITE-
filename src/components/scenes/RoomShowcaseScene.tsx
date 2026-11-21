import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  ArrowRight,
  ArrowUpRight,
  Check,
  Info
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { Room } from '../../types/hotel';

const FALLBACK_ROOM_IMAGE =
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80';

export const RoomShowcaseScene: React.FC = () => {
  const { rooms, setActiveRoomForDetail, openBookingModal, openVirtualTour } = useHotel();
  const activeRooms = rooms.filter((r) => r.isActive);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const currentRoom: Room = activeRooms[currentIndex] || activeRooms[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeRooms.length - 1 : prev - 1));
    setActiveImageIdx(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === activeRooms.length - 1 ? 0 : prev + 1));
    setActiveImageIdx(0);
  };

  // Touch swipe handler for mobile room browsing
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 45) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    setTouchStartX(null);
  };

  if (!currentRoom) return null;

  const validRoomImages = (currentRoom.images || []).filter((img) => img && img.trim().length > 0);
  const currentRoomImageSrc =
    validRoomImages[activeImageIdx] ||
    validRoomImages[0] ||
    currentRoom.coverImage?.trim() ||
    FALLBACK_ROOM_IMAGE;

  return (
    <section
      id="rooms"
      className="relative py-16 sm:py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#201D19] text-[#F5F1E9] overflow-hidden border-b border-[#D9D1C5]/15"
    >
      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-10 sm:mb-16">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-3.5 sm:mb-4"
            >
              <span className="w-8 h-[1px] bg-[#B69A69]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.24em] text-[#B69A69] font-medium">
                Rooms & Suites · Private Sanctuaries
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-serif-luxury heading-section-fluid text-[#F5F1E9] font-normal"
            >
              Spaces Crafted for Restful Repose.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="lg:col-span-5 lg:pb-1"
          >
            <p className="text-sm sm:text-base text-[#D9D1C5]/80 font-light leading-relaxed">
              Each guest chamber at D.C. Grand pairs custom wood millwork, climate-controlled comfort, and thoughtful amenities—accessible via modern elevator across all floors.
            </p>
          </motion.div>
        </div>

        {/* Clean Unboxed Category Selector Bar */}
        <div className="border-b border-[#D9D1C5]/15 mb-8 sm:mb-12 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-6 sm:gap-10 min-w-max">
            {activeRooms.map((room, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(idx);
                    setActiveImageIdx(0);
                  }}
                  className={`relative min-h-[48px] pb-3.5 pt-2 text-xs sm:text-sm uppercase tracking-[0.18em] transition-colors cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? 'text-[#F5F1E9] font-semibold'
                      : 'text-[#D9D1C5]/60 hover:text-[#F5F1E9]'
                  }`}
                >
                  <span className="font-mono text-[11px] text-[#B69A69] tabular-nums">
                    0{idx + 1}
                  </span>
                  <span>{room.name}</span>
                  {isSelected && (
                    <motion.span
                      layoutId="activeRoomTabIndicator"
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#B69A69]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Part 1: Featured Editorial Room Spotlight */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoom.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 bg-[#161412] border border-[#D9D1C5]/15 mb-16 sm:mb-24"
          >
            {/* Left 7 Columns: Large Photography & Gallery Strip with Touch Swipe */}
            <div className="lg:col-span-7 relative flex flex-col justify-between min-h-[300px] sm:min-h-[500px] lg:min-h-[540px] bg-[#12100E] overflow-hidden">
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative flex-1 min-h-[260px] sm:min-h-[420px] overflow-hidden group"
              >
                <img
                  src={currentRoomImageSrc}
                  alt={`${currentRoom.name} at Hotel D.C. Grand Varanasi`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== FALLBACK_ROOM_IMAGE) target.src = FALLBACK_ROOM_IMAGE;
                  }}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161412] via-transparent to-[#161412]/40" />

                {/* Top Left Unboxed Metadata Overlay */}
                <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 bg-[#201D19]/90 backdrop-blur-xs border border-[#D9D1C5]/20 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#F5F1E9]">
                  {currentRoom.view} · {currentRoom.size}
                </div>

                {/* Top Right 360 Virtual Tour Trigger */}
                <button
                  type="button"
                  onClick={() => openVirtualTour(currentRoom.id)}
                  id={`tour-badge-${currentRoom.id}`}
                  className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 min-h-[38px] sm:min-h-[42px] bg-[#201D19]/90 hover:bg-[#B69A69] text-[#F5F1E9] hover:text-[#201D19] border border-[#B69A69] px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em] font-semibold transition-colors flex items-center gap-1.5 sm:gap-2 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 shrink-0" />
                  <span>360° Tour</span>
                </button>

                {/* Prev / Next Room Controls */}
                <div className="absolute inset-x-3 sm:inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous room category"
                    className="pointer-events-auto w-11 h-11 bg-[#201D19]/85 hover:bg-[#B69A69] text-[#F5F1E9] hover:text-[#201D19] border border-[#D9D1C5]/25 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next room category"
                    className="pointer-events-auto w-11 h-11 bg-[#201D19]/85 hover:bg-[#B69A69] text-[#F5F1E9] hover:text-[#201D19] border border-[#D9D1C5]/25 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Angle Thumbnail Switcher */}
              {validRoomImages.length > 1 && (
                <div className="p-3 sm:p-4 bg-[#161412] border-t border-[#D9D1C5]/15 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar">
                    {validRoomImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIdx(idx)}
                        aria-label={`View angle ${idx + 1} of ${currentRoom.name}`}
                        className={`w-18 sm:w-20 h-12 sm:h-13 overflow-hidden shrink-0 border transition-all cursor-pointer ${
                          activeImageIdx === idx
                            ? 'border-[#B69A69] opacity-100'
                            : 'border-transparent opacity-50 hover:opacity-85'
                        }`}
                      >
                        <img
                          src={img.trim()}
                          alt={`${currentRoom.name} view ${idx + 1}`}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.src !== FALLBACK_ROOM_IMAGE) target.src = FALLBACK_ROOM_IMAGE;
                          }}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#D9D1C5]/60 shrink-0 hidden sm:inline tabular-nums">
                    Angle 0{activeImageIdx + 1} / 0{validRoomImages.length}
                  </span>
                </div>
              )}
            </div>

            {/* Right 5 Columns: Editorial Room Ledger & Direct Booking CTAs */}
            <div className="lg:col-span-5 p-5 sm:p-10 lg:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#D9D1C5]/15">
              <div>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-[#B69A69] mb-2.5 sm:mb-3">
                  <span>Category 0{currentIndex + 1}</span>
                  <span className="font-mono text-[#D9D1C5]/60 tabular-nums">
                    0{currentIndex + 1} / 0{activeRooms.length}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-2xl sm:text-4xl text-[#F5F1E9] font-normal mb-3 sm:mb-4">
                  {currentRoom.name}
                </h3>

                <p className="text-sm sm:text-base text-[#D9D1C5]/80 font-light leading-relaxed mb-6 sm:mb-8">
                  {currentRoom.description}
                </p>

                {/* Tabular Specification Ledger */}
                <div className="grid grid-cols-2 border-y border-[#D9D1C5]/15 divide-x divide-[#D9D1C5]/15 mb-8">
                  <div className="py-3.5 sm:py-4 pr-3 sm:pr-4">
                    <span className="text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#D9D1C5]/55 block mb-1">
                      Dimensions
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#F5F1E9] tabular-nums">
                      {currentRoom.size}
                    </span>
                  </div>
                  <div className="py-3.5 sm:py-4 pl-3 sm:pl-4">
                    <span className="text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#D9D1C5]/55 block mb-1">
                      Occupancy
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#F5F1E9] tabular-nums">
                      Up to {currentRoom.maxGuests} Guests
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-b border-[#D9D1C5]/15 divide-x divide-[#D9D1C5]/15 -mt-8 mb-6 sm:mb-8">
                  <div className="py-3.5 sm:py-4 pr-3 sm:pr-4">
                    <span className="text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#D9D1C5]/55 block mb-1">
                      Bedding Configuration
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#F5F1E9]">
                      {currentRoom.bed}
                    </span>
                  </div>
                  <div className="py-3.5 sm:py-4 pl-3 sm:pl-4">
                    <span className="text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#D9D1C5]/55 block mb-1">
                      Bath & Orientation
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#F5F1E9]">
                      {currentRoom.bathrooms} En-Suite · {currentRoom.view}
                    </span>
                  </div>
                </div>

                {/* Curated Amenities */}
                <div className="mb-6 sm:mb-8">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[#B69A69] font-medium mb-3">
                    Signature Room Appointments
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
                    {currentRoom.amenities.slice(0, 6).map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2.5 text-xs text-[#D9D1C5]/85">
                        <Check className="w-3.5 h-3.5 text-[#B69A69] shrink-0" />
                        <span className="truncate">{amenity}</span>
                      </div>
                    ))}
                  </div>

                  {currentRoom.note && (
                    <div className="mt-4 pt-3 border-t border-[#D9D1C5]/10 flex items-start gap-2 text-xs text-[#D9D1C5]/75">
                      <Info className="w-3.5 h-3.5 text-[#B69A69] shrink-0 mt-0.5" />
                      <span>{currentRoom.note}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Deck (48px Touch Targets) */}
              <div className="pt-5 sm:pt-6 border-t border-[#D9D1C5]/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => openBookingModal(currentRoom.id)}
                  id={`book-room-btn-${currentRoom.id}`}
                  className="flex-1 min-h-[48px] py-3.5 sm:py-4 px-6 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] text-xs font-semibold uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book This Room</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 sm:flex sm:items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveRoomForDetail(currentRoom)}
                    id={`view-room-btn-${currentRoom.id}`}
                    className="min-h-[48px] py-3.5 sm:py-4 px-4 sm:px-5 border border-[#D9D1C5]/25 hover:border-[#B69A69] text-[#F5F1E9] hover:text-[#B69A69] text-xs font-medium uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Explore Room</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openVirtualTour(currentRoom.id)}
                    id={`virtual-tour-btn-${currentRoom.id}`}
                    aria-label="Launch 360 Virtual Room Tour"
                    className="min-h-[48px] py-3.5 sm:py-4 px-4 border border-[#536E68] bg-[#536E68]/20 hover:bg-[#536E68]/40 text-[#F5F1E9] text-xs font-medium uppercase tracking-[0.16em] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-[#B69A69]" />
                    <span>360° Tour</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Part 2: Complete Accommodations Collection Ledger */}
        {/* 1 Column on Mobile, 2 Columns on Tablet (md), 12-Col Horizontal Row on Desktop (lg) */}
        <div className="pt-2 sm:pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.22em] text-[#B69A69] block mb-2">
                Complete Room Directory
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F5F1E9] font-normal">
                Compare All Accommodations
              </h3>
            </div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#D9D1C5]/65">
              Direct Reservation · Verified Specifications · Instant Concierge Confirmation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-0 lg:divide-y lg:divide-[#D9D1C5]/15 lg:border-y lg:border-[#D9D1C5]/15">
            {activeRooms.map((room, idx) => {
              const roomImg =
                room.coverImage?.trim() ||
                room.images?.find((i) => i && i.trim().length > 0)?.trim() ||
                FALLBACK_ROOM_IMAGE;

              return (
                <motion.article
                  key={room.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="p-4 sm:p-5 lg:px-0 lg:py-10 bg-[#161412] lg:bg-transparent border border-[#D9D1C5]/15 lg:border-0 flex flex-col justify-between lg:grid lg:grid-cols-12 gap-5 lg:gap-10 lg:items-center group"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => setActiveRoomForDetail(room)}
                    className="lg:col-span-4 relative h-56 sm:h-64 overflow-hidden bg-[#161412] cursor-pointer"
                  >
                    <img
                      src={roomImg}
                      alt={room.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== FALLBACK_ROOM_IMAGE) target.src = FALLBACK_ROOM_IMAGE;
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-3 left-3 bg-[#201D19]/90 backdrop-blur-xs px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#F5F1E9]">
                      {room.size}
                    </div>
                  </div>

                  {/* Editorial Summary & Specs */}
                  <div className="lg:col-span-5 flex-1">
                    <div className="text-xs uppercase tracking-[0.2em] text-[#B69A69] mb-2 tabular-nums">
                      0{idx + 1} · {room.view} · Max {room.maxGuests} Guests
                    </div>
                    <h4
                      onClick={() => setActiveRoomForDetail(room)}
                      className="font-serif-luxury text-2xl sm:text-3xl text-[#F5F1E9] group-hover:text-[#B69A69] transition-colors cursor-pointer mb-2.5 sm:mb-3"
                    >
                      {room.name}
                    </h4>
                    <p className="text-sm text-[#D9D1C5]/75 font-light leading-relaxed mb-4 line-clamp-2">
                      {room.description}
                    </p>
                    <div className="text-xs text-[#D9D1C5]/65 leading-relaxed">
                      <strong className="text-[#F5F1E9] font-medium">Bedding:</strong> {room.bed}{' '}
                      <span className="mx-2 text-[#B69A69]">·</span>
                      <strong className="text-[#F5F1E9] font-medium">Highlights:</strong>{' '}
                      {room.amenities.slice(0, 3).join(' · ')}
                    </div>
                  </div>

                  {/* Direct Actions (44px+ Touch Targets) */}
                  <div className="lg:col-span-3 flex flex-col items-stretch justify-end gap-2.5 pt-2 lg:pt-0">
                    <button
                      type="button"
                      onClick={() => openBookingModal(room.id)}
                      className="min-h-[46px] py-3 px-5 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] text-xs font-semibold uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Book This Room</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setActiveRoomForDetail(room)}
                        className="min-h-[44px] py-2.5 px-3 border border-[#D9D1C5]/20 hover:border-[#B69A69] text-[#F5F1E9] hover:text-[#B69A69] text-[11px] uppercase tracking-[0.15em] transition-colors cursor-pointer"
                      >
                        Explore
                      </button>
                      <button
                        type="button"
                        onClick={() => openVirtualTour(room.id)}
                        className="min-h-[44px] py-2.5 px-3 border border-[#D9D1C5]/20 hover:border-[#B69A69] text-[#D9D1C5] hover:text-[#B69A69] text-[11px] uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Compass className="w-3.5 h-3.5 text-[#B69A69]" />
                        <span>360° Tour</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
