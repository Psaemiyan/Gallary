import { useGLTF } from "@react-three/drei";
import useStore from "./useStore";

export default function Staging() {
  const { loadingManager } = useStore.getState(); 
  const {scene} = useGLTF('./couch_model.glb', loadingManager)
  const { scene: plantScene } = useGLTF("./plant.glb", loadingManager);  

  const {scene: tableScene} = useGLTF('./table.glb', loadingManager)


  plantScene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
    }
  });

  tableScene.traverse((child) => {
    if(child.isMesh) {
      child.castShadow = true
    }
  })

  return (
    <>
      <primitive
        object={plantScene}
        scale={0.3}
        position={[3, -1.2, 0.4]}
        rotation={[0, Math.PI / 1.75, 0]}
      />

      <primitive
        object={scene}
        scale={1.5}
        position={[-1, -1.2, -1.2]}
        rotation={[0, Math.PI / 6, 0]}
      />

      <primitive 
      object={tableScene}
      scale={1.7}
      position={[0.2, -.4, 0.9]}
      rotation={[0, Math.PI / 6, 0]}
      />

    </>
  );
}
