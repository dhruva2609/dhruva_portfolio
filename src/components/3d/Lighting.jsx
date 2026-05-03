import { Environment, ContactShadows, CameraShake } from '@react-three/drei';

export default function Lighting() {
  return (
    <>
      {/*
       * city HDR drives environment map reflections on the metallic surface.
       * envMapIntensity is set on the material itself (2.5) so no override needed.
       */}
      <Environment preset="city" />

      <ambientLight intensity={0.2} color="#1d4ed8" />
      <hemisphereLight intensity={0.4} color="#3b82f6" groundColor="#0a1628" />

      {/* ── Point lights — positioned to create vivid reflections ────── */}

      {/* Cool blue — upper right key */}
      <pointLight position={[6, 7, 4]}    intensity={2.2}  color="#3b6eff" />

      {/* Deep indigo — left rim */}
      <pointLight position={[-7, 2, -4]}  intensity={1.5}  color="#5533ff" />

      {/* Cyan accent — low front */}
      <pointLight position={[2, -5, 5]}   intensity={1.0}  color="#00c8ff" />

      {/* Warm white rim — top back (creates the clearcoat sheen) */}
      <pointLight position={[-2, 8, -6]}  intensity={0.6}  color="#c8d8ff" />

      <ContactShadows
        position={[0, -2.4, 0]}
        scale={20}
        blur={2.5}
        far={6}
        opacity={0.5}
        color="#000820"
      />

      {/* Very low-frequency handheld feel */}
      <CameraShake
        maxYaw={0.007}
        maxPitch={0.007}
        maxRoll={0.002}
        yawFrequency={0.22}
        pitchFrequency={0.28}
        rollFrequency={0.12}
        intensity={0.5}
        decayRate={0.65}
      />
    </>
  );
}
