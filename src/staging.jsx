import { useGLTF } from "@react-three/drei";
import useStore from "./useStore";
import { useEffect } from "react";

export default function Staging() {
  const { loadingManager } = useStore.getState();  // Access loadingManager from store
  const { scene: plantScene } = useGLTF("./plant.glb", undefined, loadingManager);  // Pass loadingManager to useGLTF

//   useEffect(() => {
//     // Manually update loading state for testing
//     useStore.getState().setLoadingState(false, 100);
//     console.log("Manually setting loading to false");
//   }, []);

  return (
    <>
      <primitive
        object={plantScene}
        scale={0.3}
        position={[3, -1.2, 0.4]}
        rotation={[0, Math.PI / 1.75, 0]}
      />
    </>
  );
}
