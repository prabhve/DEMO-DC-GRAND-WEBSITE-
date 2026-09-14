import React, { useEffect, useState } from 'react';

export const CursorEffect: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer / desktop devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('interactive-target'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const updateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15
      }));
      animationFrameId = requestAnimationFrame(updateTrailing);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Small precision dot */}
      <div
        className="fixed w-2 h-2 rounded-full bg-[#c5a880] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#c5a880]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 0 : 1})`
        }}
      />
      {/* Trailing luxury ring */}
      <div
        className="fixed rounded-full border border-[#c5a880]/40 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovered ? '48px' : '30px',
          height: isHovered ? '48px' : '30px',
          backgroundColor: isHovered ? 'rgba(197, 168, 128, 0.12)' : 'transparent',
          backdropFilter: isHovered ? 'blur(1px)' : 'none'
        }}
      />
    </div>
  );
};
