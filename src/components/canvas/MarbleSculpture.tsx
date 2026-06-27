"use client";

import { useRef, useEffect } from "react";
import { MeshDistortMaterial, Environment, Float, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MarbleSculpture() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Use GSAP to animate rotation over the entire page scroll
    gsap.to(mesh.rotation, {
      y: Math.PI * 4,
      x: Math.PI * 2,
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // Optional: scale up/down based on specific sections.
    // For now, let it glide and rotate smoothly.
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <icosahedronGeometry args={[1.5, 64]} />
        {/* Abstract, flowing, glossy material */}
        <MeshDistortMaterial
          color="#fdfbf7"
          roughness={0.1}
          metalness={0.05}
          distort={0.3}
          speed={1.5}
        />
      </mesh>
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
        </group>
      </Environment>
    </Float>
  );
}
