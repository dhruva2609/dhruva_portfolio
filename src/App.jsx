// src/App.jsx
import React, { Suspense, useState, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import Scene from './components/3d/Scene';
import Hero from './components/ui/Hero';

export default function App() {
  const [totalPages, setTotalPages] = useState(6);

  useLayoutEffect(() => {
    const measure = () => {
      const content = document.querySelector('.scroll-content-wrapper');
      if (content) {
        // Sum exact pixel heights of all sections to bypass container clipping
        let totalHeight = 0;
        Array.from(content.children).forEach(child => {
          totalHeight += child.offsetHeight;
        });

        const vh = window.innerHeight;
        const isMobile = window.innerWidth < 768;
        
        // Removed buffers to ensure the scroll ends exactly on the centered section.
        const calculatedPages = (totalHeight / vh);

        setTotalPages(calculatedPages);
      }
    };

    const timer = setTimeout(measure, 100);
    const longTimer = setTimeout(measure, 1000);

    const observer = new ResizeObserver(measure);
    const content = document.querySelector('.scroll-content-wrapper');
    if (content) {
      observer.observe(content);
      Array.from(content.children).forEach(child => observer.observe(child));
    }

    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timer);
      clearTimeout(longTimer);
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
          pages={totalPages}
          damping={0.2}
          infinite={false} // Stops the scroll track precisely at the bottom[cite: 2]
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