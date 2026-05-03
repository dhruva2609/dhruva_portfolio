import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

// ─── Dark Opal / Sapphire Crystal Shader ────────────────────────────────────
// Palette: deep navy core → cool cyan rim → indigo/violet edge highlights.
// Everything stays in the cool-tone band (hue 0.50–0.75). Dark but multi-tonal.
const IridescentMaterial = shaderMaterial(
  { uTime: 0.0, uJitter: 0.0, uPulse: 0.0 },

  // ── Vertex Shader ──────────────────────────────────────────────────────────
  /* glsl */`
    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec3 vViewDir;

    void main() {
      vNormal     = normalize(normalMatrix * normal);
      vec4 world  = modelMatrix * vec4(position, 1.0);
      vWorldPos   = world.xyz;
      vViewDir    = normalize(cameraPosition - world.xyz);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  // ── Fragment Shader ────────────────────────────────────────────────────────
  /* glsl */`
    uniform float uTime;
    uniform float uPulse;

    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec3 vViewDir;

    // ── Value noise (no external dep) ─────────────────────────────────────
    float hash(vec3 p) {
      p = fract(p * 0.31830988 + 0.1);
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }
    float noise(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(mix(hash(i),             hash(i+vec3(1,0,0)), f.x),
            mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
        mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
            mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y),
        f.z);
    }
    float fbm(vec3 p) {
      float v = 0.0, a = 0.5;
      for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.1; a *= 0.5; }
      return v;
    }
    // HSL → RGB
    vec3 hsl2rgb(vec3 c) {
      vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0,4,2),6.0)-3.0)-1.0, 0.0, 1.0);
      return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0*c.z - 1.0));
    }

    void main() {
      // Fresnel — moderately sharp so rim glows but body stays dark
      float fresnel = 1.0 - clamp(dot(vNormal, vViewDir), 0.0, 1.0);
      fresnel = pow(fresnel, 2.0);

      // Two noise layers at different scales / speeds
      float n1 = fbm(vWorldPos * 1.4 + vec3(uTime*0.08, uTime*0.05, uTime*0.04));
      float n2 = fbm(vWorldPos * 2.8 - vec3(uTime*0.04, uTime*0.09, uTime*0.03));
      float flow = n1 * 0.55 + n2 * 0.45;

      // ── Cool-tone palette: cyan-blue → blue → indigo ──────────────────
      // Centre of palette = 0.60 (blue). Noise ± noise shifts into
      //   cyan (0.50) and indigo/violet (0.72). Never goes warm.
      float hue = 0.60 + (flow - 0.5) * 0.22;  // range ≈ 0.49 – 0.71

      // Saturation: muted deep in the body, richer at the Fresnel rim
      float sat = 0.55 + fresnel * 0.30 + flow * 0.08;
      sat = clamp(sat, 0.0, 0.80);

      // Luminance: near-black core, dim-to-mid at rim
      // Three "bands" of depth:
      //   body  → very dark (0.04 – 0.10)
      //   mid   → matches the crystal facet planes ~0.14
      //   rim   → glowing edge up to 0.38
      float lumBody = mix(0.04, 0.14, flow);
      float lumRim  = mix(0.14, 0.38, fresnel);
      float lum     = mix(lumBody, lumRim, fresnel);
      lum = clamp(lum, 0.0, 0.38);

      vec3 crystalColor = hsl2rgb(vec3(hue, sat, lum));

      // ── Face accent: give flat faces a subtle teal-blue tint ──────────
      // Faces pointing toward camera (low fresnel) get a steely blue
      float faceFactor = 1.0 - fresnel;
      vec3  faceColor  = vec3(0.05, 0.09, 0.22) * (faceFactor * flow * 1.2);
      vec3  surface    = crystalColor + faceColor;

      // ── Specular: two highlights — sharp white + wide soft blue ──────
      vec3  h1   = normalize(vViewDir + vec3(0.15, 0.9, 0.3));
      float s1   = pow(max(dot(vNormal, h1), 0.0), 180.0);   // tight white
      vec3  h2   = normalize(vViewDir + vec3(-0.3, 0.5, 0.6));
      float s2   = pow(max(dot(vNormal, h2), 0.0), 40.0);    // wide cyan bloom
      surface   += vec3(0.7, 0.85, 1.0) * s1 * 0.18;
      surface   += vec3(0.1, 0.35, 0.7) * s2 * 0.06;

      // ── Edge rim glow: thin bright-blue line at silhouette ────────────
      float rim  = pow(fresnel, 4.5);
      surface   += vec3(0.20, 0.55, 1.0) * rim * 0.45;

      // ── Hover pulse: cool teal brightening ───────────────────────────
      surface   += uPulse * vec3(0.05, 0.18, 0.40) * 0.55;

      float alpha = 0.88 + fresnel * 0.10;
      gl_FragColor = vec4(surface, alpha);
    }
  `
);

extend({ IridescentMaterial });
export { IridescentMaterial };
