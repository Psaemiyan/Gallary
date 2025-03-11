import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import useStore from "./useStore";

export default function Frame({ wallPosition, wallHeight }) {
  const { loadingManager, setLoadingState } = useStore(); 

  const { nodes } = useGLTF("./wall_pictures.glb", true, loadingManager);  

  const setSelectedFrame = useStore((state) => state.setSelectedFrame);
  const toggleZoom = useStore((state) => state.toggleZoom);

  useEffect(() => {
    setLoadingState(true, 0); 
  }, []);

  const framePositions = {
    1: [
      wallPosition[0] + 0.7,
      wallPosition[1] + wallHeight / 4 - 0.2,
      wallPosition[2] + 0.15,
    ],
    2: [
      wallPosition[0] + 2.75,
      wallPosition[1] + wallHeight / 4 - 1,
      0,
    ],
    3: [
      wallPosition[0] - 1.5,
      wallPosition[1] + wallHeight / 4 - 0.2,
      wallPosition[2] + 0.25,
    ],
  };

  const handleClick = (frameId) => {
    setSelectedFrame(frameId); 
    toggleZoom(frameId);  
  };

  return (
    <>
      <group onClick={() => handleClick(1)}
        onPointerOver={(e) => (document.body.style.cursor = "pointer")}
        onPointerOut={(e) => (document.body.style.cursor = "auto")}
      >
        <primitive
          object={nodes.wall_picture_1}
          scale={3.5}
          position={framePositions[1]}
          rotation={[Math.PI / 2, Math.PI, Math.PI / 2]}
        />
      </group>

      <group onClick={() => handleClick(2)}
        onPointerOver={(e) => (document.body.style.cursor = "pointer")}
        onPointerOut={(e) => (document.body.style.cursor = "auto")}
      >
        <primitive
          object={nodes.wall_picture_2}
          scale={5}
          position={framePositions[2]}
          rotation={[Math.PI * 2, Math.PI * 3, 0]}
        />
      </group>

      <group onClick={() => handleClick(3)}
        onPointerOver={(e) => (document.body.style.cursor = "pointer")}
        onPointerOut={(e) => (document.body.style.cursor = "auto")}
      >
        <primitive
          object={nodes.wall_picture_3}
          scale={3.5}
          position={framePositions[3]}
          rotation={[Math.PI / 2, Math.PI, Math.PI / 2]}
        />
      </group>
    </>
  );
}
