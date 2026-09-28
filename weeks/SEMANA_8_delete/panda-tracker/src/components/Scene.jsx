import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import Character from "./Character";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0.9, 5], fov: 32 }}
      dpr={[1, 2]}
      // Escucha el mouse en toda la página, no solo sobre el canvas
      eventSource={document.body}
      eventPrefix="client"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={2} castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={0.8} color="#ffd9d6" />

      <Suspense fallback={null}>
        <Character position={[0, -1.3, 0]} scale={1.6} />
        <Environment preset="city" />
        <ContactShadows position={[0, -1.3, 0]} opacity={0.35} scale={6} blur={2.5} />
      </Suspense>

      {/* Cámara fija: sin zoom ni pan; solo un giro mínimo opcional */}
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}
