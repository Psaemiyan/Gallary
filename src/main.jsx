import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import App from './App'
import './App.css'


createRoot(document.getElementById('root')).render(
  <Canvas
  camera={{ position: [0, 2.2, 8], fov: 50 }}
  >
    <ambientLight intensity={Math.PI / 2} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    <App />
  </Canvas>,
)