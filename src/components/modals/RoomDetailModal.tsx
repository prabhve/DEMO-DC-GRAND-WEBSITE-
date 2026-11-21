import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar,
  Info,
  Compass
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { Room } from '../../types/hotel';

const FALLBACK_ROOM_IMG =
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80';

export const RoomDetailModal: React.FC = () => {
  const { activeRoomForDetail, setActiveRoomForDetail, openBookingModal, openVirtualTour } = useHotel();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveRoomForDetail(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeRoomForDetail, setActiveRoomForDetail]);

  if (!activeRoomForDetail) return null;
  const room: Room = activeRoomForDetail;
  const validImages = (room.images || []).filter((img) => img && img.trim().length > 0);
  const activeModalImageSrc =
    validImages[activeImageIndex] ||
    validImages[0] ||
    room.coverImage?.trim() ||
    FALLBACK_ROOM_IMG;

  const handlePrevImg = () => {
    setActiveImageIndex((prev) => (prev === 0 ? Math.max(0, validImages.length - 1) : prev - 1));
  };

  const handleNextImg = () => {
    setActiveImageIndex((prev) => (prev >= validImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={room.name}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveRoomForDetail(null)}
          className="fixed inset-0 bg-[#161412]/92 backdrop-blur-md"
        />

        {/* Editorial Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl bg-[#201D19] text-[#F5F1E9] border border-[#D9D1C5]/25 shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header Close Button */}
          <button
            type="button"
            onClick={() => setActiveRoomForDetail(null)}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-[#161412]/90 border border-[#D9D1C5]/25 text-[#F5F1E9] hover:text-[#B69A69] hover:border-[#B69A69] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close room details"
            id="close-room-detail-modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Floating 360 Tour Trigger */}
          <button
            type="button"
            onClick={() => {
              const roomId = room.id;
              setActiveRoomForDetail(null);
              openVirtualTour(roomId);
            }}
            className="absolute top-4 left-4 z-20 px-4 py-2 bg-[#161412]/90 hover:bg-[#B69A69] text-[#F5F1E9] hover:text-[#201D19] border border-[#B69A69] text-xs font-semibold uppercase tracking-[0.18em] transition-colors flex items-center gap-2 cursor-pointer"
            id={`modal-360-badge-${room.id}`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Launch 360° Spatial Tour</span>
          </button>

          {/* Gallery Viewport */}
          <div className="relative h-[300px] sm:h-[420px] bg-[#161412] overflow-hidden">
            <img
              src={activeModalImageSrc}
              alt={`${room.name} photograph ${activeImageIndex + 1}`}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== FALLBACK_ROOM_IMG) target.src = FALLBACK_ROOM_IMG;
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#201D19] via-transparent to-black/35" />

            {/* Navigation Arrows */}
            {validImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImg}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#161412]/80 hover:bg-[#B69A69] text-[#F5F1E9] hover:text-[#201D19] border border-[#D9D1C5]/25 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImg}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#161412]/80 hover:bg-[#B69A69] text-[#F5F1E9] hover:text-[#201D19] border border-[#D9D1C5]/25 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Room Title Overlay */}
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#B69A69] font-medium block mb-1">
                  {room.view}
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#F5F1E9] font-normal">
                  {room.name}
                </h2>
              </div>
              <span className="text-xs font-mono text-[#D9D1C5] bg-[#161412]/90 px-3 py-1 border border-[#D9D1C5]/20 tabular-nums">
                0{activeImageIndex + 1} / 0{Math.max(1, validImages.length)}
              </span>
            </div>
          </div>

          {/* Thumbnails Row */}
          {validImages.length > 1 && (
            <div className="p-3 bg-[#161412] flex items-center gap-2 overflow-x-auto border-b border-[#D9D1C5]/15">
              {validImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-13 overflow-hidden shrink-0 border transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#B69A69] opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-90'
                  }`}
                >
                  <img
                    src={img.trim()}
                    alt="Thumbnail"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== FALLBACK_ROOM_IMG) target.src = FALLBACK_ROOM_IMG;
                    }}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 max-h-[48vh] overflow-y-auto">
            {/* Tabular Specifications Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-y border-[#D9D1C5]/15 divide-y sm:divide-y-0 sm:divide-x divide-[#D9D1C5]/15 mb-8">
              <div className="py-3.5 sm:pr-4">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#D9D1C5]/55 block mb-0.5">
                  Dimensions
                </span>
                <span className="text-sm font-medium text-[#F5F1E9] tabular-nums">{room.size}</span>
              </div>

              <div className="py-3.5 sm:px-4">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#D9D1C5]/55 block mb-0.5">
                  Max Capacity
                </span>
                <span className="text-sm font-medium text-[#F5F1E9] tabular-nums">Up to {room.maxGuests} Guests</span>
              </div>

              <div className="py-3.5 sm:px-4">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#D9D1C5]/55 block mb-0.5">
                  Bed Configuration
                </span>
                <span className="text-sm font-medium text-[#F5F1E9]">{room.bed}</span>
              </div>

              <div className="py-3.5 sm:pl-4">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#D9D1C5]/55 block mb-0.5">
                  En-Suite Bath
                </span>
                <span className="text-sm font-medium text-[#F5F1E9] tabular-nums">{room.bathrooms} Bathroom</span>
              </div>
            </div>

            {/* Room Narrative */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-[0.22em] text-[#B69A69] font-medium mb-3">
                Accommodation Overview
              </h3>
              <p className="text-sm sm:text-base text-[#D9D1C5]/85 font-light leading-relaxed">
                {room.description}
              </p>
              {room.note && (
                <div className="mt-4 flex items-start gap-2.5 text-xs text-[#D9D1C5] bg-[#161412] p-3.5 border border-[#D9D1C5]/15">
                  <Info className="w-4 h-4 text-[#B69A69] shrink-0 mt-0.5" />
                  <span>{room.note}</span>
                </div>
              )}
            </div>

            {/* Amenities Grid */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-[0.22em] text-[#B69A69] font-medium mb-4">
                Included Room Appointments
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {room.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2.5 p-3 bg-[#161412] border border-[#D9D1C5]/15 text-xs text-[#D9D1C5]"
                  >
                    <Check className="w-4 h-4 text-[#B69A69] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Unboxed Architectural Highlights */}
            {room.features && room.features.length > 0 && (
              <div className="p-4 bg-[#161412] border border-[#D9D1C5]/15">
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#B69A69] mb-1.5 font-medium">
                  Architectural & Interior Details
                </h4>
                <p className="text-xs text-[#F5F1E9]">
                  {room.features.join(' · ')}
                </p>
              </div>
            )}
          </div>

          {/* Modal Footer with Primary CTA */}
          <div className="p-6 bg-[#161412] border-t border-[#D9D1C5]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left w-full sm:w-auto">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#B69A69] block">
                Direct Front Desk Reservation
              </span>
              <span className="text-xs sm:text-sm text-[#D9D1C5]">
                No Advance Payment Required · Instant Concierge Verification
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  const roomId = room.id;
                  setActiveRoomForDetail(null);
                  openVirtualTour(roomId);
                }}
                className="w-full sm:w-auto px-5 py-3.5 border border-[#536E68] bg-[#536E68]/20 hover:bg-[#536E68]/40 text-[#F5F1E9] text-xs font-medium uppercase tracking-[0.16em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#B69A69]" />
                <span>360° Tour</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const roomId = room.id;
                  setActiveRoomForDetail(null);
                  openBookingModal(roomId);
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] font-semibold text-xs uppercase tracking-[0.18em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                id="modal-request-booking-btn"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Room</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
