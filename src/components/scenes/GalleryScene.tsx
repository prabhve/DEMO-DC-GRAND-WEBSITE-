import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';
import { GalleryItem } from '../../types/hotel';

export const GalleryScene: React.FC = () => {
  const { gallery } = useHotel();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['ALL', 'HOTEL', 'ROOMS', 'RESTAURANT', 'MEETINGS & EVENTS', 'ABOUT'];

  const filteredItems = selectedCategory === 'ALL'
    ? gallery
    : gallery.filter((item) => item.category === selectedCategory);

  const activeLightboxItem: GalleryItem | null =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex(
      activeLightboxIndex === 0 ? filteredItems.length - 1 : activeLightboxIndex - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex(
      activeLightboxIndex === filteredItems.length - 1 ? 0 : activeLightboxIndex + 1
    );
  };

  return (
    <section
      id="gallery"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0c0d10] overflow-hidden"
    >
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/2 left-10 w-96 h-96 rounded-full bg-[#c5a880]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3 text-[#c5a880]"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium font-sans">
              Visual Archive
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
            Atmosphere & Architecture
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#a09a8e] font-light leading-relaxed max-w-2xl mx-auto"
          >
            Explore the bespoke interiors, grand banquet hall, Food Express dining rooms, and ambient chambers of D C Grand.
          </motion.p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#c5a880] text-[#0c0d10] font-semibold shadow-[0_0_15px_rgba(197,168,128,0.3)]'
                  : 'bg-[#151720] text-[#a09a8e] border border-[#2a2723] hover:border-[#c5a880]/40 hover:text-[#f3e5d0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Tilted Photo Wall Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-container">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.25 }
                }}
                onClick={() => setActiveLightboxIndex(index)}
                className="group relative h-80 rounded-2xl overflow-hidden border border-[#2a2723] hover:border-[#c5a880]/60 bg-[#151720] cursor-pointer shadow-xl preserve-3d"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                {/* Category Pill on top */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-full bg-[#0c0d10]/70 backdrop-blur-md border border-[#c5a880]/20 text-[10px] text-[#c5a880] uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Expand icon on top right */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0c0d10]/70 backdrop-blur-md border border-[#c5a880]/20 text-[#f3e5d0] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Bottom Information */}
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif-luxury text-xl text-[#f3e5d0] font-normal mb-1 drop-shadow">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-[#a09a8e] line-clamp-2 font-light">
                      {item.caption}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Viewer */}
      <AnimatePresence>
        {activeLightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxIndex(null)}
              className="fixed inset-0 bg-[#08090b]/95 backdrop-blur-lg"
            />

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full z-10 flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightboxIndex(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-[#151720] border border-[#c5a880]/40 text-[#f3e5d0] hover:text-[#c5a880] flex items-center justify-center transition-colors"
                aria-label="Close Lightbox"
                id="close-lightbox-btn"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main Image with Navigation */}
              <div className="relative w-full max-h-[75vh] flex items-center justify-center rounded-2xl overflow-hidden bg-[#0c0d10] border border-[#c5a880]/30 shadow-2xl">
                <img
                  src={activeLightboxItem.url}
                  alt={activeLightboxItem.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />

                {/* Prev Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0c0d10]/80 border border-[#c5a880]/40 text-[#f3e5d0] hover:bg-[#c5a880] hover:text-[#0c0d10] flex items-center justify-center transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0c0d10]/80 border border-[#c5a880]/40 text-[#f3e5d0] hover:bg-[#c5a880] hover:text-[#0c0d10] flex items-center justify-center transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Caption & Metadata */}
              <div className="w-full mt-4 p-4 rounded-xl bg-[#151720]/80 border border-[#2a2723] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a880] block mb-0.5">
                    {activeLightboxItem.category} • Image {activeLightboxIndex! + 1} of {filteredItems.length}
                  </span>
                  <h4 className="font-serif-luxury text-xl text-[#f3e5d0]">
                    {activeLightboxItem.title}
                  </h4>
                  {activeLightboxItem.caption && (
                    <p className="text-xs text-[#a09a8e] mt-1 font-light">
                      {activeLightboxItem.caption}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
