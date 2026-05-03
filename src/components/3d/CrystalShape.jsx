import { useRef } from 'react';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { useScrollLogic } from '../../hooks/useScrollLogic';

export default function CrystalShape() {
  const meshRef = useRef();
  useScrollLogic(meshRef);

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <icosahedronGeometry args={[1, 0]} />
      <MeshTransmissionMaterial
        backside
        backsideThickness={0.4}
        samples={10}
        resolution={512}
        transmission={1}
        roughness={0}
        thickness={3.5}
        ior={1.5}
        chromaticAberration={0.06}
        anisotropy={0.3}
        distortion={0.1}
        distortionScale={0.3}
        temporalDistortion={0.05}
        color="#a0c4ff"
        attenuationColor="#3b82f6"
        attenuationDistance={2}
      />
    </mesh>
  );
}
