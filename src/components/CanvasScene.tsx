import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, MotionBlur } from '@react-three/postprocessing';
import * as CANNON from 'cannon-es';
import { uiState } from '../store/uiStore';
import useWebGLCapabilities from '../hooks/useWebGLCapabilities';

function PhysicalSphere({ position, radius }: { position: [number, number, number]; radius: number }) {
  const ref = useRef<any>();
  const worldRef = useRef(new CANNON.World());

  React.useEffect(() => {
    const world = worldRef.current;
    world.gravity.set(0, -9.82, 0);
    const body = new CANNON.Body({ mass: 1, shape: new CANNON.Sphere(radius), position: new CANNON.Vec3(...position) });
    world.addBody(body);
    function update() {
      world.step(1/60);
      ref.current.position.copy(body.position as any);
      requestAnimationFrame(update);
    }
    update();
  }, [position, radius]);

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial metalness={uiState.metalness} roughness={0.2} />
    </mesh>
  );
}

export default function CanvasScene() {
  const { pixelRatio } = useWebGLCapabilities();
  const gltf = useGLTF('/assets/models/scene.glb');

  return (
    <Canvas
      shadows
      gl={{ antialias: true, powerPreference: 'high-performance', pixelRatio }}
      camera={{ position: [0, 5, 10], fov: 60 }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 7]} intensity={1} castShadow />

      <primitive object={gltf.scene} />
      <PhysicalSphere position={[0, 5, 0]} radius={1} />

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.3} radius={0.5} intensity={uiState.bloomIntensity} />
        <DepthOfField focusDistance={uiState.focusDistance} focalLength={0.05} bokehScale={2} />
        <MotionBlur velocityFactor={3.0} />
      </EffectComposer>

      <OrbitControls enablePan enableZoom />
      <Stats />
    </Canvas>
  );
}
