import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { GalleryItem } from '../../types/hotel';

const FALLBACK_GALLERY_IMG =
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80';

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

  // Keyboard Navigation for Full-Screen Lightbox (Phase 10)
  useEffect(() => {
    if (activeLightboxIndex === null) return;

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
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  // Asymmetric editorial grid column spans (12-column bento rhythm)
  const getGridSpanClass = (index: number) => {
    const pattern = index % 6;
    if (pattern === 0) return 'md:col-span-7 h-[340px] sm:h-[440px]';
    if (pattern === 1) return 'md:col-span-5 h-[340px] sm:h-[440px]';
    if (pattern === 2) return 'md:col-span-4 h-[300px] sm:h-[360px]';
    if (pattern === 3) return 'md:col-span-4 h-[300px] sm:h-[360px]';
    if (pattern === 4) return 'md:col-span-4 h-[300px] sm:h-[360px]';
    return 'md:col-span-12 h-[340px] sm:h-[460px]';
  };

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32 px-4 sm:px-8 lg:px-12 bg-[#161412] text-[#F5F1E9] overflow-hidden border-b border-[#D9D1C5]/15"
    >
      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-8 h-[1px] bg-[#B69A69]" />
              <span className="text-xs uppercase tracking-[0.24em] text-[#B69A69] font-medium">
                Visual Archive · Property Portfolio
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="font-serif-luxury text-4xl sm:text-5xl lg:text-[58px] text-[#F5F1E9] font-normal leading-[1.08]"
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
              Explore our reception foyer, guest suites, Food Express dining hall, and celebration spaces. Click any photograph for full-screen inspection.
            </p>
          </motion.div>
        </div>

        {/* Clean Unboxed Category Filter Bar */}
        <div className="border-b border-[#D9D1C5]/15 mb-12 overflow-x-auto">
          <div className="flex items-center gap-7 sm:gap-10 min-w-max">
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
                  className={`relative pb-4 text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer ${
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
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

                  {/* Top Metadata & Expand Trigger */}
                  <div className="absolute top-4 left-5 right-5 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#B69A69] font-medium bg-[#201D19]/85 backdrop-blur-sm px-3 py-1">
                      0{index + 1} · {item.category}
                    </span>

                    <span className="w-9 h-9 bg-[#201D19]/85 text-[#F5F1E9] border border-[#D9D1C5]/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4 text-[#B69A69]" />
                    </span>
                  </div>

                  {/* Caption Block */}
                  <figcaption className="absolute bottom-5 left-5 right-5">
                    <h3 className="font-serif-luxury text-2xl text-[#F5F1E9] font-normal mb-1">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
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
              <div className="flex items-center justify-between pb-4 text-xs uppercase tracking-[0.2em] text-[#D9D1C5]">
                <span>
                  {activeLightboxItem.category} · Frame 0{activeLightboxIndex + 1} / 0
                  {filteredItems.length}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveLightboxIndex(null)}
                  id="close-lightbox-btn"
                  aria-label="Close gallery lightbox"
                  className="px-4 py-2 border border-[#D9D1C5]/25 hover:border-[#B69A69] text-[#F5F1E9] hover:text-[#B69A69] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Close (Esc)</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Image Viewport */}
              <div className="relative w-full h-[65vh] sm:h-[74vh] flex items-center justify-center bg-[#201D19] border border-[#D9D1C5]/20 overflow-hidden">
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#201D19]/85 hover:bg-[#B69A69] text-[#F5F1E9] hover:text-[#201D19] border border-[#D9D1C5]/25 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  aria-label="Next photograph"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#201D19]/85 hover:bg-[#B69A69] text-[#F5F1E9] hover:text-[#201D19] border border-[#D9D1C5]/25 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Bottom Caption */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-serif-luxury text-2xl text-[#F5F1E9]">
                    {activeLightboxItem.title}
                  </h4>
                  {activeLightboxItem.caption && (
                    <p className="text-xs sm:text-sm text-[#D9D1C5]/75 font-light mt-0.5">
                      {activeLightboxItem.caption}
                    </p>
                  )}
                </div>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#D9D1C5]/50">
                  Use Arrow Keys or Swipe to Navigate
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
