import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef  = useRef(null);

  // Raw mouse position (no lerp — instant feedback)
  const raw = useRef({ x: -100, y: -100 });
  // Lerped ring position for smooth trailing
  const lerped = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e) => {
      raw.current.x = e.clientX;
      raw.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    let raf;
    const loop = () => {
      // Dot follows cursor instantly
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${raw.current.x - 4}px, ${raw.current.y - 4}px)`;
      }
      // Ring trails behind with lerp
      lerped.current.x += (raw.current.x - lerped.current.x) * 0.12;
      lerped.current.y += (raw.current.y - lerped.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${lerped.current.x - 20}px, ${lerped.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {/* Trailing ring — mix-blend-mode: difference turns it white on dark, black on light */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid white',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 999999,
          willChange: 'transform',
        }}
      />
      {/* Sharp dot — snaps instantly */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'white',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 999999,
          willChange: 'transform',
        }}
      />
    </>
  );
}
