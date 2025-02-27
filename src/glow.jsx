import * as THREE from 'three'
import { ShaderMaterial } from "three";
import { useMemo } from "react";

export default function Glow() {
  const glowMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color("#f5f5f5") },
        emissiveIntensity: { value: 4.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float emissiveIntensity;
        varying vec2 vUv;

        void main() {
        // Calculate distance from the center of the plane
        float distX = abs(vUv.x - 0.5); // Horizontal distance from center (0.5)
        float distY = abs(vUv.y - 0.5); // Vertical distance from center (0.5)
        float dist = max(distX, distY);  // Use the max distance to the edge from the center

        // Apply smoothstep to create a soft fade for the edges
        float fade = smoothstep(0.3, 0.5, dist); // Adjust these values to control the fading

        // Final color with fading effect, no glow at the center
        vec4 finalColor = vec4(color * (1.0 - fade) * emissiveIntensity, 1.0); // 1.0 alpha for solid center

        gl_FragColor = finalColor;
        }
      `,
      side: THREE.FrontSide, // Ensure the material is facing the camera
      transparent: true, // Make the material transparent
      depthWrite: false, // Avoid writing to depth buffer to make glow work on top of other objects
    });
  }, []);

  return (
    <>
      {/* The glowing plane with faded edges */}
      <mesh position={[0.97, 2.8, -2.25]}>
        <planeGeometry args={[1.9, 1.35]} />
        <primitive object={glowMaterial} />
      </mesh>
    </>
  );
}
