import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import vertexShader from "./shaders/loaderVertex.glsl?raw";
import fragmentShader from "./shaders/loaderFragment.glsl?raw";
import useStore from "./useStore";  

export default function Loading() {
  const loadingRef = useRef(null);
  const { loading } = useStore();  

  useEffect(() => {
    if (!loading) {
      const material = loadingRef.current?.material;
      if (material) {
        material.uniforms.uAlpha.value = 1; 
        gsap.to(material.uniforms.uAlpha, {
          value: 0,
          duration: 3,
          ease: "linear",
          onUpdate: () => {
            material.uniforms.uAlpha.needsUpdate = true;
            console.log("Current uAlpha value:", material.uniforms.uAlpha.value);
          },
        });
      }
    }
  }, [loading]); 

  useFrame(() => {
    const material = loadingRef.current?.material;
    if (material) {
      material.uniforms.uAlpha.needsUpdate = true;
    }
  });

  return (
    <mesh ref={loadingRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        transparent={true}
        blending={THREE.NormalBlending}
        depthTest={false}
        depthWrite={false}
        uniforms={{ uAlpha: { value: 1 } }} 
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}
