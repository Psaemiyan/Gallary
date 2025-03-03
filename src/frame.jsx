import { useGLTF } from "@react-three/drei";
import useStore from "./useStore";

export default function Frame({ wallPosition, wallHeight }) {
  const { nodes } = useGLTF("./wall_pictures.glb");
  const setSelectedFrame = useStore((state) => state.setSelectedFrame);

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
    setSelectedFrame(frameId); // Store only frameId
    console.log(`Frame ${frameId} clicked`);
  };

  return (
    <>
      <group onClick={() => handleClick(1)}>
        <primitive
          object={nodes.wall_picture_1}
          scale={3.5}
          position={framePositions[1]}
          rotation={[Math.PI / 2, Math.PI, Math.PI / 2]}
        />
      </group>

      <group onClick={() => handleClick(2)}>
        <primitive
          object={nodes.wall_picture_2}
          scale={5}
          position={framePositions[2]}
          rotation={[Math.PI * 2, Math.PI * 3, 0]}
        />
      </group>

      <group onClick={() => handleClick(3)}>
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
