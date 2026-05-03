import { EffectComposer, Bloom } from '@react-three/postprocessing';

export default function EffectContainer() {
  return (
    <EffectComposer disableNormalPass>
      <Bloom
        luminanceThreshold={0.9}
        luminanceSmoothing={0.025}
        intensity={0.6}
        mipmapBlur
      />
    </EffectComposer>
  );
}
