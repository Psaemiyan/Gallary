import { useGLTF } from "@react-three/drei";
import useStore from "./useStore";

export default function Staging() {
  const { loadingManager } = useStore.getState(); 
  const { scene: plantScene } = useGLTF("./plant.glb", undefined, loadingManager);  


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
