import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, Compass, ArrowDown, MapPin, Sparkles } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

export const HeroScene: React.FC = () => {
  const { homeCms, openBookingModal } = useHotel();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  // Cinematic scroll zoom and perspective push
  const scale = useTransform(scrollYProgress, [0, 0.25], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.15]);
  const yText = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 perspective-container"
    >
      {/* Background Architectural Imagery with 3D Depth Parallax */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
          style={{
            backgroundImage: `url(${homeCms.heroCoverImage})`,
            transform: `translate3d(${mouseOffset.x * -0.6}px, ${mouseOffset.y * -0.6}px, 0) scale(1.05)`
          }}
        />
        {/* Cinematic Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/70 to-[#0c0d10]/50" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0c0d10]/40 to-[#0c0d10]/95" />
      </motion.div>

      {/* Foreground 3D Floating Geometry & Framing Accents */}
      <div
        className="absolute inset-0 z-10 pointer-events-none preserve-3d"
        style={{
          transform: `rotateY(${mouseOffset.x * 0.1}deg) rotateX(${-mouseOffset.y * 0.1}deg)`
        }}
      >
        {/* Subtle Luxury Gold Corner Brackets */}
        <div className="absolute top-24 left-6 sm:left-12 w-16 h-16 border-t border-l border-[#c5a880]/30 hidden md:block" />
        <div className="absolute top-24 right-6 sm:right-12 w-16 h-16 border-t border-r border-[#c5a880]/30 hidden md:block" />
        <div className="absolute bottom-20 left-6 sm:left-12 w-16 h-16 border-b border-l border-[#c5a880]/30 hidden md:block" />
        <div className="absolute bottom-20 right-6 sm:right-12 w-16 h-16 border-b border-r border-[#c5a880]/30 hidden md:block" />
      </div>

      {/* Hero Content Container */}
      <motion.div
        style={{ y: yText }}
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
      >
        {/* Location & Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#15171e]/80 border border-[#c5a880]/30 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(197,168,128,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#e8d7be] font-sans font-medium">
            Bhelupur, Varanasi • Newly Opened Property
          </span>
          <MapPin className="w-3.5 h-3.5 text-[#c5a880] ml-1" />
        </motion.div>

        {/* Monogram / Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4"
        >
          <span className="font-display text-sm tracking-[0.4em] uppercase text-[#c5a880]">
            Welcome To D C Grand
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#f3e5d0] font-normal leading-[1.08] tracking-tight mb-6 max-w-4xl drop-shadow-md"
        >
          {homeCms.heroHeadline}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-[#cbc6bc] max-w-2xl font-light leading-relaxed mb-10 tracking-wide"
        >
          {homeCms.heroSupportingText}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => scrollToSection('rooms')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#c5a880]/60 text-[#f3e5d0] hover:text-[#0c0d10] hover:bg-[#c5a880] text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            id="hero-explore-rooms-btn"
          >
            <Compass className="w-4 h-4 text-[#c5a880] group-hover:text-[#0c0d10] transition-colors" />
            <span>Explore Rooms</span>
          </button>

          <button
            onClick={() => openBookingModal()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#c5a880] via-[#dfcaaa] to-[#c5a880] text-[#0c0d10] text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(197,168,128,0.35)] hover:shadow-[0_0_35px_rgba(197,168,128,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            id="hero-request-booking-btn"
          >
            <Calendar className="w-4 h-4" />
            <span>Request Booking</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Scroll Down Prompt */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        onClick={() => scrollToSection('intro')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#a09a8e] hover:text-[#c5a880] transition-colors cursor-pointer"
        id="hero-scroll-down-hint"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-light">
          Scroll To Discover
        </span>
        <ArrowDown className="w-4 h-4 text-[#c5a880]" />
      </motion.div>
    </section>
  );
};
