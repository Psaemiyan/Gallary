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
    // console.log('Loading state:', loading);
    if (!loading) {
      gsap.to({ uAlpha: 1 }, {
        uAlpha: 0, 
        duration: 1,  
        onUpdate: function () {
          setUAlpha(this.targets()[0].uAlpha);  
        },
        onComplete: () => {
          setVisible(false); // Remove the mesh entirely
        }
      });
    }
  }, [loading]);  

  if (!visible) return null; // Remove component when loading is done

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
