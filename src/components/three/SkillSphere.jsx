import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import { scrollState } from '../../hooks/useScrollStore';
import { allSkills } from '../../data/skills';
import * as THREE from 'three';

const purple = '#6c63ff';
const textColor = '#e0e8ff';

export default function SkillSphere() {
  const groupRef = useRef();

  // Distribute skill labels on a sphere surface using fibonacci
  const skillPositions = useMemo(() => {
    const radius = 3;
    const count = allSkills.length;
    return allSkills.map((skill, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        skill,
        color: textColor,
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ],
      };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.08;
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;

    // Visibility based on skills section scroll
    const p = scrollState.skillsProgress;

    // Hide entirely when not in skills section
    groupRef.current.visible = p > 0.01;

    const opacity = Math.min(1, p * 4) * (1 - Math.max(0, (p - 0.8) * 5));
    groupRef.current.traverse((child) => {
      if (child.material) {
        child.material.opacity = opacity;
      }
    });

    // Scale entrance
    const scale = THREE.MathUtils.lerp(0.5, 1, Math.min(1, p * 3));
    groupRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={groupRef} position={[0, -0.8, 0]}>
      {skillPositions.map(({ skill, position, color }) => (
        <Billboard key={skill} position={position} follow lockX={false} lockY={false} lockZ={false}>
          <Text
            fontSize={0.2}
            color={color}
            anchorX="center"
            anchorY="middle"
            font={undefined}
            material-transparent
            material-opacity={0}
            material-depthWrite={false}
          >
            {skill}
          </Text>
        </Billboard>
      ))}
      {/* Single wireframe sphere */}
      <mesh>
        <icosahedronGeometry args={[2.5, 2]} />
        <meshBasicMaterial
          color={purple}
          wireframe
          transparent
          opacity={0.04}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
