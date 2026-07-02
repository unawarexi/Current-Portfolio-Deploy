// ============================================================================
// SCENE 3D — ambient floating geometry for section backgrounds
// Uses @react-three/fiber + drei for lightweight 3D decoration.
// Only renders on desktop (>= 1024px) to keep mobile fast.
// ============================================================================
import React, { useRef, useMemo, Suspense, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import useResponsive from '@hooks/useResponsive';

// ── Individual floating shape ──────────────────────────────────────────────
const FloatingShape = ({ geometry = 'torus', position, color = '#6366f1', speed = 1, distort = 0.3, scale = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case 'icosahedron': return <icosahedronGeometry args={[1, 1]} />;
      case 'octahedron': return <octahedronGeometry args={[1, 0]} />;
      case 'dodecahedron': return <dodecahedronGeometry args={[1, 0]} />;
      case 'torusKnot': return <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />;
      case 'torus':
      default: return <torusGeometry args={[1, 0.4, 16, 32]} />;
    }
  }, [geometry]);

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geo}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          roughness={0.8}
          metalness={0.2}
          distort={distort}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

// ── Scene3D — drop into any section as background decoration ───────────────
const Scene3D = ({
  variant = 'default',
  className = '',
  style = {},
}) => {
  const { isDesktop, isTablet } = useResponsive();

  if (!isDesktop && !isTablet) return null;

  const configs = {
    default: [
      { geometry: 'torus', position: [-4, 2, -3], color: '#6366f1', speed: 0.8, scale: 1.2 },
      { geometry: 'icosahedron', position: [4, -1, -4], color: '#8b5cf6', speed: 0.6, scale: 0.9 },
      { geometry: 'octahedron', position: [0, 3, -5], color: '#a78bfa', speed: 1, scale: 0.7 },
    ],
    minimal: [
      { geometry: 'torus', position: [-3, 1, -4], color: '#6366f1', speed: 0.5, scale: 1 },
      { geometry: 'dodecahedron', position: [3, -2, -5], color: '#8b5cf6', speed: 0.7, scale: 0.8 },
    ],
    dense: [
      { geometry: 'torusKnot', position: [-5, 2, -3], color: '#6366f1', speed: 0.6, scale: 0.8 },
      { geometry: 'icosahedron', position: [5, -1, -4], color: '#8b5cf6', speed: 0.8, scale: 1.1 },
      { geometry: 'octahedron', position: [-2, -3, -5], color: '#a78bfa', speed: 0.4, scale: 0.6 },
      { geometry: 'torus', position: [2, 3, -6], color: '#c4b5fd', speed: 0.9, scale: 0.5 },
    ],
  };

  const shapes = configs[variant] || configs.default;
  const visibleShapes = isDesktop ? shapes : shapes.slice(0, 1);

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0, willChange: 'transform', ...style }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={isDesktop ? [1, 1.2] : [1, 1]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        frameloop="always"
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={isDesktop ? 0.5 : 0.35} />
        <directionalLight position={[5, 5, 5]} intensity={isDesktop ? 0.3 : 0.2} />
        <Suspense fallback={null}>
          {visibleShapes.map((config, i) => (
            <FloatingShape key={i} {...config} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default memo(Scene3D);
