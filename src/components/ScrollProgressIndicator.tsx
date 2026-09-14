import React, { useState, useEffect } from 'react';

const SCENES = [
  { id: 'hero', name: '01 Arrival' },
  { id: 'intro', name: '02 D C Grand' },
  { id: 'highlights', name: '03 Amenities' },
  { id: 'rooms', name: '04 Suites' },
  { id: 'gallery', name: '05 Gallery' },
  { id: 'restaurant', name: '06 Dining' },
  { id: 'events', name: '07 Gatherings' },
  { id: 'location', name: '08 Sacred Map' },
  { id: 'contact', name: '09 Front Desk' }
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

      // Detect active section
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
      aria-label="3D Scene Navigation"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center pointer-events-auto"
      id="scroll-scene-indicator"
    >
      {/* Background tracking line */}
      <div className="w-[1px] h-48 bg-[#2a2723]/60 relative mb-4">
        <div
          className="w-full bg-[#c5a880] transition-all duration-150"
          style={{ height: `${scrollPercent}%` }}
        />
      </div>

      <nav className="flex flex-col gap-3 items-center">
        {SCENES.map((scene) => {
          const isActive = activeScene === scene.id;
          return (
            <button
              key={scene.id}
              onClick={() => scrollToSection(scene.id)}
              className="group relative flex items-center justify-center p-1 focus:outline-none"
              title={scene.name}
              aria-label={`Jump to ${scene.name}`}
            >
              {/* Dot */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-[#c5a880] ring-4 ring-[#c5a880]/20'
                    : 'w-1.5 h-1.5 bg-[#555047] group-hover:bg-[#c5a880]/70 group-hover:scale-125'
                }`}
              />

              {/* Label flyout */}
              <span className="absolute right-6 px-2 py-0.5 rounded bg-[#15171e]/90 border border-[#c5a880]/20 text-[10px] text-[#f3e5d0] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                {scene.name}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
