import { useGLTF } from "@react-three/drei"

export default function Staging()
{
    // const { scene } = useGLTF('./metal_bench.glb')
    const { scene: plantScene } = useGLTF('./plant.glb')


    return <>
    {/* <primitive object={scene} scale={.4} position={[0, -.8, -0.3]} rotation={[0, Math.PI/5.5, 0]} /> */}

    <primitive object={plantScene} scale={0.3} position={[3, -1.2, .4]} rotation={[0, Math.PI /1.75, 0]} />
    </>
}