import { useMemo } from 'react';
import styles from './MobileBackground.module.css';

export default function MobileBackground() {
  const dots = useMemo(() => {
    const count = 80;
    const result = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 300;
      const size = 1.5 + Math.random() * 2;
      const opacity = 0.15 + Math.random() * 0.35;
      const delay = Math.random() * 8;
      const duration = 4 + Math.random() * 6;
      result.push({ x, y, size, opacity, delay, duration, id: i });
    }
    return result;
  }, []);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />
      <div className={styles.dotField}>
        {dots.map(d => (
          <span
            key={d.id}
            className={styles.dot}
            style={{
              left: `${d.x}%`,
              top: `${d.y}vh`,
              width: `${d.size}px`,
              height: `${d.size}px`,
              opacity: d.opacity,
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
