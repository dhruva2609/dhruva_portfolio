import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { TOTAL_PAGES } from './constants/portfolioData';
import Scene from './components/3d/Scene';
import Hero from './components/ui/Hero';

export default function App() {
  return (
    <>
      {/* ─── 3D Canvas (Simplified background, no heavy SVG grain) ────── */}
      <div className="w-screen h-screen bg-[#0a1628] overflow-hidden text-[#f8fafc] font-sans selection:bg-white/30">
        <Canvas
          shadows
          gl={{ antialias: true, alpha: false }}
          camera={{ position: [0, 0, 5], fov: 50 }}
          className="fixed top-0 left-0 w-full h-full z-0"
          dpr={[1, 2]}
        >
          <color attach="background" args={['#0a1628']} />

          <ScrollControls pages={TOTAL_PAGES} damping={0.1}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
            <Hero />
          </ScrollControls>
        </Canvas>
      </div>
    </>
  );
}
