import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';

export default function Particles() {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(4000 * 3), { radius: 18 }));
  
  // Track mouse position via state shared through the R3F internals
  const mouse = useRef({ x: 0, y: 0 });

  // Listen to pointermove on the window
  useState(() => {
    const handler = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', handler);
    return () => window.removeEventListener('pointermove', handler);
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    // Slow ambient rotation
    ref.current.rotation.x -= delta / 12;
    ref.current.rotation.y -= delta / 18;
    // Lerp towards mouse so star-field tilts smoothly
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouse.current.y * 0.3, 0.02);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mouse.current.x * 0.3, 0.02);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.55}
        />
      </Points>
    </group>
  );
}
