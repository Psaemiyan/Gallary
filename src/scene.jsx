import React from "react";
import Frame from "./frame";

export default function Scene({ width = 6, height = 4, depth = 5, thickness = 0.15 }) {
  const wallPosition = [0, height / 2, -depth / 2 + thickness / 2];

  return (
    <>
        <group position={[0, -1.2, 0]} rotation={[0, Math.PI / 6, 0]}>
            {/* Floor */}
            <mesh receiveShadow position={[0, -thickness / 2, 0]}>
                <boxGeometry args={[width, thickness, depth]} />
                <meshBasicMaterial color="#121417" />

            </mesh>

            {/* Wall 1 */}
            <mesh castShadow receiveShadow position={[0, height / 2, -depth / 2 + thickness / 2]}>
                <boxGeometry args={[width, height, thickness]} />
                <meshBasicMaterial color="#0F1E30" />

            </mesh>

            {/* Wall 2 */}
            <mesh castShadow receiveShadow position={[width / 2 - thickness / 2, height / 2, 0]}>
                <boxGeometry args={[thickness, height, depth]} />
                <meshBasicMaterial color="#0F1E30" />
            </mesh>

            <Frame wallPosition={wallPosition} wallHeight={height} />
      </group>
    </>
  );
}
