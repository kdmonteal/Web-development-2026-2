import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/panda.glb";
// Cambia esto si tu hueso se llama distinto (p. ej. "mixamorigHead")
const HEAD_BONE_REGEX = /head/i;
const NECK_BONE_REGEX = /neck/i;

const MAX_YAW = 0.6;   // giro horizontal máximo (rad)
const MAX_PITCH = 0.35; // giro vertical máximo (rad)
const SMOOTHING = 6;    // más alto = respuesta más rápida

export default function Character(props) {
  const group = useRef();
  
  // 1. Extraemos 'animations' además de 'scene'
  const { scene, animations } = useGLTF(MODEL_URL);
  
  // 2. Usamos useAnimations para gestionar las animaciones del modelo
  const { actions, names } = useAnimations(animations, group);

  const target = useRef(null);
  const base = useRef(new THREE.Euler());

  // 3. Reproducir la animación en loop al cargar el componente
  useEffect(() => {
    if (names.length > 0) {
      const action = actions[names[0]]; 
      
      if (action) {
        action.reset().fadeIn(0.5).play();
        // Asegurar que se repita en bucle infinito
        action.setLoop(THREE.LoopRepeat, Infinity);
      }
    }
  }, [actions, names]);

  // Busca el hueso de la cabeza (o el cuello); si no hay rig, gira todo el modelo
  useEffect(() => {
    let head = null, neck = null;
    scene.traverse((o) => {
      if (o.isBone || o.type === "Bone") {
        if (!head && HEAD_BONE_REGEX.test(o.name)) head = o;
        if (!neck && NECK_BONE_REGEX.test(o.name)) neck = o;
      }
    });
    target.current = head || neck || group.current;
    base.current.copy(target.current.rotation);
    if (!head && !neck) console.warn("Sin hueso de cabeza: se rota el modelo completo.");
  }, [scene]);

  useFrame((state, delta) => {
    const t = target.current;
    if (!t) return;
    const { x, y } = state.pointer; // rango -1..1
    const k = 1 - Math.exp(-SMOOTHING * delta); // lerp independiente del framerate

    t.rotation.y = THREE.MathUtils.lerp(t.rotation.y, base.current.y + x * MAX_YAW, k);
    t.rotation.x = THREE.MathUtils.lerp(t.rotation.x, base.current.x - y * MAX_PITCH, k);
  });

  return (
    <group ref={group} {...props}>
      {/* Sube este valor (ej. 0.5, 1, 1.5) para obligar al modelo GLB a elevarse */}
      <primitive object={scene} position={[0, 0.5, 0]} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);