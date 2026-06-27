"use client";

import { Canvas } from "@react-three/fiber";
import MarbleSculpture from "./MarbleSculpture";

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
        <MarbleSculpture />
      </Canvas>
    </div>
  );
}
