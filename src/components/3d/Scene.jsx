import MorphingGeometry from './MorphingGeometry';
import Lighting from './Lighting';
import Particles from './Particles';
import FloatingParticles from './FloatingParticles';
import PostProcessingEffects from './PostProcessingEffects';

export default function Scene() {
  return (
    <>
      <Lighting />
      <Particles />
      <FloatingParticles count={40} />
      <MorphingGeometry />
      <PostProcessingEffects />
    </>
  );
}
