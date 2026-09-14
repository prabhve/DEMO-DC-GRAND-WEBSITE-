import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Users,
  Bed,
  Bath,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Coffee,
  Wifi,
  Tv,
  ThermometerSnowflake,
  Wind,
  Info,
  Compass
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { Room } from '../../types/hotel';

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

  const handlePrevImg = () => {
    setActiveImageIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  };

  const handleNextImg = () => {
    setActiveImageIndex((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveRoomForDetail(null)}
          className="fixed inset-0 bg-[#08090b]/90 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl bg-[#11131a] rounded-3xl border border-[#c5a880]/40 shadow-2xl overflow-hidden z-10 my-auto"
        >
          {/* Header Close Button */}
          <button
            onClick={() => setActiveRoomForDetail(null)}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#0c0d10]/80 border border-[#c5a880]/30 text-[#e5e3dc] hover:text-[#c5a880] hover:bg-[#1e212b] flex items-center justify-center transition-all"
            aria-label="Close dialog"
            id="close-room-detail-modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Floating 360 Tour Trigger */}
          <button
            onClick={() => {
              const roomId = room.id;
              setActiveRoomForDetail(null);
              openVirtualTour(roomId);
            }}
            className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-[#0c0d10]/90 backdrop-blur-md border border-[#c5a880] text-[#f3e5d0] text-xs font-bold uppercase tracking-wider hover:bg-[#c5a880] hover:text-[#0c0d10] transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(197,168,128,0.5)]"
            id={`modal-360-badge-${room.id}`}
          >
            <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>Launch 360° Virtual Tour</span>
          </button>

          {/* Gallery Viewport */}
          <div className="relative h-[320px] sm:h-[420px] bg-[#0c0d10] overflow-hidden">
            <img
              src={room.images[activeImageIndex] || room.coverImage}
              alt={`${room.name} photograph ${activeImageIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11131a] via-transparent to-black/40" />

            {/* Navigation Arrows */}
            {room.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImg}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0c0d10]/70 border border-[#c5a880]/40 text-[#f3e5d0] hover:bg-[#c5a880] hover:text-[#0c0d10] flex items-center justify-center transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImg}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0c0d10]/70 border border-[#c5a880]/40 text-[#f3e5d0] hover:bg-[#c5a880] hover:text-[#0c0d10] flex items-center justify-center transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Room Title Floating Overlay */}
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a880] font-sans font-semibold block mb-1">
                  {room.view}
                </span>
                <h2 className="font-serif-luxury text-2xl sm:text-4xl text-[#f3e5d0] font-normal drop-shadow-md">
                  {room.name}
                </h2>
              </div>
              <span className="text-xs text-[#a09a8e] bg-[#0c0d10]/80 px-3 py-1 rounded-full border border-[#2a2723]">
                {activeImageIndex + 1} / {room.images.length}
              </span>
            </div>
          </div>

          {/* Thumbnails Row */}
          {room.images.length > 1 && (
            <div className="p-3 bg-[#0c0d10] flex items-center gap-2 overflow-x-auto border-b border-[#2a2723]">
              {room.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#c5a880] scale-105'
                      : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 max-h-[50vh] overflow-y-auto">
            {/* Quick Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#171a24] border border-[#2a2723] mb-8">
              <div className="flex items-center gap-3">
                <Maximize2 className="w-5 h-5 text-[#c5a880] shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#777166] block">Dimensions</span>
                  <span className="text-xs font-semibold text-[#f3e5d0]">{room.size}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[#c5a880] shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#777166] block">Max Capacity</span>
                  <span className="text-xs font-semibold text-[#f3e5d0]">{room.maxGuests} Guests</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Bed className="w-5 h-5 text-[#c5a880] shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#777166] block">Bed Arrangement</span>
                  <span className="text-xs font-semibold text-[#f3e5d0]">{room.bed}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Bath className="w-5 h-5 text-[#c5a880] shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#777166] block">En-Suite Bath</span>
                  <span className="text-xs font-semibold text-[#f3e5d0]">{room.bathrooms} Bathroom</span>
                </div>
              </div>
            </div>

            {/* Room Narrative */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-semibold mb-3">
                About This Room
              </h3>
              <p className="text-sm sm:text-base text-[#d1ccc0] font-light leading-relaxed">
                {room.description}
              </p>
              {room.note && (
                <div className="mt-4 flex items-start gap-2 text-xs text-[#c5a880] bg-[#c5a880]/10 p-3 rounded-xl border border-[#c5a880]/20">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{room.note}</span>
                </div>
              )}
            </div>

            {/* Amenities Grid */}
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-semibold mb-4">
                Room Amenities & Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {room.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#151720] border border-[#2a2723] text-xs text-[#d1ccc0]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural & Security Highlights */}
            {room.features && room.features.length > 0 && (
              <div className="mb-8 p-4 rounded-2xl bg-[#0c0d10] border border-[#2a2723]">
                <h4 className="text-[11px] uppercase tracking-wider text-[#a09a8e] mb-2 font-medium">
                  Room Features
                </h4>
                <div className="flex flex-wrap gap-2">
                  {room.features.map((feat) => (
                    <span
                      key={feat}
                      className="px-3 py-1 rounded-full bg-[#171a24] border border-[#c5a880]/20 text-xs text-[#e8d7be]"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer with Primary CTA */}
          <div className="p-6 bg-[#0c0d10] border-t border-[#2a2723] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left w-full sm:w-auto">
              <span className="text-xs uppercase tracking-wider text-[#a09a8e] block">
                Reservation Status
              </span>
              <span className="text-sm font-semibold text-[#f3e5d0]">
                Request-based Booking (No Advance Payment Required)
              </span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  const roomId = room.id;
                  setActiveRoomForDetail(null);
                  openVirtualTour(roomId);
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#c5a880]/50 bg-[#c5a880]/15 hover:bg-[#c5a880] hover:text-[#0c0d10] text-[#f3e5d0] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Compass className="w-4 h-4 text-[#c5a880]" />
                <span>360° Tour</span>
              </button>

              <button
                onClick={() => setActiveRoomForDetail(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#2a2723] text-[#a09a8e] hover:text-[#f3e5d0] text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const roomId = room.id;
                  setActiveRoomForDetail(null);
                  openBookingModal(roomId);
                }}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b39366] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(197,168,128,0.4)] transition-all flex items-center justify-center gap-2"
                id="modal-request-booking-btn"
              >
                <Calendar className="w-4 h-4" />
                <span>Request Booking</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
