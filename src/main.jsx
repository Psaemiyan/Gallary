import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./App.css";
import Scene from "./scene";
import Glow from "./glow";
import CameraController from "./CameraController"; 

createRoot(document.getElementById("root")).render(
  <Canvas camera={{ position: [0, 3, 7.5], fov: 50 }}>
    <CameraController /> 
    <ambientLight intensity={Math.PI / 2} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    <Scene />
    <Glow />
  </Canvas>
);
