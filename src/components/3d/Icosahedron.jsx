import { useRef } from 'react';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { useScrollLogic } from '../../hooks/useScrollLogic';

export default function Icosahedron() {
  const meshRef = useRef();
  
  // Drives the frame-by-frame interpolation
  useScrollLogic(meshRef);

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <icosahedronGeometry args={[1, 0]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={1.0}
        roughness={0.1}
        transmission={0.5}
        ior={1.5}
        chromaticAberration={0.06}
        anisotropy={0.1}
        color="#3B82F6"
      />
    </mesh>
  );
}
