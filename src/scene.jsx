import React, { useState, useEffect } from "react";
import Frame from "./frame";
import useStore from "./useStore";
import * as THREE from "three";

export default function Scene({ width = 6, height = 4, depth = 5, thickness = 0.15 }) {
  const wallPosition = [0, height / 2, -depth / 2 + thickness / 2];
  const { loadingManager, setLoadingState } = useStore.getState();

  const texturePaths = {
    map: "/wood_floor.blend/textures/wood_floor_diff_4k.jpg",
    displacementMap: "/wood_floor.blend/textures/wood_floor_disp_4k.png",
  };

  const [textures, setTextures] = useState({
    map: null,
    displacementMap: null,
  });

  useEffect(() => {
    const loader = new THREE.TextureLoader(loadingManager);

    // Initialize loading events
    loadingManager.onStart = () => {};
    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progress = (itemsLoaded / itemsTotal) * 100;
      setLoadingState(true, progress);
    };
    loadingManager.onLoad = () => {
      setLoadingState(false, 100); // Complete loading
    };
    loadingManager.onError = () => {
      setLoadingState(false, 100); // Stop loading on error
    };

    // Load textures
    const mapTexture = loader.load(texturePaths.map, (texture) => {
      setTextures((prev) => ({ ...prev, map: texture }));
    });

    const displacementTexture = loader.load(texturePaths.displacementMap, (texture) => {
      setTextures((prev) => ({ ...prev, displacementMap: texture }));
    });

    // Cleanup on unmount
    return () => {
      loadingManager.onStart = null;
      loadingManager.onProgress = null;
      loadingManager.onLoad = null;
      loadingManager.onError = null;
    };
  }, [loadingManager, setLoadingState]);

  const floorTextures = {
    map: textures.map,
    displacementMap: textures.displacementMap,
  };

  // Check if textures are loaded before rendering the floor
  const texturesLoaded = textures.map && textures.displacementMap;

  return (
    <>
      <group position={[0, -1.2, 0]} rotation={[0, Math.PI / 6, 0]}>
        {/* Floor */}
        {texturesLoaded && (
          <mesh receiveShadow position={[0, -thickness / 2, 0]}>
            <boxGeometry args={[width, thickness, depth]} />
            <meshStandardMaterial
              {...floorTextures}  
              roughness={0.8}
              displacementScale={0}
              metalness={0}
            />
          </mesh>
        )}

        {/* Wall 1 */}
        <mesh position={[0, height / 2, -depth / 2 + thickness / 2]}>
          <boxGeometry args={[width, height, thickness]} />
          <meshBasicMaterial color="#1E3728" />
        </mesh>

        {/* Wall 2 */}
        <mesh position={[width / 2 - thickness / 2, height / 2, 0]}>
          <boxGeometry args={[thickness, height, depth]} />
          <meshBasicMaterial color="#112620" />
        </mesh>

        <Frame wallPosition={wallPosition} wallHeight={height} />
      </group>
    </>
  );
}
