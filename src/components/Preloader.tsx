import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onLoaded: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onLoaded, 600);
          }, 200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#0c0d10] flex flex-col items-center justify-center text-center px-6"
        >
          {/* Subtle background radial glow */}
          <div className="absolute w-96 h-96 rounded-full bg-[#c5a880]/5 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Monogram emblem */}
            <div className="w-14 h-14 mb-6 rounded-full border border-[#c5a880]/40 flex items-center justify-center bg-[#15171e]/80 shadow-[0_0_25px_rgba(197,168,128,0.15)]">
              <span className="font-display text-[#c5a880] text-xl font-semibold tracking-widest">DC</span>
            </div>

            <h1 className="font-serif-luxury text-3xl md:text-5xl text-[#f3e5d0] tracking-[0.25em] uppercase font-light mb-2">
              D C Grand
            </h1>
            <p className="text-xs uppercase tracking-[0.4em] text-[#c5a880] font-sans mb-8">
              Bhelupur, Varanasi
            </p>

            {/* Progress line */}
            <div className="w-48 h-[1.5px] bg-[#2a2723] rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-[#c5a880] to-[#f3e5d0]"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            <p className="text-[11px] text-[#a09a8e] tracking-widest uppercase font-light">
              Preparing your 3D experience {Math.min(progress, 100)}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
