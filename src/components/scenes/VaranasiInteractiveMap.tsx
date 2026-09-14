import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Navigation,
  Compass,
  Clock,
  Car,
  Footprints,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Layers,
  Check,
  Share2,
  Map as MapIcon,
  Flame,
  Waves,
  Building2,
  Train
} from 'lucide-react';
import { VARANASI_LANDMARKS, HOTEL_LOCATION_COORDINATES } from '../../data/landmarksData';
import { LandmarkItem } from '../../types/hotel';

export const VaranasiInteractiveMap: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('sankat-mochan');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'TEMPLE' | 'GHAT' | 'CAMPUS' | 'TRANSIT'>('ALL');
  const [mapViewMode, setMapViewMode] = useState<'3D_HERITAGE' | 'GOOGLE_EMBED'>('3D_HERITAGE');
  const [copiedLink, setCopiedLink] = useState(false);

  // Parallax tilt effect for 3D map canvas
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || mapViewMode !== '3D_HERITAGE') return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const selectedLandmark: LandmarkItem = useMemo(() => {
    return (
      VARANASI_LANDMARKS.find((l) => l.id === selectedId) ||
      VARANASI_LANDMARKS[0]
    );
  }, [selectedId]);

  const filteredLandmarks = useMemo(() => {
    if (categoryFilter === 'ALL') return VARANASI_LANDMARKS;
    return VARANASI_LANDMARKS.filter((l) => l.category === categoryFilter);
  }, [categoryFilter]);

  // Google Maps Directions link from D C Grand, Bhelupur to selected landmark
  const directionsUrl = useMemo(() => {
    const origin = encodeURIComponent('D C Grand, Bhelupur, Varanasi, Uttar Pradesh');
    const destination = encodeURIComponent(
      `${selectedLandmark.name}, Varanasi, Uttar Pradesh`
    );
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
  }, [selectedLandmark]);

  const handleShare = () => {
    navigator.clipboard.writeText(directionsUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="w-full">
      {/* Map Control Toolbar: Mode Switcher & Category Filter Pills */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {[
            { id: 'ALL', label: 'All Attractions' },
            { id: 'TEMPLE', label: 'Sacred Temples', icon: Flame },
            { id: 'GHAT', label: 'Ganga Ghats', icon: Waves },
            { id: 'CAMPUS', label: 'BHU Campus', icon: Building2 },
            { id: 'TRANSIT', label: 'Transit Terminals', icon: Train }
          ].map((cat) => {
            const isSelected = categoryFilter === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id as typeof categoryFilter)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#c5a880] text-[#0c0d10] font-bold shadow-[0_0_15px_rgba(197,168,128,0.35)] scale-105'
                    : 'bg-[#151720] text-[#a09a8e] border border-[#2a2723] hover:border-[#c5a880]/40 hover:text-[#f3e5d0]'
                }`}
              >
                {Icon && <Icon className="w-3 h-3" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle: 3D Heritage Map vs Live Google Map */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#13151e] border border-[#2a2723] shrink-0">
          <button
            onClick={() => setMapViewMode('3D_HERITAGE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              mapViewMode === '3D_HERITAGE'
                ? 'bg-[#c5a880] text-[#0c0d10]'
                : 'text-[#a09a8e] hover:text-[#f3e5d0]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>3D Heritage Map</span>
          </button>
          <button
            onClick={() => setMapViewMode('GOOGLE_EMBED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              mapViewMode === 'GOOGLE_EMBED'
                ? 'bg-[#c5a880] text-[#0c0d10]'
                : 'text-[#a09a8e] hover:text-[#f3e5d0]'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Live Satellite Map</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map Visual (Left) & Attraction Spotlight (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Interactive 3D Varanasi Canvas Map */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl overflow-hidden border border-[#c5a880]/35 bg-[#0f1118] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative min-h-[480px] sm:min-h-[560px]">
          {mapViewMode === '3D_HERITAGE' ? (
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full h-full min-h-[480px] sm:min-h-[560px] overflow-hidden select-none bg-[#0d0f16]"
              style={{
                perspective: '1200px'
              }}
            >
              {/* Parallax Content Canvas */}
              <motion.div
                animate={{
                  rotateX: tilt.y,
                  rotateY: tilt.x
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* SVG Layer: Sacred Ganga River, Roads, and Animated Energy Ray */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* Glowing water gradient for Holy Ganga */}
                    <linearGradient id="gangaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#144272" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#2c74b3" stopOpacity="0.85" />
                    </linearGradient>

                    {/* Gold route glow */}
                    <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="0.8" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Concentric Distance Rings around D C Grand (38, 44) */}
                  <circle
                    cx={HOTEL_LOCATION_COORDINATES.mapPosition.x}
                    cy={HOTEL_LOCATION_COORDINATES.mapPosition.y}
                    r="12"
                    fill="none"
                    stroke="#c5a880"
                    strokeWidth="0.18"
                    strokeDasharray="1, 1"
                    strokeOpacity="0.25"
                  />
                  <circle
                    cx={HOTEL_LOCATION_COORDINATES.mapPosition.x}
                    cy={HOTEL_LOCATION_COORDINATES.mapPosition.y}
                    r="24"
                    fill="none"
                    stroke="#c5a880"
                    strokeWidth="0.18"
                    strokeDasharray="1.5, 1.5"
                    strokeOpacity="0.2"
                  />
                  <circle
                    cx={HOTEL_LOCATION_COORDINATES.mapPosition.x}
                    cy={HOTEL_LOCATION_COORDINATES.mapPosition.y}
                    r="38"
                    fill="none"
                    stroke="#c5a880"
                    strokeWidth="0.15"
                    strokeDasharray="2, 2"
                    strokeOpacity="0.15"
                  />

                  {/* Sacred Ganga River Curve (Uttaravahini crescent on the East) */}
                  <path
                    d="M 66 100 Q 72 75 78 55 T 88 0 L 100 0 L 100 100 Z"
                    fill="url(#gangaGradient)"
                    opacity="0.45"
                  />

                  {/* River shoreline golden landing accent */}
                  <path
                    d="M 66 100 Q 72 75 78 55 T 88 0"
                    fill="none"
                    stroke="#c5a880"
                    strokeWidth="0.4"
                    strokeDasharray="1.5, 1"
                    strokeOpacity="0.6"
                  />

                  {/* Major Connecting Arterial Roads of Varanasi */}
                  {/* Bhelupur to Assi Road */}
                  <path
                    d="M 38 44 Q 56 50 74 58"
                    fill="none"
                    stroke="#383632"
                    strokeWidth="0.45"
                    strokeDasharray="1, 0.5"
                  />
                  {/* Bhelupur to Sankat Mochan Road */}
                  <path
                    d="M 38 44 Q 40 54 42 64"
                    fill="none"
                    stroke="#383632"
                    strokeWidth="0.45"
                    strokeDasharray="1, 0.5"
                  />
                  {/* Bhelupur to Kashi Vishwanath / Godowlia */}
                  <path
                    d="M 38 44 Q 58 38 78 32"
                    fill="none"
                    stroke="#383632"
                    strokeWidth="0.45"
                    strokeDasharray="1, 0.5"
                  />
                  {/* Bhelupur to BHU Lanka */}
                  <path
                    d="M 38 44 Q 34 62 30 82"
                    fill="none"
                    stroke="#383632"
                    strokeWidth="0.45"
                    strokeDasharray="1, 0.5"
                  />
                  {/* Bhelupur to Cantt Station */}
                  <path
                    d="M 38 44 Q 36 28 34 14"
                    fill="none"
                    stroke="#383632"
                    strokeWidth="0.45"
                    strokeDasharray="1, 0.5"
                  />

                  {/* Animated Glowing Golden Trajectory / Route Ray to Selected Landmark */}
                  <path
                    d={`M ${HOTEL_LOCATION_COORDINATES.mapPosition.x} ${HOTEL_LOCATION_COORDINATES.mapPosition.y} L ${selectedLandmark.mapPosition.x} ${selectedLandmark.mapPosition.y}`}
                    fill="none"
                    stroke="#c5a880"
                    strokeWidth="0.75"
                    strokeDasharray="2, 1"
                    className="animate-pulse"
                    filter="url(#routeGlow)"
                  />
                </svg>

                {/* River Title Label */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] uppercase tracking-[0.4em] text-[#6998c9]/70 font-serif font-bold pointer-events-none">
                  Holy River Ganga (Uttaravahini)
                </div>

                {/* Distance Ring Indicators */}
                <div className="absolute left-[38%] top-[32%] text-[9px] text-[#c5a880]/50 tracking-widest font-mono pointer-events-none">
                  1 km
                </div>
                <div className="absolute left-[38%] top-[20%] text-[9px] text-[#c5a880]/40 tracking-widest font-mono pointer-events-none">
                  2 km
                </div>
                <div className="absolute left-[38%] top-[6%] text-[9px] text-[#c5a880]/30 tracking-widest font-mono pointer-events-none">
                  4 km
                </div>

                {/* D C GRAND - Central Hotel Pin (38%, 44%) */}
                <div
                  style={{
                    left: `${HOTEL_LOCATION_COORDINATES.mapPosition.x}%`,
                    top: `${HOTEL_LOCATION_COORDINATES.mapPosition.y}%`
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
                >
                  <div className="relative group cursor-pointer">
                    {/* Concentric pulsing radar waves */}
                    <div className="absolute -inset-4 rounded-full bg-[#c5a880]/20 animate-ping" />
                    <div className="absolute -inset-2 rounded-full bg-[#c5a880]/30 animate-pulse" />

                    {/* Central Gold Beacon Badge */}
                    <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-br from-[#c5a880] to-[#9e8055] text-[#0c0d10] font-black flex items-center justify-center shadow-[0_0_25px_rgba(197,168,128,0.8)] border border-[#f3e5d0]">
                      <span className="font-serif text-xs font-bold">DCG</span>
                    </div>

                    {/* Floating permanent hotel identifier */}
                    <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-md bg-[#0c0d10]/95 border border-[#c5a880] text-[10px] font-bold text-[#f3e5d0] uppercase tracking-wider whitespace-nowrap shadow-xl">
                      D C GRAND (Hotel Base)
                    </div>
                  </div>
                </div>

                {/* Landmark Interactive Pins */}
                {filteredLandmarks.map((landmark) => {
                  const isSelected = landmark.id === selectedId;
                  const isSankatMochan = landmark.id === 'sankat-mochan';

                  return (
                    <div
                      key={landmark.id}
                      style={{
                        left: `${landmark.mapPosition.x}%`,
                        top: `${landmark.mapPosition.y}%`
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-15 pointer-events-auto transition-all duration-300"
                    >
                      <button
                        onClick={() => setSelectedId(landmark.id)}
                        className="group relative flex items-center justify-center p-2 focus:outline-none"
                        aria-label={`Select ${landmark.name}`}
                      >
                        {/* Selected or Sankat Mochan special glow */}
                        {(isSelected || isSankatMochan) && (
                          <span className="absolute w-7 h-7 rounded-full bg-[#c5a880]/40 animate-ping" />
                        )}

                        {/* Pin Dot / Icon */}
                        <span
                          className={`relative w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-[#c5a880] text-[#0c0d10] scale-125 shadow-[0_0_20px_rgba(197,168,128,0.8)]'
                              : isSankatMochan
                              ? 'bg-[#e07a5f] text-white ring-2 ring-[#c5a880]'
                              : 'bg-[#181a24] text-[#a09a8e] border border-[#3b3834] group-hover:border-[#c5a880] group-hover:text-[#f3e5d0]'
                          }`}
                        >
                          {landmark.category === 'TEMPLE' && <Flame className="w-3 h-3" />}
                          {landmark.category === 'GHAT' && <Waves className="w-3 h-3" />}
                          {landmark.category === 'CAMPUS' && <Building2 className="w-3 h-3" />}
                          {landmark.category === 'TRANSIT' && <Train className="w-3 h-3" />}
                        </span>

                        {/* Floating Name & Distance Pill */}
                        <div
                          className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-lg border whitespace-nowrap text-[10px] transition-all shadow-xl ${
                            isSelected
                              ? 'bg-[#0c0d10] border-[#c5a880] text-[#c5a880] font-bold scale-105 z-30'
                              : isSankatMochan
                              ? 'bg-[#0c0d10]/90 border-[#e07a5f]/60 text-[#e07a5f] font-semibold'
                              : 'bg-[#0c0d10]/85 border-[#2a2723] text-[#a09a8e] group-hover:text-[#f3e5d0]'
                          }`}
                        >
                          <span>{landmark.name.split('&')[0]}</span>
                          <span className="ml-1 text-[9px] text-[#c5a880]">({landmark.distance})</span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </motion.div>

              {/* Bottom Quick Stats Banner */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-[#0c0d10]/90 backdrop-blur-md border border-[#2a2723] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-[#a09a8e]">
                  <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>
                    Viewing: <strong className="text-[#f3e5d0]">{selectedLandmark.name}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#c5a880] font-semibold flex items-center gap-1">
                    <Car className="w-3.5 h-3.5" />
                    {selectedLandmark.travelTimeDrive} by road
                  </span>
                  {selectedLandmark.travelTimeWalk && (
                    <span className="text-[#a09a8e] hidden sm:flex items-center gap-1">
                      <Footprints className="w-3.5 h-3.5" />
                      {selectedLandmark.travelTimeWalk} walk
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Live Google Satellite & Road Embed View */
            <div className="relative w-full h-full min-h-[480px] sm:min-h-[560px]">
              <iframe
                title="D C Grand Live Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14429.358242485586!2d82.9839446!3d25.2927236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e32049d5656c9%3A0xb3551fa16db6192!2sBhelupur%2C%20Varanasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter invert contrast-125 opacity-85 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#0c0d10]/90 backdrop-blur-md border border-[#c5a880]/40 shadow-xl max-w-xs">
                <span className="text-xs font-bold text-[#c5a880] uppercase tracking-wider block">
                  D C Grand Varanasi
                </span>
                <span className="text-[11px] text-[#d1ccc0]">
                  {HOTEL_LOCATION_COORDINATES.address}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Selected Attraction Spotlight & Navigation Card */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLandmark.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-7 rounded-3xl bg-[#141620] border border-[#c5a880]/30 shadow-2xl flex flex-col justify-between h-full"
            >
              <div>
                {/* Photo & Category Header */}
                <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden mb-5 border border-[#2a2723]">
                  <img
                    src={selectedLandmark.image}
                    alt={selectedLandmark.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141620] via-transparent to-black/30" />

                  {/* Category & Proximity Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#0c0d10]/80 backdrop-blur-md border border-[#c5a880]/30 text-[10px] font-bold text-[#c5a880] uppercase tracking-wider">
                      {selectedLandmark.category}
                    </span>
                    {selectedLandmark.id === 'sankat-mochan' && (
                      <span className="px-2.5 py-1 rounded-full bg-[#e07a5f]/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                        Prime Proximity
                      </span>
                    )}
                  </div>

                  {/* Exact Distance Badge */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-[#0c0d10]/90 backdrop-blur-md border border-[#c5a880]/50 text-xs font-bold text-[#f3e5d0]">
                    {selectedLandmark.distance} from D C Grand
                  </div>
                </div>

                {/* Attraction Title */}
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f3e5d0] font-normal leading-tight mb-2">
                  {selectedLandmark.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#a09a8e] font-light leading-relaxed mb-5">
                  {selectedLandmark.desc}
                </p>

                {/* Travel Time & Transit Estimation Metric Box */}
                <div className="grid grid-cols-2 gap-3 mb-5 p-3.5 rounded-2xl bg-[#0c0d10]/60 border border-[#2a2723]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] shrink-0">
                      <Car className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#777166] block">
                        Auto / Cab
                      </span>
                      <span className="text-xs font-bold text-[#f3e5d0]">
                        {selectedLandmark.travelTimeDrive}
                      </span>
                    </div>
                  </div>

                  {selectedLandmark.travelTimeWalk ? (
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] shrink-0">
                        <Footprints className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#777166] block">
                          Walking
                        </span>
                        <span className="text-xs font-bold text-[#f3e5d0]">
                          {selectedLandmark.travelTimeWalk}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#777166] block">
                          Distance
                        </span>
                        <span className="text-xs font-bold text-[#f3e5d0]">
                          {selectedLandmark.distance}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Best Time to Visit */}
                <div className="mb-5 p-3 rounded-xl bg-[#171a24] border border-[#2a2723] text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#c5a880] font-bold block mb-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Recommended Visiting Hours
                  </span>
                  <span className="text-[#d1ccc0] leading-snug block">
                    {selectedLandmark.bestTimeToVisit}
                  </span>
                </div>

                {/* Highlights Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {selectedLandmark.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-[#0c0d10] border border-[#2a2723] text-[11px] text-[#c5a880]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Get Turn-by-Turn Directions & Share */}
              <div className="pt-4 border-t border-[#2a2723] flex items-center gap-3">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b39366] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(197,168,128,0.4)] transition-all flex items-center justify-center gap-2"
                  id={`get-directions-${selectedLandmark.id}`}
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={handleShare}
                  className="p-3 rounded-xl border border-[#2a2723] text-[#a09a8e] hover:text-[#c5a880] hover:border-[#c5a880]/40 transition-colors"
                  title="Copy Directions Link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Quick Attraction Slider Row Below Map */}
      <div className="mt-8">
        <h4 className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          Browse Key Pilgrimage & Travel Distances
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredLandmarks.map((lm) => {
            const isSelected = lm.id === selectedId;
            return (
              <button
                key={lm.id}
                onClick={() => setSelectedId(lm.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#171a24] border-[#c5a880] shadow-[0_0_15px_rgba(197,168,128,0.15)] scale-[1.02]'
                    : 'bg-[#10121a] border-[#22242e] hover:border-[#c5a880]/40 text-[#a09a8e]'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-[#f3e5d0] truncate block">
                      {lm.name}
                    </span>
                    {lm.id === 'sankat-mochan' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e07a5f] shrink-0" />
                    )}
                  </div>
                  <span className="text-[11px] text-[#7d776d] block truncate">
                    {lm.travelTimeDrive} by auto/car • {lm.category}
                  </span>
                </div>

                <div className="shrink-0 text-right">
                  <span className="px-2.5 py-1 rounded-lg bg-[#0c0d10] text-[#c5a880] text-xs font-bold block border border-[#2a2723]">
                    {lm.distance}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
