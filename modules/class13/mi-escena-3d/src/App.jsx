import { createRoot } from 'react-dom/client'
import React, {useRef, useState} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, useFBX } from '@react-three/drei'

import './App.css'

function Model(props) {
    const { scene } = useGLTF('./model/gltf/avion.gltf')
    return <primitive object={scene} {...props} />
}

function ModelFBX(props) {
    const fbx = useFBX('./model/fbx/Waving.fbx')
    return <primitive object={fbx} {...props} />
}

// component 3d interactive and animated
function Box(props) {
    const meshRef = useRef()
    const [hovered, setHovered] = useState(false)
    const [active, setActive] = useState(false)

    // useFrame se ejecuta en cada frame de la animación
    useFrame((state, delta) => {
        meshRef.current.rotation.x += 0.01
        meshRef.current.rotation.y += 0.01
    })
    
    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHovered(true)}
            onPointerOut={(event) => setHovered(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>

        
    )
}

// Escena principal
export default function App() {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
            <OrbitControls />
            <Model position={[0, -1, 0]} scale={30} />
            <ModelFBX position={[0, 1, 0]} scale={1} />
        </Canvas>
    )
}