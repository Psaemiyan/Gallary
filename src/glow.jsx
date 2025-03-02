import * as THREE from "three";
import { ShaderMaterial } from "three";
import { useMemo } from "react";
// import vertexShader from './shaders'
import vertexShader from "./shaders/glowVertex.glsl?raw";
import fragmentShader from "./shaders/glowFragment.glsl?raw";

export default function Glow() {
  const glowMaterial = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color("#f5f5f5") },
        emissiveIntensity: { value: 4.0 },
      },
      vertexShader,
      fragmentShader,
      side: THREE.FrontSide,
      transparent: true,
      depthWrite: false,
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
