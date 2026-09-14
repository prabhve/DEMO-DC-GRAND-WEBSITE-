import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Maximize2,
  Users,
  Bed,
  Bath,
  Eye,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Info,
  Compass
} from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { Room } from '../../types/hotel';

export const RoomShowcaseScene: React.FC = () => {
  const { rooms, setActiveRoomForDetail, openBookingModal, openVirtualTour } = useHotel();
  const activeRooms = rooms.filter((r) => r.isActive);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const currentRoom: Room = activeRooms[currentIndex] || activeRooms[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeRooms.length - 1 : prev - 1));
    setActiveImageIdx(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === activeRooms.length - 1 ? 0 : prev + 1));
    setActiveImageIdx(0);
  };

  if (!currentRoom) return null;

  return (
    <section
      id="rooms"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0c0d10] via-[#12141c] to-[#0c0d10] overflow-hidden"
    >
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#c5a880]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Scene 04: Rooms Intro Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3 text-[#c5a880]"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium font-sans">
              Accommodations
            </span>
            <Sparkles className="w-4 h-4" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-[#f3e5d0] font-normal leading-tight mb-4"
          >
            Rooms Designed for a Comfortable Stay
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#a09a8e] font-light leading-relaxed max-w-2xl mx-auto"
          >
            Select from our refined room categories crafted for solo pilgrims, families, and couples seeking modern solace in Bhelupur.
          </motion.p>
        </div>

        {/* Room Category Tabs / Pill Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {activeRooms.map((room, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={room.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setActiveImageIdx(0);
                }}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#c5a880] text-[#0c0d10] font-semibold shadow-[0_0_20px_rgba(197,168,128,0.35)] scale-105'
                    : 'bg-[#15171e] text-[#a09a8e] border border-[#2a2723] hover:border-[#c5a880]/40 hover:text-[#f3e5d0]'
                }`}
              >
                {room.name}
              </button>
            );
          })}
        </div>

        {/* Scene 05: 3D Floating Room Showcase Panel */}
        <div className="perspective-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRoom.id}
              initial={{ opacity: 0, rotateY: 8, scale: 0.96 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -8, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl bg-[#13151d] border border-[#c5a880]/30 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden preserve-3d"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left: Interactive Room Gallery & Visual Angle */}
                <div className="lg:col-span-7 relative bg-[#0c0d10] min-h-[380px] sm:min-h-[460px] flex flex-col justify-between overflow-hidden">
                  <div className="relative flex-1 group overflow-hidden">
                    <img
                      src={currentRoom.images[activeImageIdx] || currentRoom.coverImage}
                      alt={currentRoom.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-transparent to-transparent opacity-80" />

                    {/* Navigation Arrows */}
                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrev();
                        }}
                        className="pointer-events-auto w-10 h-10 rounded-full bg-[#0c0d10]/70 backdrop-blur-md border border-[#c5a880]/30 text-[#f3e5d0] hover:bg-[#c5a880] hover:text-[#0c0d10] flex items-center justify-center transition-all"
                        aria-label="Previous room"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext();
                        }}
                        className="pointer-events-auto w-10 h-10 rounded-full bg-[#0c0d10]/70 backdrop-blur-md border border-[#c5a880]/30 text-[#f3e5d0] hover:bg-[#c5a880] hover:text-[#0c0d10] flex items-center justify-center transition-all"
                        aria-label="Next room"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* View tag */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0c0d10]/70 backdrop-blur-md border border-[#c5a880]/20 text-[11px] text-[#c5a880] uppercase tracking-widest font-medium">
                      {currentRoom.view}
                    </div>

                    {/* 360 Tour Quick Badge Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openVirtualTour(currentRoom.id);
                      }}
                      className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[#0c0d10]/90 backdrop-blur-md border border-[#c5a880] text-[11px] text-[#f3e5d0] uppercase tracking-wider font-bold hover:bg-[#c5a880] hover:text-[#0c0d10] transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(197,168,128,0.5)] z-10"
                      id={`tour-badge-${currentRoom.id}`}
                    >
                      <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
                      <span>360° Virtual Tour</span>
                    </button>
                  </div>

                  {/* Thumbnail Row */}
                  {currentRoom.images.length > 1 && (
                    <div className="p-3 bg-[#0c0d10]/90 backdrop-blur-md border-t border-[#2a2723] flex items-center gap-2 overflow-x-auto">
                      {currentRoom.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIdx(idx)}
                          className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                            activeImageIdx === idx
                              ? 'border-[#c5a880] scale-105 shadow-md'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Room Specifications & Action Panel */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-[#151822] to-[#101117]">
                  <div>
                    {/* Category / Super Title */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a880] font-sans font-semibold">
                        Guest Sanctuary
                      </span>
                      <span className="text-xs text-[#a09a8e] font-sans">
                        0{currentIndex + 1} / 0{activeRooms.length}
                      </span>
                    </div>

                    <h3 className="font-serif-luxury text-2xl sm:text-4xl text-[#f3e5d0] font-normal mb-3">
                      {currentRoom.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#a09a8e] leading-relaxed font-light mb-6">
                      {currentRoom.description}
                    </p>

                    {/* Room Key Specifications Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-[#0c0d10]/50 border border-[#2a2723]">
                      <div className="flex items-center gap-2.5">
                        <Maximize2 className="w-4 h-4 text-[#c5a880] shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#777166] block">Room Size</span>
                          <span className="text-xs font-semibold text-[#e5e3dc]">{currentRoom.size}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Users className="w-4 h-4 text-[#c5a880] shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#777166] block">Occupancy</span>
                          <span className="text-xs font-semibold text-[#e5e3dc]">Max {currentRoom.maxGuests} Guests</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Bed className="w-4 h-4 text-[#c5a880] shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#777166] block">Bedding</span>
                          <span className="text-xs font-semibold text-[#e5e3dc]">{currentRoom.bed}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Bath className="w-4 h-4 text-[#c5a880] shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#777166] block">Bathroom</span>
                          <span className="text-xs font-semibold text-[#e5e3dc]">{currentRoom.bathrooms} En-Suite</span>
                        </div>
                      </div>
                    </div>

                    {/* Amenities List */}
                    <div className="mb-6">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#d1ccc0] mb-3 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                        Included Amenities
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {currentRoom.amenities.slice(0, 6).map((amenity) => (
                          <div key={amenity} className="flex items-center gap-2 text-xs text-[#a09a8e]">
                            <CheckCircle2 className="w-3 h-3 text-[#c5a880] shrink-0" />
                            <span className="truncate">{amenity}</span>
                          </div>
                        ))}
                      </div>
                      {currentRoom.note && (
                        <div className="mt-3 flex items-start gap-1.5 text-[11px] text-[#c5a880]/90 bg-[#c5a880]/10 p-2 rounded-lg border border-[#c5a880]/20">
                          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>{currentRoom.note}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions: 360 TOUR, VIEW DETAILS, & REQUEST BOOKING */}
                  <div className="pt-4 border-t border-[#2a2723] flex flex-col sm:flex-row items-center gap-2.5">
                    <button
                      onClick={() => openVirtualTour(currentRoom.id)}
                      className="w-full sm:w-auto px-4 py-3 rounded-xl border border-[#c5a880]/60 bg-[#c5a880]/10 hover:bg-[#c5a880] hover:text-[#0c0d10] text-[#f3e5d0] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
                      id={`virtual-tour-btn-${currentRoom.id}`}
                    >
                      <Compass className="w-4 h-4 text-[#c5a880]" />
                      <span>360° Tour</span>
                    </button>

                    <button
                      onClick={() => setActiveRoomForDetail(currentRoom)}
                      className="w-full sm:flex-1 py-3 rounded-xl border border-[#2a2723] text-[#f3e5d0] hover:border-[#c5a880]/40 hover:bg-[#1f222d] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                      id={`view-room-btn-${currentRoom.id}`}
                    >
                      <Eye className="w-4 h-4 text-[#c5a880]" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => openBookingModal(currentRoom.id)}
                      className="w-full sm:flex-1 py-3 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b39366] text-[#0c0d10] hover:shadow-[0_0_20px_rgba(197,168,128,0.4)] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                      id={`book-room-btn-${currentRoom.id}`}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
