import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { scrollState } from '../../hooks/useScrollStore';
import MorphBlob from './MorphBlob';

export default function HeroScene() {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;

    const p = scrollState.heroProgress;

    // Scroll-driven: drift up as hero scrolls away
    groupRef.current.position.y = p * 4;

    // Fade out particle material via opacity
    groupRef.current.traverse((child) => {
      if ((child.isMesh || child.isPoints) && child.material) {
        child.material.opacity = Math.max(0, 0.9 * (1 - p));
      }
    });

    // Hide entirely once scrolled past
    groupRef.current.visible = p < 0.95;
  });

  return (
    <group ref={groupRef}>
      <MorphBlob />
    </group>
  );
}
