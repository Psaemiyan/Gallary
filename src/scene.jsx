import React from "react";
import Frame from "./frame";
import useStore from "./useStore";
import { useTexture } from "@react-three/drei";
import { useState, useEffect } from "react";
import * as THREE from 'three'

export default function Scene({ width = 6, height = 4, depth = 5, thickness = 0.15 }) {
  const wallPosition = [0, height / 2, -depth / 2 + thickness / 2];
  const loadingManager = useStore().loadingManager;
  
  const [floorTextures, setFloorTextures] = useState(null);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader(loadingManager);

    const loadTextures = async () => {
      const map = await textureLoader.loadAsync("./wood_floor.blend/textures/wood_floor_diff_4k.jpg");
      const displacementMap = await textureLoader.loadAsync("./wood_floor.blend/textures/wood_floor_disp_4k.png");

      setFloorTextures({ map, displacementMap });
    };

    loadTextures();
  }, [loadingManager]);

  return (
    <>
        <group position={[0, -1.2, 0]} rotation={[0, Math.PI / 6, 0]}>
            {/* Floor */}
            <mesh receiveShadow position={[0, -thickness / 2, 0]}>
                <boxGeometry args={[width, thickness, depth]} />
                <meshStandardMaterial
                {...floorTextures}  
                displacementScale={0}  
                roughness={0.8}          
                />
            </mesh>

            {/* Wall 1 */}
            <mesh castShadow receiveShadow position={[0, height / 2, -depth / 2 + thickness / 2]}>
                <boxGeometry args={[width, height, thickness]} />
                <meshBasicMaterial color="#1E3728" />

            </mesh>

            {/* Wall 2 */}
            <mesh castShadow receiveShadow position={[width / 2 - thickness / 2, height / 2, 0]}>
                <boxGeometry args={[thickness, height, depth]} />
                <meshBasicMaterial color="#112620" />
            </mesh>

            <Frame wallPosition={wallPosition} wallHeight={height} />
      </group>
    </>
  );
}
