import { OrbitControls } from "@react-three/drei";
import Scene from "./scene";
import Frame from "./frame";
import { Suspense } from "react";

export default function App()
{
  return<>
  <OrbitControls minDistance={5} maxDistance={20} />
    <Scene />
    </>
}