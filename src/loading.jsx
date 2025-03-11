import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import vertexShader from "./shaders/loaderVertex.glsl?raw";
import fragmentShader from "./shaders/loaderFragment.glsl?raw";
import useStore from "./useStore";

export default function Loading() {
  const loadingRef = useRef();
  const { loading } = useStore();  
  const uniforms = useRef({ uAlpha: { value: 1 } }).current; 
  const [, setRefresh] = useState(0); 

  const loadingBar = document.querySelector('.loading-bar')

  useEffect(() => {
    if (!loading && loadingRef.current) {
      const material = loadingRef.current.material;

      if (material?.uniforms?.uAlpha) {
        gsap.to(material.uniforms.uAlpha, {
          value: 0,
          duration: 3,
          ease: "linear",
          onUpdate: () => {
            material.uniforms.uAlpha.needsUpdate = true;
            material.needsUpdate = true; 
            setRefresh((r) => r + 1); 
          }
        });
        loadingBar.classList.add('ended')
        loadingBar.style.transform = ''
      }
    }
  }, [loading]);

  useFrame(() => {
    if (!loading && uniforms.uAlpha.value > 0) {
      uniforms.uAlpha.value = Math.max(0, uniforms.uAlpha.value - 0.02);
      loadingRef.current.material.needsUpdate = true;
    }
  });

  return (
    <mesh ref={loadingRef} renderOrder={9}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        blending={THREE.NormalBlending}
        transparent={true}
        depthTest={false}
        depthWrite={false}
        uniforms={uniforms} 
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}
