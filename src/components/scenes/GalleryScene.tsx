import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { GalleryItem } from '../../types/hotel';
import { HOTEL_ASSETS } from '../../data/hotelAssets';

const FALLBACK_GALLERY_IMG = HOTEL_ASSETS.receptionFrontDeskWide.optimizedPath;

export const GalleryScene: React.FC = () => {
  const { gallery } = useHotel();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const categories = ['ALL', 'HOTEL', 'ROOMS', 'RESTAURANT', 'MEETINGS & EVENTS', 'ABOUT'];

  const filteredItems =
    selectedCategory === 'ALL'
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory);

  const activeLightboxItem: GalleryItem | null =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] || null : null;

  const goPrev = useCallback(() => {
    setActiveLightboxIndex((prev) => {
      if (prev === null || filteredItems.length === 0) return null;
      return prev === 0 ? filteredItems.length - 1 : prev - 1;
    });
  }, [filteredItems.length]);

  const goNext = useCallback(() => {
    setActiveLightboxIndex((prev) => {
      if (prev === null || filteredItems.length === 0) return null;
      return prev === filteredItems.length - 1 ? 0 : prev + 1;
    });
  }, [filteredItems.length]);

  // Keyboard Navigation & Background Scroll Lock for Full-Screen Lightbox (Phase 10 & Mobile Optimization)
  useEffect(() => {
    if (activeLightboxIndex === null) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      } else if (e.key === 'ArrowRight') {
        goNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLightboxIndex, goPrev, goNext]);

  // Mobile Touch Swipe Support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 45) {
      if (deltaX > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
    setTouchStartX(null);
  };

  // Asymmetric editorial grid column spans (1-col mobile, 2-col sm tablet, 12-col bento md+ desktop)
  const getGridSpanClass = (index: number) => {
    const pattern = index % 6;
    if (pattern === 0) return 'sm:col-span-2 md:col-span-7 h-[260px] sm:h-[340px] md:h-[440px]';
    if (pattern === 1) return 'sm:col-span-1 md:col-span-5 h-[240px] sm:h-[300px] md:h-[440px]';
    if (pattern === 2) return 'sm:col-span-1 md:col-span-4 h-[240px] sm:h-[300px] md:h-[360px]';
    if (pattern === 3) return 'sm:col-span-1 md:col-span-4 h-[240px] sm:h-[300px] md:h-[360px]';
    if (pattern === 4) return 'sm:col-span-1 md:col-span-4 h-[240px] sm:h-[300px] md:h-[360px]';
    return 'sm:col-span-2 md:col-span-12 h-[260px] sm:h-[340px] md:h-[460px]';
  };

  return (
    <section
      id="gallery"
      className="relative py-16 sm:py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#161412] text-[#F5F1E9] overflow-hidden border-b border-[#D9D1C5]/15"
    >
      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-10 sm:mb-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-3.5 sm:mb-4"
            >
              <span className="w-8 h-[1px] bg-[#B69A69]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.24em] text-[#B69A69] font-medium">
                Visual Archive · Property Portfolio
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-serif-luxury heading-section-fluid text-[#F5F1E9] font-normal"
            >
              Atmosphere & Architecture.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="lg:col-span-5 lg:pb-1"
          >
            <p className="text-sm sm:text-base text-[#D9D1C5]/80 font-light leading-relaxed">
              Explore our reception foyer, guest suites, Food Express dining hall, and celebration spaces. Tap any photograph for full-screen inspection.
            </p>
          </motion.div>
        </div>

        {/* Clean Unboxed Category Filter Bar */}
        <div className="border-b border-[#D9D1C5]/15 mb-8 sm:mb-12 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-6 sm:gap-10 min-w-max">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActiveLightboxIndex(null);
                  }}
                  className={`relative min-h-[48px] pb-3.5 pt-2 text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer ${
                    isSelected
                      ? 'text-[#F5F1E9] font-semibold'
                      : 'text-[#D9D1C5]/60 hover:text-[#F5F1E9]'
                  }`}
                >
                  <span>{cat}</span>
                  {isSelected && (
                    <motion.span
                      layoutId="galleryCategoryUnderline"
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#B69A69]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Editorial Photograph Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 sm:gap-5">
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const spanClass = getGridSpanClass(index);
              const imgUrl =
                item.url && item.url.trim().length > 0
                  ? item.url.trim()
                  : FALLBACK_GALLERY_IMG;

              return (
                <motion.figure
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  onClick={() => setActiveLightboxIndex(index)}
                  className={`group relative overflow-hidden bg-[#201D19] border border-[#D9D1C5]/15 cursor-pointer ${spanClass}`}
                >
                  <img
                    src={imgUrl}
                    alt={item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== FALLBACK_GALLERY_IMG) target.src = FALLBACK_GALLERY_IMG;
                    }}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* Subtle Editorial Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161412]/90 via-[#161412]/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

                  {/* Top Metadata & Expand Trigger (Visible on Touch Devices) */}
                  <div className="absolute top-3.5 left-4 right-4 sm:top-4 sm:left-5 sm:right-5 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#B69A69] font-medium bg-[#201D19]/85 backdrop-blur-xs px-3 py-1">
                      0{index + 1} · {item.category}
                    </span>

                    <span className="w-9 h-9 bg-[#201D19]/85 text-[#F5F1E9] border border-[#D9D1C5]/25 flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4 text-[#B69A69]" />
                    </span>
                  </div>

                  {/* Caption Block */}
                  <figcaption className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                    <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#F5F1E9] font-normal mb-1">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="text-xs text-[#D9D1C5]/80 line-clamp-2 font-light max-w-xl">
                        {item.caption}
                      </p>
                    )}
                  </figcaption>
                </motion.figure>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Full-Screen Lightbox with Keyboard & Touch Swipe Support */}
      <AnimatePresence>
        {activeLightboxItem && activeLightboxIndex !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxItem.title}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-8"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxIndex(null)}
              className="fixed inset-0 bg-[#161412]/96 backdrop-blur-md"
            />

            {/* Lightbox Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-6xl w-full z-10 flex flex-col"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#D9D1C5]">
                <span className="truncate pr-3">
                  {activeLightboxItem.category} · Frame 0{activeLightboxIndex + 1} / 0
                  {filteredItems.length}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveLightboxIndex(null)}
                  id="close-lightbox-btn"
                  aria-label="Close gallery lightbox"
                  className="min-h-[44px] px-3.5 sm:px-4 py-2 border border-[#D9D1C5]/25 hover:border-[#B69A69] text-[#F5F1E9] hover:text-[#B69A69] flex items-center gap-2 transition-colors cursor-pointer shrink-0"
                >
                  <span>Close</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Image Viewport */}
              <div className="relative w-full h-[58vh] sm:h-[74vh] flex items-center justify-center bg-[#201D19] border border-[#D9D1C5]/20 overflow-hidden">
                <img
                  src={
                    activeLightboxItem.url && activeLightboxItem.url.trim().length > 0
                      ? activeLightboxItem.url.trim()
                      : FALLBACK_GALLERY_IMG
                  }
                  alt={activeLightboxItem.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== FALLBACK_GALLERY_IMG) target.src = FALLBACK_GALLERY_IMG;
                  }}
                  className="max-h-full max-w-full object-contain select-none"
                />

                {/* Prev Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  aria-label="Previous photograph"
                  className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 bg-[#201D19]/85 hover:bg-[#B69A69] text-[#F5F1E9] hover:text-[#201D19] border border-[#D9D1C5]/25 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  aria-label="Next photograph"
                  className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 bg-[#201D19]/85 hover:bg-[#B69A69] text-[#F5F1E9] hover:text-[#201D19] border border-[#D9D1C5]/25 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Bottom Caption */}
              <div className="pt-3.5 sm:pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-serif-luxury text-xl sm:text-2xl text-[#F5F1E9]">
                    {activeLightboxItem.title}
                  </h4>
                  {activeLightboxItem.caption && (
                    <p className="text-xs sm:text-sm text-[#D9D1C5]/75 font-light mt-0.5">
                      {activeLightboxItem.caption}
                    </p>
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#D9D1C5]/50">
                  Swipe or Use Arrow Keys to Navigate
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
