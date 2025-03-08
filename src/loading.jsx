import { useEffect, useState } from "react";
import useStore from "./useStore";
import vertexShader from "./shaders/loaderVertex.glsl?raw";
import fragmentShader from "./shaders/loaderFragment.glsl?raw";
import gsap from "gsap";  

export default function Loading() {
  const { loading } = useStore();  
  const [visible, setVisible] = useState(true);
  const [uAlpha, setUAlpha] = useState(1);  

  useEffect(() => {
    if (!loading) {
      gsap.to(uAlpha, {
        value: 0, 
        duration: 2,  
        ease: "power2.out",
        onUpdate: () => {
          setUAlpha(gsap.getProperty(uAlpha, "uAlpha"));
        },
        onComplete: () => {
          setVisible(false); 
        }
      });
    }
  }, [loading, uAlpha]);  

  if (!visible) return null; 

  return (
    <mesh>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial 
        transparent
        uniforms={{ uAlpha: { value: uAlpha } }}  
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

