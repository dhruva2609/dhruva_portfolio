import React, { Suspense, useState, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import Scene from './components/3d/Scene';
import Hero from './components/ui/Hero';

export default function App() {
  const [totalPages, setTotalPages] = useState(6);

  // Industry-grade measurement: bypass ScrollControls container constraints
  // by measuring the exact rendered height of each section component.
  useLayoutEffect(() => {
    const measure = () => {
      const content = document.querySelector('.scroll-content-wrapper');
      if (content) {
        const height = content.scrollHeight;
        const vh = window.innerHeight;
        
        // Exact calculation of pages needed for the content.
        // We add a tiny buffer (0.01) to account for subpixel rendering 
        // to prevent absolute cutoff at the very last pixel.
        const calculatedPages = (height / vh) + 0.01;
        
        setTotalPages(prev => {
          if (Math.abs(prev - calculatedPages) > 0.05) {
            return calculatedPages;
          }
          return prev;
        });
      }
    };

    // Delay initial measurement slightly to ensure DOM paints fully
    const timer = setTimeout(measure, 100);
    
    const observer = new ResizeObserver(measure);
    const content = document.querySelector('.scroll-content-wrapper');
    if (content) {
      // Observe all individual sections since they dictate the height
      Array.from(content.children).forEach(child => observer.observe(child));
    }

    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timer);
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
