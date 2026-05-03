import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { hoverState } from './sharedRefs';

function buildGeometry() {
  const indexed = new THREE.IcosahedronGeometry(1.2, 0); // Slightly larger for better impact
  const geo = indexed.toNonIndexed();
  geo.computeVertexNormals();

  const position = geo.attributes.position;
  const count    = position.count;
  const originalPos = new Float32Array(position.array);

  const centroids = new Float32Array((count / 3) * 3);
  for (let f = 0; f < count / 3; f++) {
    const i = f * 9;
    centroids[f * 3]     = (originalPos[i]   + originalPos[i + 3] + originalPos[i + 6]) / 3;
    centroids[f * 3 + 1] = (originalPos[i+1] + originalPos[i + 4] + originalPos[i + 7]) / 3;
    centroids[f * 3 + 2] = (originalPos[i+2] + originalPos[i + 5] + originalPos[i + 8]) / 3;
  }

  return { geo, originalPos, centroids, count };
}

export default function MorphingGeometry() {
  const meshRef = useRef();
  const matRef  = useRef();
  const scroll  = useScroll();

  const { geo, originalPos, centroids, count } = useMemo(buildGeometry, []);
  const workPos = useMemo(() => new Float32Array(originalPos), [originalPos]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const t = state.clock.elapsedTime;
    const offset = scroll.offset;

    // ── Elite-tier Scroll Transformation mapping ──────────────────────
    let targetX = 0, targetY = 0, targetScale = 1.3, tRotY = t * 0.15;
    let wobble = 0, jitter = 0, explode = 0;

    if (offset < 0.2) {
      const p = offset / 0.2;
      targetX = THREE.MathUtils.lerp(0, 1.8, p);
      tRotY += p * Math.PI;
    } else if (offset < 0.4) {
      const p = (offset - 0.2) / 0.2;
      targetX = THREE.MathUtils.lerp(1.8, -1.8, p);
      targetScale = THREE.MathUtils.lerp(1.3, 0.7, p);
      jitter = p * 0.15;
      wobble = p;
    } else if (offset < 0.6) {
      const p = (offset - 0.4) / 0.2;
      targetX = THREE.MathUtils.lerp(-1.8, 0, p);
      targetY = THREE.MathUtils.lerp(0, 1.2, p);
      targetScale = THREE.MathUtils.lerp(0.7, 0.6, p);
      explode = p * 1.5;
      wobble = 1 - p;
    } else if (offset < 0.8) {
      const p = (offset - 0.6) / 0.2;
      targetX = THREE.MathUtils.lerp(0, 1.8, p);
      targetY = THREE.MathUtils.lerp(1.2, -0.8, p);
      targetScale = THREE.MathUtils.lerp(0.6, 1.0, p);
      tRotY += p * Math.PI;
    } else {
      const p = (offset - 0.8) / 0.2;
      targetX = THREE.MathUtils.lerp(1.8, 0, p);
      targetY = THREE.MathUtils.lerp(-0.8, 0, p);
      targetScale = THREE.MathUtils.lerp(1.0, 1.6, p);
      tRotY += p * Math.PI * 2;
    }

    // Positions & Rotations
    const m = meshRef.current;
    m.position.x = THREE.MathUtils.damp(m.position.x, targetX, 5, delta);
    m.position.y = THREE.MathUtils.damp(m.position.y, targetY, 5, delta);
    m.scale.setScalar(THREE.MathUtils.damp(m.scale.x, targetScale, 4, delta));
    m.rotation.y = tRotY;

    if (wobble > 0) {
      m.rotation.x = t * 0.1 + Math.sin(t * 5) * (0.15 * wobble);
      m.rotation.z = Math.cos(t * 4) * (0.15 * wobble);
    } else {
      m.rotation.x = THREE.MathUtils.damp(m.rotation.x, t * 0.05, 5, delta);
      m.rotation.z = THREE.MathUtils.damp(m.rotation.z, 0, 5, delta);
    }

    // ── Per-vertex Jitter & Explosion ──────────────────────────────────
    const pos = geo.attributes.position;
    for (let v = 0; v < count; v++) {
      const ox = originalPos[v * 3], oy = originalPos[v * 3 + 1], oz = originalPos[v * 3 + 2];
      let dx = 0, dy = 0, dz = 0;

      if (jitter > 0) {
        dx = Math.sin(t * 3.5 + ox * 4.5) * jitter;
        dy = Math.cos(t * 4.2 + oy * 5.2) * jitter;
        dz = Math.sin(t * 2.8 + oz * 4.1) * jitter;
      }

      if (explode > 0) {
        const fi = Math.floor(v / 3);
        const cx = centroids[fi*3], cy = centroids[fi*3+1], cz = centroids[fi*3+2];
        let ex = ox - cx, ey = oy - cy, ez = oz - cz;
        const dist = Math.sqrt(ex*ex + ey*ey + ez*ez) || 1;
        ex /= dist; ey /= dist; ez /= dist;
        dx += ex * explode; dy += ey * explode; dz += ez * explode;
      }

      workPos[v*3] = ox+dx; workPos[v*3+1] = oy+dy; workPos[v*3+2] = oz+dz;
    }
    pos.array.set(workPos);
    pos.needsUpdate = true;
    if (jitter > 0.05 || explode > 0.05) geo.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geo} castShadow receiveShadow>
      {/* ── Elite Transmission Material ─────────────────────────────── */}
      <MeshTransmissionMaterial
        resolution={512}
        samples={8}
        thickness={2}
        roughness={0.05}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.04}
        distortion={0.3}
        temporalDistortion={0.15}
        color="#02030d" // Ultra-dark sapphire core
        background="#020617"
      />
    </mesh>
  );
}
