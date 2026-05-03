import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Dodecahedron } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingParticles({ count = 50 }) {
  const points = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        temp.push({
            position: [
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
            ],
            speed: Math.random() * 0.5 + 0.2,
            scale: Math.random() * 0.05 + 0.02,
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        });
    }
    return temp;
  }, [count]);

  return (
    <group>
      {points.map((p, i) => (
        <Float
          key={i}
          speed={p.speed * 2}
          rotationIntensity={2}
          floatIntensity={2}
          position={p.position}
        >
          <Dodecahedron args={[1, 0]} scale={p.scale}>
            <meshStandardMaterial
              color="#3b82f6"
              emissive="#1d4ed8"
              emissiveIntensity={0.35}
              roughness={0}
              metalness={0.8}
            />
          </Dodecahedron>
        </Float>
      ))}
    </group>
  );
}
