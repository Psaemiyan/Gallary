import * as THREE from "three";
import { ShaderMaterial } from "three";
import { useMemo } from "react";
import vertexShader from "./shaders/glowVertex.glsl?raw";
import fragmentShader from "./shaders/glowFragment.glsl?raw";

function createGlowMaterial() {
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
}

export default function Glow() {
  return (
    <>
      <mesh position={[-0.3, 1.6, -2.5]} rotation={[0, Math.PI / 6, 0]} renderOrder={-1}>
        <planeGeometry args={[2, 1.4]} />
        <primitive object={createGlowMaterial()} />
      </mesh>

      <mesh position={[-2.2, 1.6, -1.3]} rotation={[0, Math.PI / 6, 0]} renderOrder={-1}>
        <planeGeometry args={[2, 1.4]} />
        <primitive object={createGlowMaterial()} />
      </mesh>

      {/* <mesh position={[2, 2, 2]}>
        <planeGeometry args={[1.9, 1.35]} />
        <primitive object={createGlowMaterial()} />
      </mesh> */}
    </>
  );
}
