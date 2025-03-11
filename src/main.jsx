import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";
import Scene from "./scene";
import Staging from "./staging";
import Glow from "./glow";
import CameraController from "./CameraController"; 
import Loading from "./loading";
import Audio from "./audio";
import "./App.css";



createRoot(document.getElementById("root")).render(<>
  <Audio />
  <Canvas camera={{ position: [0, 2.2, 7.9], fov: 50 }}>
    <Perf position="top-left" />
    {/* <OrbitControls makeDefault /> */}
    <CameraController /> 
    <ambientLight intensity={Math.PI / 2} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
    <Scene />
    <Glow />
    <Staging />
    <Loading />
  </Canvas>
  </>
);
