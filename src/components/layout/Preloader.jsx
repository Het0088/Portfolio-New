import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Preloader.module.css';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const [count, setCount] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Curtain wipe out
        gsap.to(containerRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1,
          ease: 'power4.inOut',
          onComplete: () => onComplete?.(),
        });
      },
    });

    // Fade in monogram
    tl.to(`.${styles.monogram}`, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Count from 0 to 100
    tl.to({ val: 0 }, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: function () {
        const v = Math.round(this.targets()[0].val);
        setCount(v);
      },
    }, '<0.2');

    // Progress bar
    tl.to(`.${styles.barFill}`, {
      width: '100%',
      duration: 2,
      ease: 'power2.inOut',
    }, '<');

    // Hold briefly
    tl.to({}, { duration: 0.3 });
  }, { scope: containerRef });

  return (
    <div className={styles.preloader} ref={containerRef}>
      <div className={styles.monogram}>HP</div>
      <div className={styles.counterWrapper}>
        <span className={styles.counter}>{count}</span>
        <span className={styles.counter}>%</span>
      </div>
      <div className={styles.bar}>
        <div className={styles.barFill} />
      </div>
    </div>
  );
}
