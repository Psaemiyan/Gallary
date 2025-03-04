import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import useStore from "./useStore";
import gsap from "gsap";  // Import GSAP

export default function CameraController() {
  const { camera } = useThree();
  const zoomedInFrame = useStore((state) => state.zoomedInFrame);  // Get the zoomed-in frame state
  const isFirstRender = useRef(true);


  // Define the camera settings for each frame
  const cameraSettings = {
    1: { 
      position: [.8, 1.5, -.5],  // Example position for frame 1
      rotation: [0, Math.PI / 6, 0], // Rotation for frame 1
    },
    2: { 
      position: [-.5, 1.2, .5],  // Example position for frame 2
      rotation: [0, -Math.PI / 3, 0], // Rotation for frame 2
    },
    3: { 
      position: [-1.2, 1.5, .5],  // Example position for frame 3
      rotation: [0, Math.PI / 6, 0], // Rotation for frame 3
    },
  };

  useEffect(() => {
    if (isFirstRender.current) {
        isFirstRender.current = false;  // Set flag to false after first render
        return;  // Skip the transition logic for the first render
    }
    if (zoomedInFrame === null) {
    gsap.to(camera.position, {
        x: -.2,
        y: 0.8,
        z: 7.8,
        duration: 1.5,  // Duration of transition
        ease: "power2.inOut",
        });
        gsap.to(camera.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.5,  // Duration of transition
        ease: "power2.inOut",
        });
        gsap.to(camera, {
        fov: 50,  // Reset FOV when zooming out (default FOV)
        duration: 1.5,  // Smooth transition duration for FOV
        ease: "power2.inOut",
        onUpdate: () => camera.updateProjectionMatrix(),  // Ensure the matrix is updated during the animation
        });

    } else if (cameraSettings[zoomedInFrame]) {
      // If a frame is zoomed in, animate the camera to that frame's position and rotation
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
