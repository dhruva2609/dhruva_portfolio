import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TOTAL_PAGES } from '../constants/portfolioData';

export function useScrollLogic(meshRef) {
  const scroll = useScroll();

  useFrame((state, delta) => {
    // step = 1 / (TOTAL_PAGES - 1): one step per transition between pages
    const offset = scroll.offset;
    const step = 1 / (TOTAL_PAGES - 1);

    let targetX = 0;
    let targetY = 0;
    let targetScale = 1.5;
    let targetRotationY = state.clock.elapsedTime * 0.2;
    let wobbleIntensity = 0;

    if (offset < step) {
      // P1 -> P2 (Hero to About)
      const progress = offset / step;
      targetX = THREE.MathUtils.lerp(0, 2, progress);
      targetScale = 1.5;
      targetRotationY += THREE.MathUtils.lerp(0, Math.PI, progress);
    } else if (offset < step * 2) {
      // P2 -> P3 (About to Skills)
      const progress = (offset - step) / step;
      targetX = THREE.MathUtils.lerp(2, -2, progress);
      targetScale = THREE.MathUtils.lerp(1.5, 0.5, progress);
      targetRotationY += Math.PI;
      wobbleIntensity = progress;
    } else if (offset < step * 3) {
      // P3 -> P4 (Skills to Projects)
      const progress = (offset - step * 2) / step;
      targetX = THREE.MathUtils.lerp(-2, 0, progress);
      targetScale = THREE.MathUtils.lerp(0.5, 0.8, progress);
      targetY = THREE.MathUtils.lerp(0, 1.5, progress);
      targetRotationY += Math.PI;
      wobbleIntensity = 1 - progress;
    } else if (offset < step * 4) {
      // P4 -> P5 (Projects Transition/New Project space)
      const progress = (offset - step * 3) / step;
      targetX = THREE.MathUtils.lerp(0, -1.5, progress); // Move slightly to accommodate more content
      targetY = THREE.MathUtils.lerp(1.5, 1.0, progress);
      targetScale = 0.8;
      targetRotationY += Math.PI + (progress * Math.PI * 0.5);
    } else if (offset < step * 5) {
      // P5 -> P6 (Projects to Blogs)
      const progress = (offset - step * 4) / step;
      targetX = THREE.MathUtils.lerp(-1.5, 2, progress);
      targetY = THREE.MathUtils.lerp(1.0, -1.0, progress);
      targetScale = THREE.MathUtils.lerp(0.8, 1.2, progress);
      targetRotationY += Math.PI * 1.5 + progress * Math.PI;
    } else {
      // P6 -> P7 (Blogs to Contact)
      const progress = (offset - step * 5) / step;
      targetX = THREE.MathUtils.lerp(2, 0, progress);
      targetY = THREE.MathUtils.lerp(-1.0, 0, progress);
      targetScale = THREE.MathUtils.lerp(1.2, 1.8, progress);
      targetRotationY += Math.PI * 2.5 + progress * Math.PI * 1.5;
    }

    if (meshRef.current) {
      meshRef.current.position.x = THREE.MathUtils.damp(meshRef.current.position.x, targetX, 5, delta);
      meshRef.current.position.y = THREE.MathUtils.damp(meshRef.current.position.y, targetY, 5, delta);
      meshRef.current.scale.setScalar(THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 4, delta));
      meshRef.current.rotation.y = targetRotationY;

      if (wobbleIntensity > 0) {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 + Math.sin(state.clock.elapsedTime * 5) * (0.2 * wobbleIntensity);
        meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 4) * (0.2 * wobbleIntensity);
      } else {
        meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, state.clock.elapsedTime * 0.1, 5, delta);
        meshRef.current.rotation.z = THREE.MathUtils.damp(meshRef.current.rotation.z, 0, 5, delta);
      }
    }
  });
}