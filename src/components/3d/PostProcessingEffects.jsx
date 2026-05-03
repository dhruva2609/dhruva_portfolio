import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';

export default function PostProcessingEffects() {
  return (
    <EffectComposer disableNormalPass>
      <Bloom
        intensity={0.35}
        luminanceThreshold={1.5}
        luminanceSmoothing={0.1}
        radius={0.6}
        // Removed mipmapBlur to avoid the React 19 / KawaseBlurPass circular-JSON crash.
      />
      <Vignette eskil={false} offset={0.3} darkness={1.3} />
      <Noise opacity={0.02} premultiply />
    </EffectComposer>
  );
}
