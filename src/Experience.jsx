import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

export default function Experience() {
  const modelRef = useRef();
  const materialRef = useRef();
  const scroll = useScroll();
  const { viewport } = useThree();

  useFrame((state, delta) => {
    // scroll.offset goes from 0 to 1 over 5 pages
    // P1 (Hero) = 0.0
    // P2 (About) = 0.25
    // P3 (Skills) = 0.50
    // P4 (Projects) = 0.75
    // P5 (Contact) = 1.0

    let targetX = 0;
    let targetY = 0;
    let targetScale = 2.0;    // Scroll Page 1: Model is centered and large
    let targetOpacity = 1.0;
    let targetRotationY = state.clock.elapsedTime * 0.2; // Idle animation rotation

    const offset = scroll.offset;

    // Transition Logic
    if (offset < 0.25) {
      // P1 -> P2
      const progress = offset / 0.25;
      // Scroll Page 2: Model slides to the right 50% of the screen
      targetX = THREE.MathUtils.lerp(0, viewport.width / 4, progress);
    } else if (offset < 0.5) {
      // P2 -> P3
      const progress = (offset - 0.25) / 0.25;
      // Scroll Page 3: Model rotates 180 degrees and scales down
      targetX = THREE.MathUtils.lerp(viewport.width / 4, 0, progress); // Move back to center
      targetScale = THREE.MathUtils.lerp(2.0, 1.2, progress);
      targetRotationY += THREE.MathUtils.lerp(0, Math.PI, progress); // 180 degrees = PI
    } else if (offset < 0.75) {
      // P3 -> P4
      const progress = (offset - 0.5) / 0.25;
      // Scroll Page 4: Model moves to the background with 0.3 opacity
      targetX = 0;
      targetY = THREE.MathUtils.lerp(0, 1.5, progress); // Move up to background
      targetScale = THREE.MathUtils.lerp(1.2, 0.8, progress);
      targetOpacity = THREE.MathUtils.lerp(1.0, 0.3, progress);
      targetRotationY += Math.PI; // Maintain the 180 rotation offset
    } else {
      // P4 -> P5
      targetX = 0;
      targetY = 1.5;
      targetScale = 0.8;
      targetOpacity = 0.3;
      targetRotationY += Math.PI;
    }

    // Apply smooth damping for all properties
    if (modelRef.current) {
      modelRef.current.position.x = THREE.MathUtils.damp(modelRef.current.position.x, targetX, 5, delta);
      modelRef.current.position.y = THREE.MathUtils.damp(modelRef.current.position.y, targetY, 5, delta);
      modelRef.current.scale.setScalar(THREE.MathUtils.damp(modelRef.current.scale.x, targetScale, 5, delta));
      
      modelRef.current.rotation.y = targetRotationY;
      modelRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    }

    if (materialRef.current) {
      materialRef.current.opacity = THREE.MathUtils.damp(materialRef.current.opacity, targetOpacity, 5, delta);
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 5]} intensity={3} />
      <directionalLight position={[-5, 5, -5]} intensity={1} color="#3B82F6" />
      
      {/* Idle animation wrapper */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={modelRef}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            ref={materialRef}
            color="#3B82F6"
            metalness={1}
            roughness={0.2}
            transparent={true}
          />
        </mesh>
      </Float>

      {/* Ground depth shadow */}
      <ContactShadows
        position={[0, -2.5, 0]}
        scale={20}
        blur={2}
        far={5}
        opacity={0.5}
        color="#000000"
      />
    </>
  );
}
