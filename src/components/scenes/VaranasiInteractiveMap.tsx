import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Navigation,
  Compass,
  Clock,
  Car,
  Footprints,
  ExternalLink,
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

const FALLBACK_LANDMARK_IMG =
  'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80';

export const VaranasiInteractiveMap: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('sankat-mochan');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'TEMPLE' | 'GHAT' | 'CAMPUS' | 'TRANSIT'>('ALL');
  const [mapViewMode, setMapViewMode] = useState<'3D_HERITAGE' | 'GOOGLE_EMBED'>('3D_HERITAGE');
  const [copiedLink, setCopiedLink] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current || mapViewMode !== '3D_HERITAGE') return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 6, y: -y * 6 });
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

  const directionsUrl = useMemo(() => {
    const origin = encodeURIComponent('Hotel D C Grand, Bhelupur, Varanasi, Uttar Pradesh');
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

  const selectedPos = selectedLandmark.mapPosition || { x: 50, y: 50 };

  return (
    <div className="w-full">
      {/* Map Control Toolbar: Clean Unboxed Category Tabs & View Mode Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-8 border-b border-[#D9D1C5]/15">
        {/* Category Filters */}
        <div className="flex items-center gap-6 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'ALL', label: 'All Landmarks' },
            { id: 'TEMPLE', label: 'Sacred Temples', icon: Flame },
            { id: 'GHAT', label: 'Ganga Ghats', icon: Waves },
            { id: 'CAMPUS', label: 'BHU Campus', icon: Building2 },
            { id: 'TRANSIT', label: 'Transit Hubs', icon: Train }
          ].map((cat) => {
            const isSelected = categoryFilter === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id as typeof categoryFilter)}
                className={`relative py-2 text-xs uppercase tracking-[0.18em] whitespace-nowrap flex items-center gap-2 transition-colors cursor-pointer ${
                  isSelected
                    ? 'text-[#F5F1E9] font-semibold'
                    : 'text-[#D9D1C5]/60 hover:text-[#F5F1E9]'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 text-[#B69A69]" />}
                <span>{cat.label}</span>
                {isSelected && (
                  <motion.span
                    layoutId="mapCategoryUnderline"
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#B69A69]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle: Heritage Cartography vs Live Google Map */}
        <div className="flex items-center border border-[#D9D1C5]/20 bg-[#161412] shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setMapViewMode('3D_HERITAGE')}
            className={`px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors flex items-center gap-1.5 cursor-pointer ${
              mapViewMode === '3D_HERITAGE'
                ? 'bg-[#B69A69] text-[#201D19] font-semibold'
                : 'text-[#D9D1C5]/75 hover:text-[#F5F1E9]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Map</span>
          </button>
          <button
            type="button"
            onClick={() => setMapViewMode('GOOGLE_EMBED')}
            className={`px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors flex items-center gap-1.5 cursor-pointer ${
              mapViewMode === 'GOOGLE_EMBED'
                ? 'bg-[#B69A69] text-[#201D19] font-semibold'
                : 'text-[#D9D1C5]/75 hover:text-[#F5F1E9]'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Google Map</span>
          </button>
        </div>
      </div>

      {/* Main 12-Column Split: Interactive Cartography (Left 7) & Selected Landmark Ledger (Right 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#161412] border border-[#D9D1C5]/15">
        {/* Left 7 Columns: Interactive Cartography Canvas */}
        <div className="lg:col-span-7 relative min-h-[460px] sm:min-h-[560px] overflow-hidden bg-[#141210]">
          {mapViewMode === '3D_HERITAGE' ? (
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full h-full min-h-[460px] sm:min-h-[560px] overflow-hidden select-none bg-[#141210]"
              style={{ perspective: '1200px' }}
            >
              <motion.div
                animate={{
                  rotateX: tilt.y,
                  rotateY: tilt.x
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* SVG Cartography Layer: Uttaravahini Ganga River, Arterial Roads, and Active Route */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="gangaTealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#536E68" stopOpacity="0.35" />
                      <stop offset="50%" stopColor="#3B524D" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#536E68" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* Concentric Distance Rings around Hotel D.C. Grand (38, 44) */}
                  <circle
                    cx={HOTEL_LOCATION_COORDINATES.mapPosition.x}
                    cy={HOTEL_LOCATION_COORDINATES.mapPosition.y}
                    r="12"
                    fill="none"
                    stroke="#B69A69"
                    strokeWidth="0.18"
                    strokeDasharray="1, 1"
                    strokeOpacity="0.28"
                  />
                  <circle
                    cx={HOTEL_LOCATION_COORDINATES.mapPosition.x}
                    cy={HOTEL_LOCATION_COORDINATES.mapPosition.y}
                    r="24"
                    fill="none"
                    stroke="#B69A69"
                    strokeWidth="0.18"
                    strokeDasharray="1.5, 1.5"
                    strokeOpacity="0.22"
                  />
                  <circle
                    cx={HOTEL_LOCATION_COORDINATES.mapPosition.x}
                    cy={HOTEL_LOCATION_COORDINATES.mapPosition.y}
                    r="38"
                    fill="none"
                    stroke="#B69A69"
                    strokeWidth="0.15"
                    strokeDasharray="2, 2"
                    strokeOpacity="0.16"
                  />

                  {/* Sacred Ganga River Curve (Uttaravahini Crescent on the East) */}
                  <path
                    d="M 66 100 Q 72 75 78 55 T 88 0 L 100 0 L 100 100 Z"
                    fill="url(#gangaTealGradient)"
                  />

                  {/* River Shoreline Champagne Gold Accent */}
                  <path
                    d="M 66 100 Q 72 75 78 55 T 88 0"
                    fill="none"
                    stroke="#B69A69"
                    strokeWidth="0.35"
                    strokeDasharray="1.5, 1"
                    strokeOpacity="0.55"
                  />

                  {/* Major Arterial Roads */}
                  <path d="M 38 44 Q 56 50 74 58" fill="none" stroke="#35302A" strokeWidth="0.4" strokeDasharray="1, 0.5" />
                  <path d="M 38 44 Q 40 54 42 64" fill="none" stroke="#35302A" strokeWidth="0.4" strokeDasharray="1, 0.5" />
                  <path d="M 38 44 Q 58 38 78 32" fill="none" stroke="#35302A" strokeWidth="0.4" strokeDasharray="1, 0.5" />
                  <path d="M 38 44 Q 34 62 30 82" fill="none" stroke="#35302A" strokeWidth="0.4" strokeDasharray="1, 0.5" />
                  <path d="M 38 44 Q 36 28 34 14" fill="none" stroke="#35302A" strokeWidth="0.4" strokeDasharray="1, 0.5" />

                  {/* Active Route Vector from Hotel D.C. Grand to Selected Landmark */}
                  <path
                    d={`M ${HOTEL_LOCATION_COORDINATES.mapPosition.x} ${HOTEL_LOCATION_COORDINATES.mapPosition.y} L ${selectedPos.x} ${selectedPos.y}`}
                    fill="none"
                    stroke="#B69A69"
                    strokeWidth="0.65"
                    strokeDasharray="1.5, 0.8"
                  />
                </svg>

                {/* River Label */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] uppercase tracking-[0.38em] text-[#D9D1C5]/55 font-serif-luxury pointer-events-none">
                  Sacred River Ganga (Uttaravahini)
                </div>

                {/* Distance Ring Labels */}
                <div className="absolute left-[38%] top-[32%] text-[9px] text-[#B69A69]/55 tracking-widest font-mono pointer-events-none tabular-nums">
                  1.0 km
                </div>
                <div className="absolute left-[38%] top-[20%] text-[9px] text-[#B69A69]/45 tracking-widest font-mono pointer-events-none tabular-nums">
                  2.0 km
                </div>
                <div className="absolute left-[38%] top-[6%] text-[9px] text-[#B69A69]/35 tracking-widest font-mono pointer-events-none tabular-nums">
                  4.0 km
                </div>

                {/* Hotel D.C. Grand Central Base Marker */}
                <div
                  style={{
                    left: `${HOTEL_LOCATION_COORDINATES.mapPosition.x}%`,
                    top: `${HOTEL_LOCATION_COORDINATES.mapPosition.y}%`
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-9 h-9 bg-[#B69A69] text-[#201D19] font-serif-luxury font-bold text-xs flex items-center justify-center border border-[#F5F1E9] shadow-[0_0_24px_rgba(182,154,105,0.6)]">
                      DCG
                    </div>
                    <div className="mt-1.5 px-2.5 py-0.5 bg-[#201D19]/95 border border-[#B69A69] text-[10px] font-semibold text-[#F5F1E9] uppercase tracking-[0.14em] whitespace-nowrap">
                      Hotel D.C. Grand
                    </div>
                  </div>
                </div>

                {/* Landmark Interactive Pins */}
                {filteredLandmarks.map((landmark) => {
                  const isSelected = landmark.id === selectedId;
                  const pos = landmark.mapPosition || { x: 50, y: 50 };

                  return (
                    <div
                      key={landmark.id}
                      style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-15 pointer-events-auto"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedId(landmark.id)}
                        className="group relative flex flex-col items-center p-1.5 focus:outline-none cursor-pointer"
                        aria-label={`Inspect ${landmark.name}`}
                      >
                        <span
                          className={`w-6 h-6 flex items-center justify-center transition-all duration-300 border ${
                            isSelected
                              ? 'bg-[#B69A69] text-[#201D19] border-[#F5F1E9] scale-125 shadow-[0_0_16px_rgba(182,154,105,0.7)]'
                              : 'bg-[#201D19] text-[#D9D1C5] border-[#D9D1C5]/35 group-hover:border-[#B69A69] group-hover:text-[#B69A69]'
                          }`}
                        >
                          {landmark.category === 'TEMPLE' && <Flame className="w-3 h-3" />}
                          {landmark.category === 'GHAT' && <Waves className="w-3 h-3" />}
                          {landmark.category === 'CAMPUS' && <Building2 className="w-3 h-3" />}
                          {landmark.category === 'TRANSIT' && <Train className="w-3 h-3" />}
                        </span>

                        <div
                          className={`mt-1 px-2 py-0.5 border whitespace-nowrap text-[10px] transition-colors tabular-nums ${
                            isSelected
                              ? 'bg-[#201D19] border-[#B69A69] text-[#F5F1E9] font-semibold z-30'
                              : 'bg-[#201D19]/90 border-[#D9D1C5]/20 text-[#D9D1C5]/80 group-hover:text-[#F5F1E9]'
                          }`}
                        >
                          <span>{landmark.name.split('&')[0]}</span>
                          <span className="ml-1 text-[#B69A69]">· {landmark.distance}</span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </motion.div>

              {/* Bottom Status Ledger */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#201D19]/95 backdrop-blur-md border border-[#D9D1C5]/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-[#D9D1C5]">
                  <Compass className="w-3.5 h-3.5 text-[#B69A69]" />
                  <span>
                    Route to: <strong className="text-[#F5F1E9] font-medium">{selectedLandmark.name}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-4 tabular-nums">
                  <span className="text-[#B69A69] font-medium flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5" />
                    <span>{selectedLandmark.travelTimeDrive} by cab</span>
                  </span>
                  {selectedLandmark.travelTimeWalk && (
                    <span className="text-[#D9D1C5]/75 hidden sm:flex items-center gap-1.5">
                      <Footprints className="w-3.5 h-3.5" />
                      <span>{selectedLandmark.travelTimeWalk} walk</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Live Google Map Embed */
            <div className="relative w-full h-full min-h-[460px] sm:min-h-[560px]">
              <iframe
                title="Hotel D.C. Grand Bhelupur Varanasi Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14429.358242485586!2d82.9839446!3d25.2927236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e32049d5656c9%3A0xb3551fa16db6192!2sBhelupur%2C%20Varanasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter invert contrast-125 opacity-85 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-4 left-4 p-3.5 bg-[#201D19]/95 border border-[#D9D1C5]/25 max-w-xs">
                <span className="text-[11px] font-semibold text-[#B69A69] uppercase tracking-[0.18em] block mb-0.5">
                  Hotel D.C. Grand Varanasi
                </span>
                <span className="text-xs text-[#D9D1C5]">
                  {HOTEL_LOCATION_COORDINATES.address}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right 5 Columns: Selected Landmark Editorial Ledger */}
        <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#D9D1C5]/15 flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-[#161412]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLandmark.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col justify-between h-full"
            >
              <div>
                {/* Landmark Photograph */}
                <div className="relative h-48 sm:h-52 overflow-hidden mb-6 bg-[#201D19] border border-[#D9D1C5]/15">
                  <img
                    src={
                      selectedLandmark.image && selectedLandmark.image.trim().length > 0
                        ? selectedLandmark.image.trim()
                        : FALLBACK_LANDMARK_IMG
                    }
                    alt={selectedLandmark.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== FALLBACK_LANDMARK_IMG) target.src = FALLBACK_LANDMARK_IMG;
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161412] via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 bg-[#201D19]/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#B69A69] font-medium">
                    {selectedLandmark.category}
                  </div>

                  <div className="absolute bottom-3 right-3 bg-[#201D19]/90 border border-[#D9D1C5]/20 px-3 py-1 text-xs font-medium text-[#F5F1E9] tabular-nums">
                    {selectedLandmark.distance} from Hotel
                  </div>
                </div>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F5F1E9] font-normal leading-snug mb-3">
                  {selectedLandmark.name}
                </h3>

                <p className="text-sm text-[#D9D1C5]/80 font-light leading-relaxed mb-6">
                  {selectedLandmark.desc}
                </p>

                {/* Tabular Travel Ledger */}
                <div className="grid grid-cols-2 border-y border-[#D9D1C5]/15 divide-x divide-[#D9D1C5]/15 mb-6">
                  <div className="py-3.5 pr-4">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#D9D1C5]/55 block mb-0.5">
                      Auto / Cab Time
                    </span>
                    <span className="text-sm font-medium text-[#F5F1E9] tabular-nums">
                      {selectedLandmark.travelTimeDrive}
                    </span>
                  </div>
                  <div className="py-3.5 pl-4">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-[#D9D1C5]/55 block mb-0.5">
                      {selectedLandmark.travelTimeWalk ? 'Walking Time' : 'Verified Distance'}
                    </span>
                    <span className="text-sm font-medium text-[#F5F1E9] tabular-nums">
                      {selectedLandmark.travelTimeWalk || selectedLandmark.distance}
                    </span>
                  </div>
                </div>

                {/* Recommended Hours */}
                {selectedLandmark.bestTimeToVisit && (
                  <div className="mb-6">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#B69A69] font-medium flex items-center gap-1.5 mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Recommended Visiting Hours</span>
                    </span>
                    <p className="text-xs text-[#D9D1C5]/85 leading-relaxed">
                      {selectedLandmark.bestTimeToVisit}
                    </p>
                  </div>
                )}

                {/* Unboxed Key Highlights */}
                {selectedLandmark.highlights && selectedLandmark.highlights.length > 0 && (
                  <div className="mb-6 text-xs text-[#D9D1C5]/75">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#B69A69] block mb-1">
                      Cultural Highlights
                    </span>
                    <span>{selectedLandmark.highlights.join(' · ')}</span>
                  </div>
                )}
              </div>

              {/* Direct Turn-by-Turn Navigation CTA */}
              <div className="pt-5 border-t border-[#D9D1C5]/15 flex items-center gap-3">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`get-directions-${selectedLandmark.id}`}
                  className="flex-1 py-3.5 px-5 bg-[#B69A69] hover:bg-[#c7ab7a] text-[#201D19] font-semibold text-xs uppercase tracking-[0.16em] transition-colors flex items-center justify-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Copy Directions Link"
                  title="Copy Directions Link"
                  className="p-3.5 border border-[#D9D1C5]/25 text-[#D9D1C5] hover:text-[#B69A69] hover:border-[#B69A69] transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-[#B69A69]" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Quick Landmark Directory Grid Below Map */}
      <div className="mt-8">
        <div className="text-xs uppercase tracking-[0.22em] text-[#B69A69] font-medium mb-4">
          Select Any Landmark to Preview Route & Travel Time
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#D9D1C5]/15">
          {filteredLandmarks.map((lm) => {
            const isSelected = lm.id === selectedId;
            return (
              <button
                key={lm.id}
                type="button"
                onClick={() => setSelectedId(lm.id)}
                className={`p-4 border-r border-b border-[#D9D1C5]/15 text-left transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-[#28241F] text-[#F5F1E9]'
                    : 'bg-[#161412] hover:bg-[#201D19] text-[#D9D1C5]/80'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-serif-luxury text-[#F5F1E9] truncate block">
                    {lm.name}
                  </span>
                  <span className="text-[11px] text-[#D9D1C5]/60 block truncate">
                    {lm.travelTimeDrive} by cab · {lm.category}
                  </span>
                </div>

                <span className="font-mono text-xs font-semibold text-[#B69A69] tabular-nums shrink-0">
                  {lm.distance}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
