import React, { Suspense, useState, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import Scene from './components/3d/Scene';
import Hero from './components/ui/Hero';

export default function App() {
  const [totalPages, setTotalPages] = useState(7);

  // Industry-grade solution: Measure actual DOM height after render
  useLayoutEffect(() => {
    const measure = () => {
      const content = document.querySelector('.scroll-content-wrapper');
      if (content) {
        const height = content.scrollHeight;
        const vh = window.innerHeight;
        // Use a minimal offset (0.05) to ensure content is NEVER cut off while minimizing dead space
        const exactPages = Math.max(1, Number(((height / vh) - 0.05).toFixed(2)));
        setTotalPages(exactPages);
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    const content = document.querySelector('.scroll-content-wrapper');
    if (content) observer.observe(content);

    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-[#0a1628] overflow-hidden">
      <Canvas
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="fixed top-0 left-0 w-full h-full z-0"
        dpr={[1, 1.5]}
      >
        <ScrollControls
          key={Math.round(totalPages * 10)}
          pages={totalPages}
          damping={0.2}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>

          <Hero />
        </ScrollControls>
      </Canvas>
    </div>
  );
}