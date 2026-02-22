import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '../../hooks/useScrollStore';

const colorStart = new THREE.Color('#6c63ff');
const colorEnd = new THREE.Color('#00d4ff');

export default function ParticleField({ count = 600 }) {
  const pointsRef = useRef();
  const colorRef = useRef(new THREE.Color());

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.015;
    pointsRef.current.rotation.x = t * 0.008;

    // Gentle vertical drift
    pointsRef.current.position.y = Math.sin(t * 0.1) * 0.3;

    // Color shift based on combined scroll progress
    const globalProgress =
      scrollState.heroProgress * 0.2 +
      scrollState.aboutProgress * 0.2 +
      scrollState.skillsProgress * 0.2 +
      scrollState.projectsProgress * 0.2 +
      scrollState.contactProgress * 0.2;

    colorRef.current.lerpColors(colorStart, colorEnd, globalProgress);
    pointsRef.current.material.color.copy(colorRef.current);
    pointsRef.current.material.opacity = 0.35 + globalProgress * 0.25;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#6c63ff"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
