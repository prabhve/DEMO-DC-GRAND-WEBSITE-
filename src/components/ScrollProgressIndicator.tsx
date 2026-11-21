import React, { useState, useEffect } from 'react';

const SCENES = [
  { id: 'hero', name: '01 · Arrival' },
  { id: 'intro', name: '02 · Sanctuary' },
  { id: 'rooms', name: '03 · Suites' },
  { id: 'highlights', name: '04 · Facilities' },
  { id: 'restaurant', name: '05 · Dining' },
  { id: 'events', name: '06 · Banquets' },
  { id: 'about', name: '07 · Varanasi' },
  { id: 'location', name: '08 · Sacred Map' },
  { id: 'gallery', name: '09 · Gallery' },
  { id: 'reviews', name: '10 · Reviews' },
  { id: 'contact', name: '11 · Concierge' }
];

export const ScrollProgressIndicator: React.FC = () => {
  const [activeScene, setActiveScene] = useState<string>('hero');
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollPercent(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }

      for (let i = SCENES.length - 1; i >= 0; i--) {
        const el = document.getElementById(SCENES[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveScene(SCENES[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Chapter Navigation"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center pointer-events-auto"
      id="scroll-scene-indicator"
    >
      {/* Background tracking line */}
      <div className="w-[1px] h-40 bg-[#D9D1C5]/20 relative mb-4">
        <div
          className="w-full bg-[#B69A69] transition-all duration-150"
          style={{ height: `${scrollPercent}%` }}
        />
      </div>

      <nav className="flex flex-col gap-2.5 items-center">
        {SCENES.map((scene) => {
          const isActive = activeScene === scene.id;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => scrollToSection(scene.id)}
              className="group relative flex items-center justify-center p-1 focus:outline-none cursor-pointer"
              title={scene.name}
              aria-label={`Jump to ${scene.name}`}
            >
              <div
                className={`transition-all duration-300 ${
                  isActive
                    ? 'w-2 h-2 bg-[#B69A69] ring-4 ring-[#B69A69]/20'
                    : 'w-1.5 h-1.5 bg-[#D9D1C5]/40 group-hover:bg-[#B69A69]'
                }`}
              />

              <span className="absolute right-6 px-2.5 py-1 bg-[#161412]/95 border border-[#D9D1C5]/20 text-[10px] text-[#F5F1E9] tracking-[0.18em] uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg tabular-nums">
                {scene.name}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
