import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import useStore from "./useStore";
import gsap from "gsap";  

export default function CameraController() {
  const { camera } = useThree();
  const zoomedInFrame = useStore((state) => state.zoomedInFrame);  
  const isFirstRender = useRef(true);


  const cameraSettings = {
    1: { 
      position: [.8, 1.5, -.5],  
      rotation: [0, Math.PI / 6, 0],
    },
    2: { 
      position: [-.5, 1.2, .5],  
      rotation: [0, -Math.PI / 3, 0], 
    },
    3: { 
      position: [-1.2, 1.5, .5],  
      rotation: [0, Math.PI / 6, 0], 
    },
  };

  useEffect(() => {
    if (isFirstRender.current) {
        isFirstRender.current = false;  
        return;  
    }
    if (zoomedInFrame === null) {
    gsap.to(camera.position, {
        x: -.2,
        y: 2,
        z: 7.8,
        duration: 1.5,  
        ease: "power2.inOut",
        });
        gsap.to(camera.rotation, {
        x: -Math.PI / 12,
        y: 0,
        z: 0,
        duration: 1.5,  
        ease: "power2.inOut",
        });
        gsap.to(camera, {
        fov: 50,  
        duration: 1.5,  
        ease: "power2.inOut",
        onUpdate: () => camera.updateProjectionMatrix(),  
        });

    } else if (cameraSettings[zoomedInFrame]) {
      const { position, rotation } = cameraSettings[zoomedInFrame];

      gsap.to(camera.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 1.5,
        ease: "power2.inOut",
      });
      gsap.to(camera.rotation, {
        x: rotation[0],
        y: rotation[1],
        z: rotation[2],
        duration: 1.5,
        ease: "power2.inOut",
      });
    }
  }, [zoomedInFrame, camera]);

  return null;
}
