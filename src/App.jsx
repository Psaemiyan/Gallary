import { OrbitControls } from "@react-three/drei";
import Scene from "./scene";

export default function App()
{
  return<>
  <OrbitControls minDistance={5} maxDistance={20} />
    <Scene />
  </>
}