import { useGLTF } from "@react-three/drei"

export default function Frame({wallPosition, wallHeight})
{
    const { scene, nodes } = useGLTF('./wall_pictures.glb'); 

    const frame1 = nodes.wall_picture_1;
    const frame2 = nodes.wall_picture_2;
    const frame3 = nodes.wall_picture_3;

    const frame1Position = [
      wallPosition[0] + 0.7, 
      wallPosition[1] + wallHeight / 4 - 0.2, 
      wallPosition[2] + 0.15]; 

    const frame2Position = [
      wallPosition[0] + 2.8, 
      wallPosition[1] + wallHeight / 4 - 1, 
      0];

    const frame3Position = [
        wallPosition[0] - 1.5, 
        wallPosition[1] + wallHeight / 4 - 0.2, 
        wallPosition[2] + 0.25]; 

      console.log(frame2Position)

    return (
      <>
        <primitive 
          object={frame1} 
          scale={3.5} 
          position={frame1Position} 
          rotation={[Math.PI/2, Math.PI, Math.PI/2 ]}
        />

        <primitive
        object={frame3}
        scale={3.5}
        position={frame3Position}
        rotation={[Math.PI/2, Math.PI, Math.PI/2 ]}

        />  


        <primitive 
            object={frame2} 
            scale={5} 
            position={frame2Position} 
            rotation={[Math.PI * 2, Math.PI * 3, 0]}

        />

      </>
    );
}
