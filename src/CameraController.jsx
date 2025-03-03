import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import useStore from "./useStore";
import gsap from "gsap";  // Import GSAP

export default function CameraController() {
  const { camera } = useThree();
  const selectedFrame = useStore((state) => state.selectedFrame);

  // Define hardcoded camera settings based on the frame ID
  const cameraSettings = {
    1: { 
      position: [.8, 1.5, -.5], 
      rotation: [0, Math.PI / 6, 0]
    },
    2: { 
      position: [-.5, 1.2, .5],  
      rotation: [0, -Math.PI / 3, 0]
    },
    3: { 
      position: [-1.2, 1.5, .5], 
      rotation: [0, Math.PI / 6, 0]
    },
  };

  useEffect(() => {
    if (selectedFrame && cameraSettings[selectedFrame]) {
      const { position, rotation } = cameraSettings[selectedFrame];

      console.log('Animating camera to:', rotation);

      // Use GSAP to animate the camera's position and rotation
      gsap.to(camera.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 1, // Duration in seconds
        ease: "power2.inOut",  // Easing function
      });

      gsap.to(camera.rotation, {
        x: rotation[0],
        y: rotation[1],
        z: rotation[2],
        duration: 1,  // Duration in seconds
        ease: "power2.inOut",  // Easing function
      });
    }
  }, [selectedFrame, camera]);

  return null;
}
