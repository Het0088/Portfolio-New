import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { mouseState } from '../../hooks/useScrollStore';
import * as THREE from 'three';

const GRID = 60;
const GAP = 0.16;

export default function MorphBlob() {
  const meshRef = useRef();

  const { positions, colors, basePositions } = useMemo(() => {
    const count = GRID * GRID;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);

    const half = (GRID - 1) * GAP * 0.5;
    const purple = new THREE.Color('#6c63ff');
    const cyan = new THREE.Color('#00d4ff');

    let i = 0;
    for (let row = 0; row < GRID; row++) {
      for (let col_ = 0; col_ < GRID; col_++) {
        const x = col_ * GAP - half;
        const z = row * GAP - half;

        pos[i * 3] = x;
        pos[i * 3 + 1] = 0;
        pos[i * 3 + 2] = z;

        base[i * 3] = x;
        base[i * 3 + 1] = 0;
        base[i * 3 + 2] = z;

        const d = Math.sqrt(x * x + z * z) / (half * 1.4);
        const c = new THREE.Color().lerpColors(purple, cyan, d);
        col[i * 3] = c.r;
        col[i * 3 + 1] = c.g;
        col[i * 3 + 2] = c.b;

        i++;
      }
    }

    return { positions: pos, colors: col, basePositions: base };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.elapsedTime;
    const posArray = meshRef.current.geometry.attributes.position.array;
    const colArray = meshRef.current.geometry.attributes.color.array;

    const half = (GRID - 1) * GAP * 0.5;
    const purple = new THREE.Color('#6c63ff');
    const cyan = new THREE.Color('#00d4ff');

    for (let i = 0; i < GRID * GRID; i++) {
      const x = basePositions[i * 3];
      const z = basePositions[i * 3 + 2];
      const dist = Math.sqrt(x * x + z * z);

      // Layer 1: concentric ripple
      const wave1 = Math.sin(dist * 2.5 - t * 1.8) * 0.12;

      // Layer 2: diagonal cross-wave
      const wave2 = Math.sin((x + z) * 1.8 + t * 1.2) * 0.06;

      // Layer 3: mouse-driven local ripple
      const mx = mouseState.x * half;
      const mz = -mouseState.y * half;
      const mDist = Math.sqrt((x - mx) ** 2 + (z - mz) ** 2);
      const wave3 = Math.sin(mDist * 3 - t * 2.5) * 0.08 * Math.max(0, 1 - mDist / 3);

      const y = wave1 + wave2 + wave3;
      posArray[i * 3 + 1] = y;

      // Color interpolation based on Y height + distance
      const blend = Math.max(0, Math.min(1, (y + 0.2) / 0.4 + dist / (half * 1.4)));
      const c = new THREE.Color().lerpColors(purple, cyan, blend);
      colArray[i * 3] = c.r;
      colArray[i * 3 + 1] = c.g;
      colArray[i * 3 + 2] = c.b;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <group position={[0.5, -0.8, 0]} rotation={[-0.65, 0.15, 0.1]}>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={GRID * GRID}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={GRID * GRID}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <pointLight color="#6c63ff" intensity={1.5} distance={8} position={[0, 2, 1]} />
    </group>
  );
}
